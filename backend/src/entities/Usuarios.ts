import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Squads } from "./Squads";
import { Templates } from "./Templates";
import { TemplatesSalvosDoUsuario } from "./TemplatesSalvosDoUsuario";
import { Uploads } from "./Uploads";

export enum UsuarioPermissao {
  ADMIN = "Administrador",
  CRIADOR = "Criador",
  PADRAO = "Padrao",
}

@Entity("usuarios")
export class Usuarios {
  @PrimaryGeneratedColumn()
  usuario_id: number;

  @Column()
  usuario_nome_completo: string;

  @Column()
  usuario_nome_exibicao: string;

  @Column()
  usuario_matricula: string;

  @Column({
    type: "enum",
    enum: UsuarioPermissao,
    default: UsuarioPermissao.PADRAO,
  })
  permissao: UsuarioPermissao;

  @Column()
  usuario_cargo: string;

  @Column()
  usuario_email: string;

  @Column()
  usuario_senha: string;

  @ManyToOne(() => Squads, (squad) => squad.usuarios)
  @JoinColumn({ name: "fk_squad_usuario" })
  squad: Squads;

  @OneToMany(() => Templates, (templates) => templates.usuario)
  templates: Templates[];

  @OneToMany(() => Uploads, (uploads) => uploads.usuario)
  @JoinColumn({ name: "fk_uploads" })
  uploads: Uploads[];

  @OneToMany(
    () => TemplatesSalvosDoUsuario,
    (templatesSalvos) => templatesSalvos.usuario
  )
  templatesSalvos: TemplatesSalvosDoUsuario[];
}
