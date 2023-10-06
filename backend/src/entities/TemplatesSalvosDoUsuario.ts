import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Usuarios } from "./Usuarios";
import { Templates } from "./Templates";

@Entity()
export class TemplatesSalvosDoUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuarios, (usuario) => usuario.templatesSalvos)
  usuario: Usuarios;

  @ManyToOne(() => Templates, (template) => template.usuariosSalvos)
  template: Templates;
}
