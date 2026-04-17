// Libraries
import { useState, type JSX } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";

// Store
import { useUserStore, type User } from "../../store/user.store.ts";

// Components
import { Input } from "../../components/input/input.tsx";
import { Button } from "../../components/button/button.tsx";
import { CustomAlert } from "../../components/alert/customAlert.tsx";

// Styles
import { Container, FormWrapper } from "./register.style.ts";

interface RegisterState {
  name: string;
  email: string;
  password: string;
  error: string;
  successMsg: string;
  isLoading: boolean;
}

// Página responsável pelo cadastro de usuários, integração com API de registro e criação de sessão após sucesso.
export function RegisterPage(): JSX.Element {
  // ==============================
  // STATE & DEPENDENCIES
  // ==============================

  const [registerState, setRegisterState] = useState<RegisterState>({
    name: "",
    email: "",
    password: "",
    error: "",
    successMsg: "",
    isLoading: false,
  });

  const navigate: NavigateFunction = useNavigate();
  const setUser: (user: User) => void = useUserStore((state) => state.setUser);

  const handleRegister: (e: React.SyntheticEvent<HTMLFormElement>) => Promise<void> = async (e) => {
    e.preventDefault();
    setRegisterState((prev) => ({ ...prev, error: "", successMsg: "", isLoading: true }));

    try {
      // ==============================
      // API REQUEST (auth/register)
     // ==============================
      const res: Response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerState.name,
          email: registerState.email,
          password: registerState.password,
        }),
      });

      const data: { name: string; email: string; token: string; error?: string } = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro ao registrar");

      // ==============================
      // SUCCESS REGISTER HANDLING
      // ==============================
      setUser({ name: data.name, email: data.email, token: data.token });
      localStorage.setItem("token", data.token);

      setRegisterState((prev) => ({ ...prev, successMsg: "Registro realizado com sucesso!" }));
      navigate("/dashboard");
    } catch (err: unknown) {
      // ==============================
      // ERROR HANDLING
      // ==============================
      setRegisterState((prev) => ({
        ...prev,
        error:
          err instanceof Error
            ? err.message
            : "Não foi possível conectar ao servidor.",
      }));
    } finally {
      setRegisterState((prev) => ({ ...prev, isLoading: false }));
    }
  };

    // ==============================
    // RENDER
    // ==============================
  return (
    <Container>
      <FormWrapper>
        <h1>Registrar</h1>

        <form onSubmit={handleRegister}>
          <Input
            id="name"
            label="Nome"
            placeholder="Digite seu nome"
            value={registerState.name}
            onChange={(e) => setRegisterState((prev) => ({ ...prev, name: e.target.value }))}
          />

          <Input
            id="email"
            label="Email"
            placeholder="Digite seu email"
            value={registerState.email}
            onChange={(e) => setRegisterState((prev) => ({ ...prev, email: e.target.value }))}
            type="email"
          />

          <Input
            id="password"
            label="Senha"
            placeholder="Digite sua senha"
            value={registerState.password}
            onChange={(e) => setRegisterState((prev) => ({ ...prev, password: e.target.value }))}
            type="password"
          />

          <Button type="primary" htmlType="submit" disabled={registerState.isLoading}>
            {registerState.isLoading ? "Registrando..." : "Registrar"}
          </Button>

          <CustomAlert
            message={registerState.error}
            type="error"
            visible={!!registerState.error}
            onClose={() => setRegisterState((prev) => ({ ...prev, error: "" }))}
          />

          <CustomAlert
            message={registerState.successMsg}
            type="success"
            visible={!!registerState.successMsg}
            onClose={() => setRegisterState((prev) => ({ ...prev, successMsg: "" }))}
          />
        </form>
      </FormWrapper>
    </Container>
  );
}