import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import {
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

import { db, auth } from "../services/firebase";

export default function Receita() {
  const { id } = useParams();
  const navigate = useNavigate(); 

  // Ajustado para null para garantir que o componente espere os dados do Firebase antes de renderizar a imagem
  const [receita, setReceita] = useState(null);
  const [favoritado, setFavoritado] = useState(false);
  const [favoritoId, setFavoritoId] = useState("");

  useEffect(() => {
    async function carregarReceita() {
      try {
        const docRef = doc(db, "receitas", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setReceita(docSnap.data());
        }

        if (auth.currentUser) {
          const q = query(
            collection(db, "favoritos"),
            where("receitaId", "==", id),
            where("userId", "==", auth.currentUser.uid)
          );

          const favoritosSnap = await getDocs(q);

          if (!favoritosSnap.empty) {
            setFavoritado(true);
            setFavoritoId(favoritosSnap.docs[0].id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    carregarReceita();
  }, [id]);

  async function favoritarReceita() {
    try {
      const docRef = await addDoc(
        collection(db, "favoritos"),
        {
          receitaId: id,
          userId: auth.currentUser?.uid,
          titulo: receita.titulo,
          tempo: receita.tempo,
          categoria: receita.categoria,
          imagem: receita.imagem,
        }
      );

      setFavoritado(true);
      setFavoritoId(docRef.id);

      alert("Receita adicionada aos favoritos ❤️");
    } catch (error) {
      console.error(error);
      alert("Erro ao favoritar receita.");
    }
  }

  async function desfavoritarReceita() {
    try {
      await deleteDoc(
        doc(db, "favoritos", favoritoId)
      );

      setFavoritado(false);
      setFavoritoId("");

      alert("Receita removida dos favoritos 💔");
    } catch (error) {
      console.error(error);
      alert("Erro ao remover favorito.");
    }
  }

  async function excluirReceita() {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta receita? Esta ação não pode ser desfeita.");
    
    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "receitas", id));
      alert("Receita excluída com sucesso! 🗑️");
      navigate("/"); 
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir a receita.");
    }
  }

  // Se a receita ainda for null (carregando do Firebase), mostra o aviso e não quebra a imagem
  if (!receita) {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>Carregando receita...</h2>;
  }

  // Verifica se o usuário logado é o dono da receita com base no userId do banco
  const ehDono = auth.currentUser && receita.userId === auth.currentUser.uid;

  return (
    <div className="receita-container">
      <h1>{receita.titulo}</h1>

      {receita.imagem && (
        <img
          src={receita.imagem}
          alt={receita.titulo}
          className="receita-imagem"
        />
      )}

      <div className="receita-meta">
        <p>
          <strong>📁 Categoria:</strong> {receita.categoria}
        </p>
        <p>
          <strong>⏱️ Tempo:</strong> {receita.tempo} min
        </p>
      </div>

      <h2>Descrição / Modo de Preparo</h2>
      <p className="receita-descricao">{receita.descricao}</p>

      <div className="botoes-container">
        {favoritado ? (
          <button onClick={desfavoritarReceita} className="btn-desfavoritar">
            💔 Desfavoritar
          </button>
        ) : (
          <button onClick={favoritarReceita} className="btn-favoritar">
            ❤️ Favoritar
          </button>
        )}

        {ehDono && (
          <button onClick={excluirReceita} className="btn-excluir">
            🗑️ Excluir Receita
          </button>
        )}
      </div>
    </div>
  );
}