import { Routes, Route, Navigate } from "react-router-dom";
import {
  PaginaCriarTemplate,
  PaginaGerenciarTemplates,
  PaginaGerenciarUsuarios,
  PaginaInicial,
  PaginaTemplatesDisponiveis,
  PaginaPerfilDoUsuario,
  PaginaLogin,
  PaginaCadastro,
} from "../pages";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<PaginaLogin />} />
      <Route path="/cadastrar" element={<PaginaCadastro />} />
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
