import express from "express";
import bodyParser from "body-parser";
import { UsuariosController } from "./controllers/UsuariosController";

const app = express();

app.use(bodyParser.json());

/* Rotas de manipulação de Usuários */
app.post("/cadastrar", new UsuariosController().criarNovoUsuarios);

app.get("/usuarios", new UsuariosController().consultarTodosUsuarios);

app.get("/usuarios/:id", new UsuariosController().consultarUsuarioPorID);

app.delete("/usuarios/:id", new UsuariosController().excluirUsuario);

app.put("/usuarios/:id", new UsuariosController().editarUsuario);

app.listen(3000, () => {
  console.log("Servidor está em execução na porta 3000");
});
