import { MigrationInterface, QueryRunner } from "typeorm";

export class default1696609430795 implements MigrationInterface {
    name = 'default1696609430795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."uploads_upload_extensao_enum" AS ENUM('.csv', '.xlx', '.xlsx')`);
        await queryRunner.query(`CREATE TABLE "uploads" ("upload_id" SERIAL NOT NULL, "upload_nome" character varying NOT NULL, "upload_colunas" integer NOT NULL, "upload_linhas" integer NOT NULL, "upload_data_envio" TIMESTAMP WITH TIME ZONE NOT NULL, "upload_extensao" "public"."uploads_upload_extensao_enum" NOT NULL, "fk_upload_squad" integer, "fk_upload_criador" integer, "fk_template_origem" integer, CONSTRAINT "PK_4ebde2aed7432e77e3bb111861e" PRIMARY KEY ("upload_id"))`);
        await queryRunner.query(`ALTER TABLE "uploads" ADD CONSTRAINT "FK_2aead9d33f2d28f55b52cdcf3c6" FOREIGN KEY ("fk_upload_squad") REFERENCES "squads"("squad_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "uploads" ADD CONSTRAINT "FK_262efd5946df2f55e6ac183cb0a" FOREIGN KEY ("fk_upload_criador") REFERENCES "usuarios"("usuario_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "uploads" ADD CONSTRAINT "FK_d916e3124029deeff5d1049fbd7" FOREIGN KEY ("fk_template_origem") REFERENCES "templates"("template_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads" DROP CONSTRAINT "FK_d916e3124029deeff5d1049fbd7"`);
        await queryRunner.query(`ALTER TABLE "uploads" DROP CONSTRAINT "FK_262efd5946df2f55e6ac183cb0a"`);
        await queryRunner.query(`ALTER TABLE "uploads" DROP CONSTRAINT "FK_2aead9d33f2d28f55b52cdcf3c6"`);
        await queryRunner.query(`DROP TABLE "uploads"`);
        await queryRunner.query(`DROP TYPE "public"."uploads_upload_extensao_enum"`);
    }

}
