import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../services/firebase";
import CardReceita from "../components/CardReceita";

export default function Categoria() {
  const { nome } = useParams();

  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarReceitas() {
      try {
        setLoading(true);

        const q = query(
          collection(db, "receitas"),
          where("categoria", "==", nome)
        );

        const querySnapshot = await getDocs(q);

        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReceitas(lista);
      } catch (error) {
        console.error("Erro ao carregar categoria:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarReceitas();
  }, [nome]);

  return (
    <div className="categoria-page">
      <h1>📂 {nome}</h1>

      {loading && <p>Carregando receitas...</p>}

      {!loading && receitas.length === 0 && (
        <p>Nenhuma receita encontrada nessa categoria 😢</p>
      )}

      <div className="categoria-grid">
        {receitas.map((receita) => (
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