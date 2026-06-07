import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../services/firebase";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleCadastro(e) {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      alert("Conta criada com sucesso!");
    } catch (error) {
      alert("Erro: " + error.message);
    }
  }

  return (
    <div className="form-container" style={{ marginTop: "60px" }}>
      <h1>📝 Criar Conta</h1>

      <form onSubmit={handleCadastro} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "left" }}>
          <label style={{ fontWeight: "600" }}>E-mail:</label>
          <input
            type="email"
            placeholder="Escolha seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "left" }}>
          <label style={{ fontWeight: "600" }}>Senha:</label>
          <input
            type="password"
            placeholder="Crie uma senha forte"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ width: "100%", marginTop: "10px" }}>
          Cadastrar
        </button>
      </form>

      <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "inherit" }}>
        Já possui uma conta?{" "}
        <Link to="/login" style={{ color: "#ff6b35", fontWeight: "600", textDecoration: "underline" }}>
          Entrar
        </Link>
      </p>
    </div>
  );
}