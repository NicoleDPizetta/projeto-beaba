import { Navigate, Route, Routes } from "react-router-dom";
import {
  PaginaCriarTemplate,
  PaginaGerenciarTemplates,
  PaginaGerenciarUsuarios,
  PaginaInicial,
  PaginaTemplatesDisponiveis,
  PaginaPerfilDoUsuario,
} from "../pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Navigate to="" />} />
      <Route path="/cadastrar" element={<Navigate to="" />} />
      <Route path="/home" element={<PaginaInicial />} />
      <Route path="/templates" element={<PaginaTemplatesDisponiveis />} />
      <Route path="/criar-template" element={<PaginaCriarTemplate />} />
      <Route path="/gerenciar-templates" element={<PaginaGerenciarTemplates />} />
      <Route path="/gerenciar-usuarios" element={<PaginaGerenciarUsuarios />} />
      <Route path="/perfil" element={<PaginaPerfilDoUsuario />} />
      <Route path="/relatorios" element={<Navigate to="" />} />
    </Routes>
  );
};
