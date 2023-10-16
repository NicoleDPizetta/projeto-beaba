import { api } from "./server/api/api";

export const AuthUsuarioLogado = async () => {
  try {
    const response = await api.get("/auth");
    const data = response.data;
    const {
      id,
      nome_completo,
      nome_exibicao,
      matricula,
      permissao,
      squad,
      cargo,
      email,
    } = data;

    return {
      id,
      nome_completo,
      nome_exibicao,
      matricula,
      permissao,
      squad,
      cargo,
      email,
    };
  } catch (error) {
    console.error("Erro ao receber dados:", error);
  }
};
