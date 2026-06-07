import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../services/firebase";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [bio, setBio] = useState("");
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalFavoritos, setTotalFavoritos] = useState(0);
  const [receitasUsuario, setReceitasUsuario] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUsuario(null);
        return;
      }

      setUsuario(user);

      try {
        const perfilRef = doc(db, "usuarios", user.uid);
        const perfilSnap = await getDoc(perfilRef);

        if (perfilSnap.exists()) {
          setNome(perfilSnap.data().nome || "");
          setBio(perfilSnap.data().bio || "");
        }

        const receitasQuery = query(
          collection(db, "receitas"),
          where("userId", "==", user.uid)
        );

        const receitasSnap = await getDocs(receitasQuery);

        const listaReceitas = receitasSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReceitasUsuario(listaReceitas);
        setTotalReceitas(receitasSnap.size);

        const favoritosQuery = query(
          collection(db, "favoritos"),
          where("userId", "==", user.uid)
        );

        const favoritosSnap = await getDocs(favoritosQuery);

        setTotalFavoritos(favoritosSnap.size);
      } catch (error) {
        console.error(error);
      }
    });

    return () => unsubscribe();
  }, []);

  async function logout() {
    await signOut(auth);
  }

  return (
    <div className="perfil-container">
      {usuario ? (
        <div>
          {/* Cabeçalho do Perfil Centralizado */}
          <div className="perfil-header">
            <div className="avatar-padrao">👤</div>
            <div className="perfil-info">
              <h2>{nome || "Usuário"}</h2>
              <p className="perfil-bio">{bio || "Nenhuma bio cadastrada."}</p>
            </div>
            
            {/* Bloco de Status/Contadores em Linha */}
            <div className="perfil-status">
              <p>🍳 Receitas: {totalReceitas}</p>
              <p>❤️ Favoritos: {totalFavoritos}</p>
            </div>
          </div>

          {/* Seção das Receitas Criadas pelo Usuário */}
          <h3 className="perfil-secao-titulo">Minhas Receitas</h3>

          {receitasUsuario.length === 0 ? (
            <p style={{ color: "#666", margin: "20px 0" }}>Você ainda não publicou receitas.</p>
          ) : (
            /* Essa div com a classe receitas-grid coloca as fotos certinhas lado a lado */
            <div className="receitas-grid">
              {receitasUsuario.map((receita) => (
                <Link
                  key={receita.id}
                  to={`/receita/${receita.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <div className="card-receita">
                    {receita.imagem && (
                      <img
                        src={receita.imagem}
                        alt={receita.titulo}
                        className="card-imagem" /* Mudado para a classe correta do CSS */
                      />
                    )}

                    <h3>{receita.titulo}</h3>
                    <p><strong>Categoria:</strong> {receita.categoria}</p>
                    <p><strong>⏱️ Tempo:</strong> {receita.tempo} min</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <button 
            onClick={logout} 
            style={{ marginTop: "40px", width: "100%", maxWidth: "200px" }}
          >
            Sair da conta
          </button>
        </div>
      ) : (
        <p style={{ textAlign: "center", padding: "40px 0" }}>Você não está logado.</p>
      )}
    </div>
  );
}