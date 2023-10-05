import { CardTemplate, GridBase, Header } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";

export const PaginaInicial = () => {
  return (
    <LayoutBase header={<Header />}>
      <GridBase>
        <CardTemplate templateStatus={true} templateNome="Nome do Template" templateID="00000" templateSquad="Squad" templateCriador="Nome do criador" templateDataCricao="Data da criação" />
        <CardTemplate templateStatus={true} templateNome="Nome do Template" templateID="00000" templateSquad="Squad" templateCriador="Nome do criador" templateDataCricao="Data da criação" />
        <CardTemplate templateStatus={true} templateNome="Nome do Template" templateID="00000" templateSquad="Squad" templateCriador="Nome do criador" templateDataCricao="Data da criação" />
        <CardTemplate templateStatus={true} templateNome="Nome do Template" templateID="00000" templateSquad="Squad" templateCriador="Nome do criador" templateDataCricao="Data da criação" />
        <CardTemplate templateStatus={true} templateNome="Nome do Template" templateID="00000" templateSquad="Squad" templateCriador="Nome do criador" templateDataCricao="Data da criação" />
      </GridBase>
    </LayoutBase>
  );
};
