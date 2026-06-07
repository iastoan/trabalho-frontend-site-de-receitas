import { Link } from "react-router-dom";

import massasImg from "../assets/categorias/massa.jpg";
import docesImg from "../assets/categorias/doces.webp";
import fitnessImg from "../assets/categorias/comida-fitness.jpg";
import bebidasImg from "../assets/categorias/bebidas.jpg";
import carnesImg from "../assets/categorias/carnes.jpg";
import lanchesImg from "../assets/categorias/lanches.jpeg";

export default function Categorias() {
  return (
    <div className="home-container">
      <h1>Categorias</h1>

      {/* Essa div é o segredo para alinhar os Links lado a lado sem esticar as imagens */}
      <div className="categorias-grid">

        <Link to="/categoria/Massas">
          <div className="categoria">
            <img src={massasImg} alt="Massas" />
            <h3>🍝 Massas</h3>
          </div>
        </Link>

        <Link to="/categoria/Doces">
          <div className="categoria">
            <img src={docesImg} alt="Doces e Sobremesas" />
            <h3>🍰 Doces e Sobremesas</h3>
          </div>
        </Link>

        <Link to="/categoria/Fitness">
          <div className="categoria">
            <img src={fitnessImg} alt="Fitness" />
            <h3>💪 Fitness</h3>
          </div>
        </Link>

        <Link to="/categoria/Bebidas">
          <div className="categoria">
            <img src={bebidasImg} alt="Bebidas" />
            <h3>🥤 Bebidas</h3>
          </div>
        </Link>

        <Link to="/categoria/Carnes">
          <div className="categoria">
            <img src={carnesImg} alt="Carnes" />
            <h3>🥩 Carnes</h3>
          </div>
        </Link>

        <Link to="/categoria/Lanches">
          <div className="categoria">
            <img src={lanchesImg} alt="Lanches" />
            <h3>🥪 Lanches</h3>
          </div>
        </Link>

      </div> {/* Fim da grid */}
    </div>
  );
}