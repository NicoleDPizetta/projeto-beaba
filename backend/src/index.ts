import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import { UsuariosController } from "./controllers/UsuariosController";
import { TemplatesController } from "./controllers/TemplatesController";
import { AuthController } from "./controllers/AuthController";
import * as auth from "./middlewares/auth";
import * as dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

const userController = new UsuariosController();
const templatesController = new TemplatesController();
const authController = new AuthController();

app.post("/cadastrar", userController.criarNovoUsuario);

app.post("/login", authController.authenticate);

app.get('/auth', auth.authMiddleware, userController.consultarPorToken);

app.get("/usuarios", userController.consultarTodosUsuarios);

app.get("/usuarios/:id", userController.consultarUsuarioPorID);

app.delete("/usuarios/:id", userController.excluirUsuario);

app.put("/usuarios/:id", userController.editarUsuario);

app.post("/criar-template", templatesController.criarNovoTemplate);

app.get("/templates/:id", templatesController.consultarTemplatePorID);

app.get("/templates", auth.authMiddleware, templatesController.consultarTemplatesAtivos);

app.get("/gerenciar-templates", templatesController.consultarTemplatesInativos);

app.delete("/templates/:id", templatesController.excluirTemplate);

app.put("/templates/:id", templatesController.editarTemplate);

app.listen(5000, () => {
  console.log("Servidor está em execução na porta 5000");
});
