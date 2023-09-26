import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

 export const AppRoutes = () => {
/*  useEffect(() => {
    setDrawerOptions({

    })
  }) */

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
      <Route path="*" element={<Navigate to="/templates-disponiveis" />} />
      <Route path="*" element={<Navigate to="/criar-template" />} />
      <Route path="*" element={<Navigate to="/gerenciar-templates" />} />
      <Route path="*" element={<Navigate to="/gerenciar-usuarios" />} />
      <Route path="*" element={<Navigate to="/relatios" />} />
    </Routes>
  );
};
