import { useEffect, useState } from "react";
import { AuthUsuarioLogado } from "../middleware";

interface UsuarioLogadoInfos {
  permissao: string;
}

export const UsuarioLogadoPermissao = () => {
  const [usuarioLogado, setUsuarioLogado] = useState<UsuarioLogadoInfos>();

  const getUsuarioLogado = async () => {
    const usuario = await AuthUsuarioLogado();
    if (usuario) {
      setUsuarioLogado(usuario);
    } else {
      console.error("AuthUsuarioLogado returned undefined.");
    }
  };

  useEffect(() => {
    getUsuarioLogado();
  }, []);

  const permissao = usuarioLogado?.permissao;
  return permissao;
};
