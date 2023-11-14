import { useEffect, useState } from "react";
import {
  CardUsuario,
  GridBase,
  SelectFiltroSquad,
} from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";
import { api } from "../../server/api/api";

interface UsuarioInfos {
  id: string;
  nome_completo: string;
  nome_exibicao: string;
  email: string;
  matricula: string;
  cargo: string;
  senha: string;
  squad: string;
  permissao: string;
}

export const PaginaGerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState<UsuarioInfos[]>([]);
  const [filtroSquad, setFiltroSquad] = useState<string>("Todos");

  const getUsuarios = async () => {
    try {
      const response = await api.get("/usuarios");
      const data = response.data;

      setUsuarios(data);
    } catch (error) {
      console.error("Erro ao receber dados:", error);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const usuariosOrdenados = [...usuarios].sort((a, b) =>
    a.nome_completo.localeCompare(b.nome_completo)
  );

  return (
    <LayoutBase>
      <SelectFiltroSquad
        value={filtroSquad}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          setFiltroSquad(event.target.value as string);
        }}
        titleText="Gerenciar usuários"
      />

      <GridBase>
        {usuariosOrdenados
          .filter((usuario) =>
            filtroSquad !== "Todos" ? usuario.squad === filtroSquad : true
          )
          .map((usuario) => (
            <CardUsuario
              key={usuario.id}
              userID={usuario.id}
              userName={usuario.nome_completo}
              userNickName={usuario.nome_exibicao}
              userCargo={usuario.cargo}
              userSquad={usuario.squad}
              avatarSrc=""
              userMatricula={usuario.matricula}
              userPermissao={usuario.permissao}
            />
          ))}
      </GridBase>
    </LayoutBase>
  );
};
