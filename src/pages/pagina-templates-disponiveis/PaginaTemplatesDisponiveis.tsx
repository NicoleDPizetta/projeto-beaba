import React from "react";
import { CardTemplate, GridBase, Header } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";

export const PaginaTemplatesDisponiveis: React.FC = () => {
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
    )
}