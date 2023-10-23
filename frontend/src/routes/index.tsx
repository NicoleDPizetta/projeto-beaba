import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  return isAuthenticated ? (acessoNaoPermitido(userPermission, allowedPermissions) || children) : <Navigate to={redirectTo} replace />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <PaginaLogin />} />

        <Route path="/cadastrar" element={isAuthenticated ? <Navigate to="/home" replace /> : <PaginaCadastro />} />
        
        <Route path="/home" element={<PrivateRoute children={<PaginaInicial />} redirectTo={"/login"} allowedPermissions={["PADRAO", "CRIADOR", "ADMINISTRADOR"]} /> } />
        
        <Route path="/templates" element={<PrivateRoute children={<PaginaTemplatesDisponiveis />} redirectTo={"/login"} allowedPermissions={["PADRAO", "CRIADOR", "ADMINISTRADOR"]} /> } />
        
        <Route path="/perfil" element={<PrivateRoute children={<PaginaPerfilDoUsuario />} redirectTo={"/login"} allowedPermissions={["PADRAO", "CRIADOR", "ADMINISTRADOR"]} /> } />
         
        <Route path="/criar-template" element={<PrivateRoute children={<PaginaCriarTemplate />} redirectTo="/login" allowedPermissions={["CRIADOR", "ADMINISTRADOR"]} />} />
        
        <Route path="/gerenciar-templates" element={<PrivateRoute children={<PaginaGerenciarTemplates />} redirectTo="/login" allowedPermissions={["CRIADOR", "ADMINISTRADOR"]} />} />

        <Route path="/usuarios" element={<PrivateRoute children={<PaginaGerenciarUsuarios />} redirectTo="/login" allowedPermissions={["ADMINISTRADOR"]} />} />
        
        <Route path="/relatorios" element={<PrivateRoute children={<PaginaInicial />} redirectTo="/login" allowedPermissions={["ADMINISTRADOR"]} />} />
      </Routes>
    </BrowserRouter>
  );
};
