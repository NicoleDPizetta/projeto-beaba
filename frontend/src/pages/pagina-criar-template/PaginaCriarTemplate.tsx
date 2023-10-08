import React from "react";
import { CriarTemplateForm } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";

export const PaginaCriarTemplate: React.FC = () => {
  return (
    <LayoutBase>
      <CriarTemplateForm />
    </LayoutBase>
  );
};
