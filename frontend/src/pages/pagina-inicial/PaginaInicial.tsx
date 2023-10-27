import { useEffect, useState } from "react";
import { GridBase, TemplatesSalvosDoUsuario } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { AuthUsuarioLogado } from "../../middleware";

export const PaginaInicial = () => {
  const [usuarioLogadoID, setUsuarioLogado] = useState();

  const getUsuarioLogado = async () => {
    const usuario = await AuthUsuarioLogado();
    if (usuario) {
      const usuarioID = usuario.id;
      setUsuarioLogado(usuarioID);
    } else {
      console.error("AuthUsuarioLogado returned undefined.");
    }
  };

  useEffect(() => {
    getUsuarioLogado();
  }, [usuarioLogadoID]);

  return (
    <LayoutBase>
      <GridBase>
        {usuarioLogadoID && <TemplatesSalvosDoUsuario id={usuarioLogadoID} />}
      </GridBase>
    </LayoutBase>
  );
};
