import React from "react";
import { LayoutBase } from "../../shared/layouts";
import { Header, PerfilUsuario } from "../../shared/components";

export const PaginaPerfilDoUsuario: React.FC = () => {
    return (
        <LayoutBase header={<Header />}>
           <PerfilUsuario/>
        </LayoutBase>
    )
}