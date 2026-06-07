import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../services/firebase";

export default function AdicionarReceita() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tempo, setTempo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState("");

  function handleImagem(e) {
    const arquivo = e.target.files[0];

    if (!arquivo) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagem(reader.result);
    };

    reader.readAsDataURL(arquivo);
  }

  async function salvarReceita(e) {
    e.preventDefault();

    try {
      await addDoc(collection(db, "receitas"), {
        titulo,
        categoria,
        tempo: Number(tempo),
        descricao,
        imagem,
        userId: auth.currentUser?.uid,
        criadoEm: new Date(),
      });

      alert("Receita cadastrada com sucesso!");

      setTitulo("");
      setCategoria("");
      setTempo("");
      setDescricao("");
      setImagem("");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar receita.");
    }
  }

  return (
    <div className="form-container">
      <h1>Adicionar Receita</h1>

      <form onSubmit={salvarReceita}>
        <input
          type="text"
          placeholder="Título da receita"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Selecione uma categoria</option>
          <option value="Massas">Massas</option>
          <option value="Doces">Doces e Sobremesas</option>
          <option value="Fitness">Fitness</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Carnes">Carnes</option>
          <option value="Lanches">Lanches</option>
        </select>

        <input
          type="number"
          placeholder="Tempo de preparo (min)"
          value={tempo}
          onChange={(e) => setTempo(e.target.value)}
        />

        <textarea
          placeholder="Descrição da receita"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImagem}
        />

        <button type="submit">
          Salvar Receita
        </button>
      </form>
    </div>
  );
}