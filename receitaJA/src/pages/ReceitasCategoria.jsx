import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../services/firebase";
import CardReceita from "../components/CardReceita";

export default function ReceitasCategoria() {
  const { categoria } = useParams();

  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    async function carregarReceitas() {
      try {
        const querySnapshot = await getDocs(
          collection(db, "receitas")
        );

        const lista = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (receita) =>
              receita.categoria === categoria
          );

        setReceitas(lista);
      } catch (error) {
        console.error(error);
      }
    }

    carregarReceitas();
  }, [categoria]);

  return (
    <div className="categoria-container">
      <h1>📂 {categoria}</h1>

      {receitas.length === 0 ? (
        <p>Nenhuma receita encontrada.</p>
      ) : (
        receitas.map((receita) => (
          <CardReceita
            key={receita.id}
            id={receita.id}
            titulo={receita.titulo}
            tempo={`${receita.tempo} min`}
            imagem={receita.imagem}
          />
        ))
      )}
    </div>
  );
}