import { CardTemplate, GridBase, Header } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";

export const PaginaInicial = () => {
  return (
    <LayoutBase header={<Header />}>
      <GridBase>
        <CardTemplate />
        <CardTemplate />
        <CardTemplate />
        <CardTemplate />
        <CardTemplate />
        <CardTemplate />
      </GridBase>
    </LayoutBase>
  );
};
