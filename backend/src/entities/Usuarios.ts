import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Squads } from "./Squads";

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
    permissao: UsuarioPermissao

  @Column()
  usuario_cargo: string;

  @Column()
  usuario_email: string;

  @Column()
  usuario_senha: string;

  @ManyToOne(() => Squads, (squad) => squad.usuarios)
  @JoinColumn({name: "fk_squad_usuario"})
  squad: Squads
}
