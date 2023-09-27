import { CardUsuario, GridBase, Header } from "../../shared/components";
import { LayoutBase } from "../../shared/layouts";

export const PaginaGerenciarUsuarios = () => {
  return (
    <LayoutBase header={<Header />}>
      <GridBase>
        <CardUsuario userName="Nome do Usuário" userID="ID-usuario" userCargo="Cargo" userSquad="Squad" avatarSrc="/broken-image.jpg" userMatricula="980980" userPermissao="Tipo de permissão" />
        <CardUsuario userName="Nome do Usuário" userID="ID-usuario" userCargo="Cargo" userSquad="Squad" avatarSrc="/broken-image.jpg" userMatricula="980980" userPermissao="Tipo de permissão" />
        <CardUsuario userName="Nome do Usuário" userID="ID-usuario" userCargo="Cargo" userSquad="Squad" avatarSrc="/broken-image.jpg" userMatricula="980980" userPermissao="Tipo de permissão" />
        <CardUsuario userName="Nome do Usuário" userID="ID-usuario" userCargo="Cargo" userSquad="Squad" avatarSrc="/broken-image.jpg" userMatricula="980980" userPermissao="Tipo de permissão" />
        <CardUsuario userName="Nome do Usuário" userID="ID-usuario" userCargo="Cargo" userSquad="Squad" avatarSrc="/broken-image.jpg" userMatricula="980980" userPermissao="Tipo de permissão" />
        <CardUsuario userName="Nome do Usuário" userID="ID-usuario" userCargo="Cargo" userSquad="Squad" avatarSrc="/broken-image.jpg" userMatricula="980980" userPermissao="Tipo de permissão" />
        <CardUsuario userName="Nome do Usuário" userID="ID-usuario" userCargo="Cargo" userSquad="Squad" avatarSrc="/broken-image.jpg" userMatricula="980980" userPermissao="Tipo de permissão" />
        <CardUsuario userName="Nome do Usuário" userID="ID-usuario" userCargo="Cargo" userSquad="Squad" avatarSrc="/broken-image.jpg" userMatricula="980980" userPermissao="Tipo de permissão" />
        <CardUsuario userName="Nome do Usuário" userID="ID-usuario" userCargo="Cargo" userSquad="Squad" avatarSrc="/broken-image.jpg" userMatricula="980980" userPermissao="Tipo de permissão" />
      </GridBase>
    </LayoutBase>
  );
};