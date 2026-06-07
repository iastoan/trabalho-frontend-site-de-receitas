import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../services/firebase";

export default function Configuracoes() {
  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [bio, setBio] = useState("");
  const [modoEscuro, setModoEscuro] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Monitora o estado do usuário para garantir que o uid exista antes de buscar dados
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsuario(user);
        try {
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setNome(docSnap.data().nome || "");
            setBio(docSnap.data().bio || "");
          }
        } catch (error) {
          console.error("Erro ao carregar dados do usuário:", error);
        }
      } else {
        setUsuario(null);
      }
      setCarregando(false);
    });

    // Carrega o tema do localStorage
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "escuro") {
      setModoEscuro(true);
    }

    return () => unsubscribe();
  }, []);

  function alterarTema() {
    const novoTema = !modoEscuro;
    setModoEscuro(novoTema);

    if (novoTema) {
      document.body.classList.add("dark");
      localStorage.setItem("tema", "escuro");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("tema", "claro");
    }
  }

  async function salvarPerfil(e) {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Você precisa estar logado para salvar as alterações.");
      return;
    }

    try {
      await setDoc(
        doc(db, "usuarios", auth.currentUser.uid),
        {
          nome,
          bio,
          userId: auth.currentUser.uid,
        },
        { merge: true } // Evita apagar outros campos caso existam no documento
      );

      alert("Perfil salvo com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar perfil.");
    }
  }

  if (carregando) {
    return <p style={{ textAlign: "center", padding: "40px" }}>Carregando configurações...</p>;
  }

  return (
    <div className="form-container" style={{ marginTop: "40px" }}>
      <h1>⚙️ Configurações</h1>

      {usuario ? (
        <form onSubmit={salvarPerfil} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Campo de Nome */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "left" }}>
            <label style={{ fontWeight: "600", color: "inherit" }}>Nome de exibição:</label>
            <input
              type="text"
              placeholder="Digite seu nome ou apelido"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          {/* Campo de Bio */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "left" }}>
            <label style={{ fontWeight: "600", color: "inherit" }}>Sua Bio:</label>
            <textarea
              placeholder="Conte um pouco sobre você e seus gostos na cozinha..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="4"
              style={{ resize: "vertical" }}
            />
          </div>

          {/* Seção de Preferências / Modo Escuro */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px", 
            background: "rgba(0,0,0,0.03)", 
            padding: "12px 15px", 
            borderRadius: "10px",
            textAlign: "left"
          }} className="config-tema-box">
            <input
              type="checkbox"
              id="modoEscuroToggle"
              checked={modoEscuro}
              onChange={alterarTema}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <label htmlFor="modoEscuroToggle" style={{ cursor: "pointer", fontWeight: "600" }}>
              Ativar Modo Escuro 
            </label>
          </div>

          {/* Botão Salvar */}
          <button type="submit" style={{ width: "100%", marginTop: "10px" }}>
            Salvar Alterações
          </button>
        </form>
      ) : (
        <p style={{ textAlign: "center", padding: "20px 0" }}>Você precisa fazer login para acessar esta página.</p>
      )}
    </div>
  );
}