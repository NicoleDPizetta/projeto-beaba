import React from "react"
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { UsuarioLogadoPermissao } from "./UsuarioLogadoPermissao";
import {
  PaginaCriarTemplate,
  PaginaGerenciarTemplates,
  PaginaGerenciarUsuarios,
  PaginaInicial,
  PaginaTemplatesDisponiveis,
  PaginaPerfilDoUsuario,
  PaginaLogin,
  PaginaCadastro,
  PaginaUploads,
  PaginaRelatorios,
  PaginaResultadoBusca,
  LandingPage,
} from "../pages";

const isAuthenticated = localStorage.getItem("token") !== null;

const temPermissao = (userPermission: string | undefined, allowedPermissions: string[]) => {
  if (userPermission) {
    return allowedPermissions.includes(userPermission);
  }
  return false;
};

const acessoNaoPermitido = (userPermission: string | undefined, allowedPermissions: string[]) => {
  if (!userPermission || !temPermissao(userPermission, allowedPermissions)) {
    return <Navigate to="/home" replace />;
  }
};

export const PrivateRoute = ({ children, redirectTo, allowedPermissions }: { children: React.ReactElement; redirectTo: string; allowedPermissions: string[] }) => {
  const userPermission = UsuarioLogadoPermissao();
  const navigate = useNavigate();

  if (!userPermission || !temPermissao(userPermission, allowedPermissions)) {
    navigate(redirectTo);
    return null;
  }

  return isAuthenticated ? (acessoNaoPermitido(userPermission, allowedPermissions) || children) : <Navigate to={redirectTo} replace />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <PaginaLogin />} />

        <Route path="/cadastrar" element={isAuthenticated ? <Navigate to="/home" replace /> : <PaginaCadastro />} />
        
        <Route path="/perfil" element={isAuthenticated ? <PaginaPerfilDoUsuario /> : <Navigate to="/login" replace />} />
        
        <Route path="/home" element={<PrivateRoute children={<PaginaInicial />} redirectTo={"/login"} allowedPermissions={["PADRAO", "CRIADOR", "ADMINISTRADOR"]} /> } />

        <Route path="/uploads" element={<PrivateRoute children={<PaginaUploads />} redirectTo={"/login"} allowedPermissions={["PADRAO", "CRIADOR", "ADMINISTRADOR"]} /> } />
        
        <Route path="/templates" element={<PrivateRoute children={<PaginaTemplatesDisponiveis />} redirectTo={"/login"} allowedPermissions={["PADRAO", "CRIADOR", "ADMINISTRADOR"]} /> } />
         
        <Route path="/resultados" element={<PrivateRoute children={<PaginaResultadoBusca />} redirectTo="/login" allowedPermissions={["PADRAO", "CRIADOR", "ADMINISTRADOR"]} />} />

        <Route path="/criar-template" element={<PrivateRoute children={<PaginaCriarTemplate />} redirectTo="/login" allowedPermissions={["CRIADOR", "ADMINISTRADOR"]} />} />
        
        <Route path="/gerenciar-templates" element={<PrivateRoute children={<PaginaGerenciarTemplates />} redirectTo="/login" allowedPermissions={["CRIADOR", "ADMINISTRADOR"]} />} />

        <Route path="/usuarios" element={<PrivateRoute children={<PaginaGerenciarUsuarios />} redirectTo="/login" allowedPermissions={["ADMINISTRADOR"]} />} />
        
        <Route path="/relatorios" element={<PrivateRoute children={<PaginaRelatorios />} redirectTo="/login" allowedPermissions={["ADMINISTRADOR"]} />} />
      </Routes>
    </BrowserRouter>
  );
};
