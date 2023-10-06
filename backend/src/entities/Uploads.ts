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
import { Usuarios } from "./Usuarios";

export enum ExtensaoDeArquivos {
  CSV = ".csv",
  XLX = ".xlx",
  XLSX = ".xlsx",
}

@Entity("uploads")
export class Uploads {
  @PrimaryGeneratedColumn()
  upload_id: number;

  @Column()
  upload_nome: string;

  @Column()
  upload_colunas: number;

  @Column()
  upload_linhas: number;

  @Column({ type: "timestamptz" })
  upload_data_envio: Date;

  @Column({
    type: "enum",
    enum: ExtensaoDeArquivos,
  })
  upload_extensao: ExtensaoDeArquivos;

  @ManyToOne(() => Squads, (squad) => squad.templates)
  @JoinColumn({ name: "fk_upload_squad" })
  squad: Squads;

  @ManyToOne(() => Usuarios, (usuario) => usuario.uploads)
  @JoinColumn({ name: "fk_upload_criador" })
  usuario: Usuarios;

  @ManyToOne(() => Templates, (template) => template.uploads)
  @JoinColumn({ name: "fk_template_origem" })
  template: Templates;
}
