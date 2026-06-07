import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";
import CardReceita from "../components/CardReceita";

export default function Home() {
  const [receitas, setReceitas] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarReceitas() {
      try {
        const querySnapshot = await getDocs(
          collection(db, "receitas")
        );

        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReceitas(lista);
      } catch (error) {
        console.error("Erro ao carregar receitas:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarReceitas();
  }, []);

  const receitasFiltradas = receitas.filter((receita) =>
    receita?.titulo?.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>ReceitaJá</h1>

      {/* SEARCH STYLE NETFLIX */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar receitas, ingredientes..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="search-input"
        />
      </div>

      <h2>Receitas em Destaque</h2>

      {loading && <p>Carregando receitas...</p>}

      {!loading && receitasFiltradas.length === 0 && (
        <p>Nenhuma receita encontrada ;-;</p>
      )}

      <div className="receitas-grid">
        {receitasFiltradas.map((receita) => (
          <CardReceita
            key={receita.id}
            id={receita.id}
            titulo={receita.titulo}
            tempo={`${receita.tempo} min`}
            imagem={receita.imagem}
          />
        ))}
      </div>
    </div>
  );
}