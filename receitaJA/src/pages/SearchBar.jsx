import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [text, setText] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setText(value);
    onSearch(value); // envia pro pai filtrar receitas
  }

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar receitas, ingredientes..."
        value={text}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
}