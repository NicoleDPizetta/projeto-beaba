import { useEffect, useState } from "react";
import {
  AbasDaHome,
  GridBase,
  UploadsDoUsuario,
} from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { AuthUsuarioLogado } from "../../middleware";

export const PaginaUploads = () => {
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
        <AbasDaHome />
        {usuarioLogadoID && <UploadsDoUsuario id={usuarioLogadoID} />}
      </GridBase>
    </LayoutBase>
  );
};
