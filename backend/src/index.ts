import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import { UsuariosController } from "./controllers/UsuariosController";
import { TemplatesController } from "./controllers/TemplatesController";
import { AuthController } from "./controllers/AuthController";

const app = express();

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

/* Rotas de manipulação de Usuários */
app.post("/cadastrar", new UsuariosController().criarNovoUsuarios);

app.post("/login", new AuthController().authenticate);

app.post("/logout", new AuthController().authenticate);

app.get("/usuarios", new UsuariosController().consultarTodosUsuarios);

app.get("/usuarios/:id", new UsuariosController().consultarUsuarioPorID);

app.delete("/usuarios/:id", new UsuariosController().excluirUsuario);

app.put("/usuarios/:id", new UsuariosController().editarUsuario);

/* Rotas de manipulação de Templates */
app.post("/criar-template", new TemplatesController().criarNovoTemplate);

app.get("/templates/:id", new TemplatesController().consultarTemplatePorID);

app.get("/templates", new TemplatesController().consultarTemplatesAtivos);

app.get("/gerenciar-templates", new TemplatesController().consultarTemplatesInativos);

app.delete("/templates/:id", new TemplatesController().excluirTemplate);

app.put("/templates/:id", new TemplatesController().editarTemplate);

app.listen(5000, () => {
  console.log("Servidor está em execução na porta 5000");
});
