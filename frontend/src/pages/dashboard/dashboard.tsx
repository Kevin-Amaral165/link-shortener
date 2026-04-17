// Libraries
import { useState, useEffect, type JSX } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";

// Store
import { useUserStore } from "../../store/user.store.ts";

// Components
import ModalCustom from "../../components/modal/modal.tsx";
import TableCustom from "../../components/table/table.tsx";
import { CustomAlert } from "../../components/alert/customAlert.tsx";

// Types
import type { DashboardState, LinkItem } from "./dashboard.types.ts";

// Styles
import {
  DashboardContainer,
  DashboardHeader,
  FormWrapper,
  TableWrapper,
  StatsModalContent,
} from "./dashboard.style.ts";

// Dashboard responsável por listar links, consumir API e gerenciar requisições HTTP (fetch/cliente)
export function Dashboard(): JSX.Element | null {
  const [state, setState] = useState<DashboardState>({
    currentPage: 1,
    error: "",
    isLoading: false,
    isModalOpen: false,
    links: [],
    linkStats: {},
    newUrl: "",
    selectedLink: null,
    successMsg: "",
    totalItems: 0,
  });

  const navigate: NavigateFunction = useNavigate();
  const token: string | undefined = useUserStore((store) => store.user?.token);

  const itemsPerPage = 10;

  // ==============================
  // AUTH CHECK (login / auth)
  // ==============================
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchLinks(1);
    }
  }, [token, navigate]);

  // ==============================
  // GET LINKS (dashboard links)
  // ==============================
  const fetchLinks = async (page = 1): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const res = await fetch(
        `http://localhost:3001/links?page=${page}&limit=${itemsPerPage}`, // page limit
        {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer
          },
        }
      );

      const data = await res.json();

      const linksWithClicks = await Promise.all(
        data.data.map(async (link: { id: number }) => {
          const resStats = await fetch(
            `http://localhost:3001/links/${link.id}/stats`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const stats = await resStats.json();

          return {
            ...link,
            total_clicks: stats.total || 0,
          };
        })
      );

      setState((prev) => ({
        ...prev,
        links: linksWithClicks,
        totalItems: data.pagination.total,
        currentPage: page,
        isLoading: false,
      }));
    } catch (err: unknown) {
      setState((prev) => ({
        ...prev,
        error:
          err instanceof Error
            ? err.message
            : "Erro ao conectar com a API",
        isLoading: false,
      }));
    }
  };

  // ==============================
  // CREATE LINK (createLink)
  // ==============================
  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!state.newUrl) {
      return setState((prev) => ({ ...prev, error: "Informe a URL" }));
    }

    try {
      const res = await fetch("http://localhost:3001/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: state.newUrl }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setState((prev) => ({
        ...prev,
        successMsg: `Link criado: ${data.short_code}`,
        newUrl: "",
      }));

      fetchLinks(state.currentPage);
    } catch (err: unknown) {
      setState((prev) => ({
        ...prev,
        error:
          err instanceof Error
            ? err.message
            : "Erro ao conectar com a API",
      }));
    }
  };

  // ==============================
  // DELETE LINK (delete)
  // ==============================
  const handleDeleteLink = async (id: number) => {
    if (!confirm("Deseja remover?")) return;

    try {
      await fetch(`http://localhost:3001/links/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchLinks(state.currentPage);
    } catch (err: unknown) {
      setState((prev) => ({
        ...prev,
        error:
          err instanceof Error
            ? err.message
            : "Erro ao conectar com a API",
      }));
    }
  };

  // ==============================
  // STATS (clicks stats)
  // ==============================
  const handleOpenStatsModal = async (link: LinkItem) => {
    setState((prev) => ({
      ...prev,
      selectedLink: link,
      isModalOpen: true,
    }));

    if (!state.linkStats[link.id]) {
      const res = await fetch(
        `http://localhost:3001/links/${link.id}/stats`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      setState((prev) => ({
        ...prev,
        linkStats: {
          ...prev.linkStats,
          [link.id]: data,
        },
      }));
    }
  };

  // ==============================
  // LOGOUT
  // ==============================
  const handleLogout = () => {
    useUserStore.getState().setUser(null);
    navigate("/login");
  };

  // ==============================
  // RENDER
  // ==============================

  if (!token) return null;

  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </DashboardHeader>

      <FormWrapper onSubmit={handleCreateLink}>
        <input
          value={state.newUrl}
          onChange={(e) =>
            setState((prev) => ({ ...prev, newUrl: e.target.value }))
          }
          placeholder="Digite a URL"
        />
        <button type="submit">Encurtar</button>
      </FormWrapper>

      <CustomAlert
        message={state.error}
        type="error"
        visible={!!state.error}
        onClose={() => setState((prev) => ({ ...prev, error: "" }))}
      />

      <CustomAlert
        message={state.successMsg}
        type="success"
        visible={!!state.successMsg}
        onClose={() => setState((prev) => ({ ...prev, successMsg: "" }))}
      />

      {state.isLoading ? (
        <p>Carregando...</p>
      ) : (
        <TableWrapper>
          <TableCustom
            columns={[
              { title: "Código", dataIndex: "short_code" },
              { title: "URL", dataIndex: "original_url" },
              { title: "Cliques", dataIndex: "total_clicks" },
              {
                title: "Ações",
                render: (_: undefined, record: LinkItem) => (
                  <>
                    <button onClick={() => handleOpenStatsModal(record)}>
                      Stats
                    </button>
                    <button onClick={() => handleDeleteLink(record.id)}>
                      Delete
                    </button>
                  </>
                ),
              },
            ]}
            dataSource={state.links}
            rowKey="id"
            pagination={{
              current: state.currentPage,
              pageSize: itemsPerPage,
              total: state.totalItems,
              onChange: (page) => fetchLinks(page),
            }}
          />
        </TableWrapper>
      )}

      <ModalCustom
        title="Stats"
        open={state.isModalOpen}
        onClose={() =>
          setState((prev) => ({ ...prev, isModalOpen: false }))
        }
      >
        {state.selectedLink && state.linkStats[state.selectedLink.id] && (
          <StatsModalContent>
            <p>Total clicks: {state.linkStats[state.selectedLink.id].total}</p>
          </StatsModalContent>
        )}
      </ModalCustom>
    </DashboardContainer>
  );
}