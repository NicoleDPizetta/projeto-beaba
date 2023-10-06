import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Usuarios } from "./Usuarios";
import { Templates } from "./Templates";

export enum SquadsNomes {
    BUSINESSTECH = "Business TECH",
    CARTAO = "Cartão",
    MERCANTIL = "Mercantil",
    MOBILE = "Mobile",
    DA = "DA",
}

@Entity('squads')
export class Squads {
    @PrimaryGeneratedColumn()
    squad_id: number;

    @Column({
        type: "enum",
        enum: SquadsNomes,
        })
    squad_nome: SquadsNomes;

    @OneToMany(() => Usuarios, (usuarios) => usuarios.squad)
    usuarios: Usuarios[]

    @OneToMany(() => Templates, (templates) => templates.squad)
    templates: Templates[]
}