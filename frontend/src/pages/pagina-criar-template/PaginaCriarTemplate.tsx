import React from "react";
import { CriarTemplateForm, Header } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";

export const PaginaCriarTemplate: React.FC = () => {
  return (
    <LayoutBase header={<Header />}>
      <CriarTemplateForm />
    </LayoutBase>
  );
};
