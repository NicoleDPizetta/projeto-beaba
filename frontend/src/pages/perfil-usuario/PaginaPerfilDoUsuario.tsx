import React from "react";
import { LayoutBase } from "../../shared/layouts";
import { PerfilUsuario } from "../../shared/components";

export const PaginaPerfilDoUsuario: React.FC = () => {
    return (
        <LayoutBase>
           <PerfilUsuario nome="Nicole Gabrielly KapczeK Dalzotto Pizetta" nomeExibicao="Nicole" cargo="Estagiario N1" matricula="980191" squad="QQTech" avatarSrc="/foto.jpg" avatarAlt="Nicole"/>
        </LayoutBase>
    )
}