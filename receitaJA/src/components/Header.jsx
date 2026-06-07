import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/categorias">Categorias</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/perfil">Perfil</Link>
        <Link to="/configuracoes">Configurações</Link>
        <Link to="/login">Login</Link>
        <Link to="/adicionar-receita">Adicionar Receita</Link>
      </nav>
    </header>
  );
}