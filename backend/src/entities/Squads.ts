import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Usuarios } from "./Usuarios";

@Entity('squads')
export class Squads {
    @PrimaryGeneratedColumn()
    squad_id: number;

    @Column()
    squad_nome: string;

    @OneToMany(() => Usuarios, (usuarios) => usuarios.squad)
    usuarios: Usuarios[]
}