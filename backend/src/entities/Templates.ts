import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Squads } from "./Squads";
import { Usuarios } from "./Usuarios";
import { Campos } from "./Campos";
import { TemplatesSalvosDoUsuario } from "./TemplatesSalvosDoUsuario";
import { Uploads } from "./Uploads";

export enum ExtensaoDeArquivos {
  CSV = ".csv",
  XLX = ".xlx",
  XLSX = ".xlsx",
}

@Entity("templates")
export class Templates {
  @PrimaryGeneratedColumn()
  template_id: number;

  @Column()
  template_nome: string;

  @Column()
  template_colunas: number;

  @Column({ nullable: true })
  template_linhas: number;

  @Column({ type: "timestamptz" })
  template_data_criacao: Date;

  @Column()
  template_status: boolean;

  @Column({
    type: "enum",
    enum: ExtensaoDeArquivos,
  })
  template_extensao: ExtensaoDeArquivos;

  @ManyToOne(() => Usuarios, (usuario) => usuario.templates)
  @JoinColumn({ name: "fk_template_criador" })
  usuario: Usuarios;

  @ManyToOne(() => Squads, (squad) => squad.templates)
  @JoinColumn({ name: "fk_template_squad" })
  squad: Squads;

  @OneToMany(() => Campos, (campos) => campos.template)
  @JoinColumn({ name: "fk_template_campos" })
  campos: Campos[];

  @OneToMany(() => Uploads, (uploads) => uploads.template)
  uploads: Uploads[];

  @OneToMany(
    () => TemplatesSalvosDoUsuario,
    (templatesSalvos) => templatesSalvos.template
  )
  usuariosSalvos: TemplatesSalvosDoUsuario[];
}
