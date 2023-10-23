import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

const isAuthenticated = localStorage.getItem("token") !== null;

export const PrivateRoute = ({ children, redirectTo }: { children: React.ReactElement; redirectTo: string }) => {
  return isAuthenticated ? children : <Navigate to={redirectTo} replace />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <PaginaLogin />} />

        <Route path="/cadastrar" element={isAuthenticated ? <Navigate to="/home" replace /> : <PaginaCadastro />} />

        <Route path="/home" element={<PrivateRoute children={<PaginaInicial />} redirectTo={"/login"} /> } />

        <Route path="/templates" element={<PrivateRoute children={<PaginaTemplatesDisponiveis />} redirectTo={"/login"} /> } />

        <Route path="/criar-template" element={<PrivateRoute children={<PaginaCriarTemplate />} redirectTo={"/login"} /> } />

        <Route path="/gerenciar-templates" element={<PrivateRoute children={<PaginaGerenciarTemplates />} redirectTo={"/login"} /> } />

        <Route path="/usuarios" element={<PrivateRoute children={<PaginaGerenciarUsuarios />} redirectTo={"/login"} /> } />

        <Route path="/perfil" element={<PrivateRoute children={<PaginaPerfilDoUsuario />} redirectTo={"/login"} /> } />

        <Route path="/relatorios" element={<PrivateRoute children={<PaginaInicial />} redirectTo={"/login"} /> } />
      </Routes>
    </BrowserRouter>
  );
};
