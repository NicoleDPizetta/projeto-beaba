import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PaginaGerenciarTemplates, PaginaGerenciarUsuarios, PaginaInicial, PaginaTemplatesDisponiveis } from "../pages";

 export const AppRoutes = () => {
/*  useEffect(() => {
    setDrawerOptions({

    })
  }) */

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<PaginaInicial/>} />
      <Route path="/templates-disponiveis" element={<PaginaTemplatesDisponiveis/>} />
      <Route path="*" element={<Navigate to="/criar-template" />} />
      <Route path="/gerenciar-templates" element={<PaginaGerenciarTemplates/>} />
      <Route path="/gerenciar-usuarios" element={<PaginaGerenciarUsuarios />} />
      <Route path="*" element={<Navigate to="/relatios" />} />
    </Routes>
  );
};
