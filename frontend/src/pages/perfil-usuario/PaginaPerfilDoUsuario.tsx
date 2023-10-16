import React, { useEffect, useState } from "react";
import { LayoutBase } from "../../shared/layouts";
import { PerfilUsuario } from "../../shared/components";
import { AuthUsuarioLogado } from "../../middleware";

interface UsuarioLogadoInfos {
  id: string;
  nome_completo: string;
  nome_exibicao: string;
  matricula: string;
  squad: string;
  cargo: string;
  email: string;
}

export const PaginaPerfilDoUsuario: React.FC = () => {
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

  const userID = usuarioLogado ? usuarioLogado.id : "";
  const nomeCompleto = usuarioLogado ? usuarioLogado.nome_completo : "";
  const nomeExibicao = usuarioLogado ? usuarioLogado.nome_exibicao : "";
  const userEmail = usuarioLogado ? usuarioLogado.email : "";
  const userMatricula = usuarioLogado ? usuarioLogado.matricula : "";
  const nomeSquad = usuarioLogado ? usuarioLogado.squad : "";
  const userCargo = usuarioLogado ? usuarioLogado.cargo : "";
  const avatarAlt = usuarioLogado ? nomeExibicao : "";
  const avatarUsuario = usuarioLogado ? usuarioLogado.nome_completo : avatarAlt;

  return (
    <LayoutBase>
      <PerfilUsuario
        nome_completo={nomeCompleto}
        nome_exibicao={nomeExibicao}
        cargo={userCargo}
        email={userEmail}
        matricula={userMatricula}
        squad={nomeSquad}
        avatarSrc={avatarUsuario}
        avatarAlt={avatarAlt}
      />
    </LayoutBase>
  );
};
