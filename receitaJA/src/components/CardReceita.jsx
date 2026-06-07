import { Link } from "react-router-dom";

export default function CardReceita({
  id,
  titulo,
  tempo,
  imagem,
}) {
  return (
    <Link
      to={`/receita/${id}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div className="card-receita">
        {imagem && (
          <img
            src={imagem}
            alt={titulo}
            className="card-imagem"
          />
        )}

        <h3>{titulo}</h3>

        <p>⏱️ {tempo}</p>
      </div>
    </Link>
  );
}