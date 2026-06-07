import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert("Login realizado com sucesso!");
    } catch (error) {
      alert("Erro: " + error.message);
    }
  }

  return (
    <div className="form-container" style={{ marginTop: "60px" }}>
      <h1>Conecte-se</h1>

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "left" }}>
          <label style={{ fontWeight: "600" }}>E-mail:</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "left" }}>
          <label style={{ fontWeight: "600" }}>Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ width: "100%", marginTop: "10px" }}>
          Entrar
        </button>
      </form>

      <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "inherit" }}>
        Não tem uma conta?{" "}
        <Link to="/cadastro" style={{ color: "#ff6b35", fontWeight: "600", textDecoration: "underline" }}>
          Criar conta
        </Link>
      </p>
    </div>
  );
}