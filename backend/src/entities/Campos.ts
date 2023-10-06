import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Templates } from "./Templates";

export enum TiposDeDados {
  VARCHAR = "VARCHAR",
  INTEGER = "INTEGER",
  DECIMAL = "DECIMAL",
  DATE = "DATE",
  TIMESTAMPZ = "TIMESTAMPZ",
}

@Entity("campos")
export class Campos {
  @PrimaryGeneratedColumn()
  campos_id: number;

  @Column()
  campos_nome: string;

  @Column({
    type: "enum",
    enum: TiposDeDados,
  })
  campos_tipo: TiposDeDados;

  @ManyToOne(() => Templates, (template) => template.campos)
  template: Templates;
}
