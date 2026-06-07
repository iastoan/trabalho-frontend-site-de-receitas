import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Categorias from "./pages/Categorias";
import ReceitasCategoria from "./pages/ReceitasCategoria";
import Receita from "./pages/Receita";
import AdicionarReceita from "./pages/AdicionarReceita";
import Favoritos from "./pages/Favoritos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import Configuracoes from "./pages/Configuracoes";

function App() {
  useEffect(() => {
    const tema = localStorage.getItem("tema");

    if (tema === "escuro") {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categoria/:categoria" element={<ReceitasCategoria />} />
        <Route path="/receita/:id" element={<Receita />} />
        <Route path="/adicionar-receita" element={<AdicionarReceita />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;