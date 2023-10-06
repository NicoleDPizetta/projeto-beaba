import { MigrationInterface, QueryRunner } from "typeorm";

export class default1696608711603 implements MigrationInterface {
    name = 'default1696608711603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "templates_salvos_do_usuario" ("id" SERIAL NOT NULL, "usuarioUsuarioId" integer, "templateTemplateId" integer, CONSTRAINT "PK_ca9120492f19c1c754a4c87469d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."usuarios_permissao_enum" AS ENUM('Administrador', 'Criador', 'Padrao')`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("usuario_id" SERIAL NOT NULL, "usuario_nome_completo" character varying NOT NULL, "usuario_nome_exibicao" character varying NOT NULL, "usuario_matricula" character varying NOT NULL, "permissao" "public"."usuarios_permissao_enum" NOT NULL DEFAULT 'Padrao', "usuario_cargo" character varying NOT NULL, "usuario_email" character varying NOT NULL, "usuario_senha" character varying NOT NULL, "fk_squad_usuario" integer, CONSTRAINT "PK_14bb5fbbada99a453c18106d039" PRIMARY KEY ("usuario_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."squads_squad_nome_enum" AS ENUM('Business TECH', 'Cartão', 'Mercantil', 'Mobile', 'DA')`);
        await queryRunner.query(`CREATE TABLE "squads" ("squad_id" SERIAL NOT NULL, "squad_nome" "public"."squads_squad_nome_enum" NOT NULL, CONSTRAINT "PK_f1534c99fbfaca97e90af468263" PRIMARY KEY ("squad_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."templates_template_extensao_enum" AS ENUM('.csv', '.xlx', '.xlsx')`);
        await queryRunner.query(`CREATE TABLE "templates" ("template_id" SERIAL NOT NULL, "template_nome" character varying NOT NULL, "template_colunas" integer NOT NULL, "template_linhas" integer, "template_data_criacao" TIMESTAMP WITH TIME ZONE NOT NULL, "template_status" boolean NOT NULL, "template_extensao" "public"."templates_template_extensao_enum" NOT NULL, "fk_template_criador" integer, "fk_template_squad" integer, CONSTRAINT "PK_cfafdab99c9325e084ebb3f8aa0" PRIMARY KEY ("template_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."campos_campos_tipo_enum" AS ENUM('VARCHAR', 'INTEGER', 'DECIMAL', 'DATE', 'TIMESTAMPZ')`);
        await queryRunner.query(`CREATE TABLE "campos" ("campos_id" SERIAL NOT NULL, "campos_nome" character varying NOT NULL, "campos_tipo" "public"."campos_campos_tipo_enum" NOT NULL, "templateTemplateId" integer, CONSTRAINT "PK_37a52a6844b150f491cfd38efae" PRIMARY KEY ("campos_id"))`);
        await queryRunner.query(`ALTER TABLE "templates_salvos_do_usuario" ADD CONSTRAINT "FK_21a5fcca1eb8f6374b090f27855" FOREIGN KEY ("usuarioUsuarioId") REFERENCES "usuarios"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "templates_salvos_do_usuario" ADD CONSTRAINT "FK_ee86ba322e84c72ac7f73402c87" FOREIGN KEY ("templateTemplateId") REFERENCES "templates"("template_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "FK_02a3c79f967ac40bf08e2a8dce2" FOREIGN KEY ("fk_squad_usuario") REFERENCES "squads"("squad_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "templates" ADD CONSTRAINT "FK_374f2351c6e2a35a5d0e8d31e39" FOREIGN KEY ("fk_template_criador") REFERENCES "usuarios"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "templates" ADD CONSTRAINT "FK_d2471cc29c470c09bdbb11da45b" FOREIGN KEY ("fk_template_squad") REFERENCES "squads"("squad_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campos" ADD CONSTRAINT "FK_b9425f4ec1f90553e601ffa920e" FOREIGN KEY ("templateTemplateId") REFERENCES "templates"("template_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campos" DROP CONSTRAINT "FK_b9425f4ec1f90553e601ffa920e"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP CONSTRAINT "FK_d2471cc29c470c09bdbb11da45b"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP CONSTRAINT "FK_374f2351c6e2a35a5d0e8d31e39"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "FK_02a3c79f967ac40bf08e2a8dce2"`);
        await queryRunner.query(`ALTER TABLE "templates_salvos_do_usuario" DROP CONSTRAINT "FK_ee86ba322e84c72ac7f73402c87"`);
        await queryRunner.query(`ALTER TABLE "templates_salvos_do_usuario" DROP CONSTRAINT "FK_21a5fcca1eb8f6374b090f27855"`);
        await queryRunner.query(`DROP TABLE "campos"`);
        await queryRunner.query(`DROP TYPE "public"."campos_campos_tipo_enum"`);
        await queryRunner.query(`DROP TABLE "templates"`);
        await queryRunner.query(`DROP TYPE "public"."templates_template_extensao_enum"`);
        await queryRunner.query(`DROP TABLE "squads"`);
        await queryRunner.query(`DROP TYPE "public"."squads_squad_nome_enum"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_permissao_enum"`);
        await queryRunner.query(`DROP TABLE "templates_salvos_do_usuario"`);
    }

}
