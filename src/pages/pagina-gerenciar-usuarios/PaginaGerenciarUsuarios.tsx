import { CardUsuario, GridBase, Header } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";

export const PaginaGerenciarUsuarios = () => {
  return (
    <LayoutBase header={<Header />}>
      <GridBase>
        <CardUsuario />
        <CardUsuario />
        <CardUsuario />
        <CardUsuario />
        <CardUsuario />
        <CardUsuario />
      </GridBase>
    </LayoutBase>
  );
};