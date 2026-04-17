// Libraries
import { useState, type JSX } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";

// Store
import { useUserStore, type User } from "../../store/user.store.ts";

// Components
import { Input } from "../components/input/input.tsx";
import { Button } from "../components/button/button.tsx";
import { CustomAlert } from "../components/alert/customAlert.tsx";

// Types
import type { AuthFormState } from "./login.types.ts";

// Styles
import { Container, FormWrapper } from "../login/login.style.ts";

// Página de autenticação responsável pelo login do usuário, realizando comunicação com a API de autenticação (/auth/login),
export function LoginPage(): JSX.Element {
  // ==============================
  // STATE & DEPENDENCIES
  // ==============================
  const [formState, setFormState] = useState<AuthFormState>({
    email: "",
    password: "",
    error: "",
    successMsg: "",
    isLoading: false,
  });

  const navigate: NavigateFunction = useNavigate();
  const goToRegister: () => void = () => navigate("/register");
  const setUser: (user: User) => void = useUserStore((state) => state.setUser);

  // ==============================
  // AUTH PAGE (login / auth flow)
  // ==============================
  const handleLogin: (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => Promise<void> = async (e) => {
    e.preventDefault();

    setFormState((prev) => ({
      ...prev,
      error: "",
      successMsg: "",
      isLoading: true,
    }));

    try {
      // ==============================
      // API REQUEST (auth/login)
      // ==============================
      const res: Response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
        }),
      });

      const data: {
        name: string;
        email: string;
        token: string;
        error?: string;
      } = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao fazer login");

      // ==============================
      // SUCCESS AUTH HANDLING
      // ==============================
      setUser({
        name: data.name,
        email: data.email,
        token: data.token,
      });

      localStorage.setItem("token", data.token);

      setFormState((prev) => ({
        ...prev,
        successMsg: "Login realizado com sucesso!",
      }));

      navigate("/dashboard");
    } catch (err: unknown) {
      // ==============================
      // ERROR HANDLING
      // ==============================
      setFormState((prev) => ({
        ...prev,
        error:
          err instanceof Error
            ? err.message
            : "Erro ao conectar com a API de autenticação",
      }));
    } finally {
      setFormState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  // ==============================
  // RENDER
  // ==============================

  return (
    <Container>
      <FormWrapper>
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <Input
            id="email"
            label="Email"
            placeholder="Digite seu email"
            value={formState.email}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            type="email"
          />

          <Input
            id="password"
            label="Senha"
            placeholder="Digite sua senha"
            value={formState.password}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            type="password"
          />

          <Button
            type="primary"
            htmlType="submit"
            disabled={formState.isLoading}
          >
            {formState.isLoading ? "Entrando..." : "Entrar"}
          </Button>

          <Button
            type="default"
            onClick={goToRegister}
            disabled={formState.isLoading}
          >
            Registrar
          </Button>

          <CustomAlert
            message={formState.error}
            type="error"
            visible={!!formState.error}
            onClose={() =>
              setFormState((prev) => ({ ...prev, error: "" }))
            }
          />

          <CustomAlert
            message={formState.successMsg}
            type="success"
            visible={!!formState.successMsg}
            onClose={() =>
              setFormState((prev) => ({ ...prev, successMsg: "" }))
            }
          />
        </form>
      </FormWrapper>
    </Container>
  );
}