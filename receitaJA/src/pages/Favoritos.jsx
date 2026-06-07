import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

import { db, auth } from "../services/firebase";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    async function carregarFavoritos() {
      try {
        if (!auth.currentUser) return;

        const q = query(
          collection(db, "favoritos"),
          where("userId", "==", auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);

        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFavoritos(lista);
      } catch (error) {
        console.error(error);
      }
    }

    carregarFavoritos();
  }, []);

  return (
    <div className="home-container">
      <h1>Meus Favoritos</h1>

      {favoritos.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666", marginTop: "20px" }}>
          Nenhuma receita favoritada ainda.
        </p>
      ) : (
        /* Esta div com a classe receitas-grid organiza todos os cards lado a lado */
        <div className="receitas-grid">
          {favoritos.map((favorito) => (
            <Link
              key={favorito.id}
              to={`/receita/${favorito.receitaId}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="card-receita">
                {favorito.imagem && (
                  <img
                    src={favorito.imagem}
                    alt={favorito.titulo}
                    className="card-imagem"
                  />
                )}

                <h3>{favorito.titulo}</h3>

                <p>
                  <strong>Categoria:</strong> {favorito.categoria}
                </p>

                <p>
                  <strong>⏱️ Tempo:</strong> {favorito.tempo} min
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}