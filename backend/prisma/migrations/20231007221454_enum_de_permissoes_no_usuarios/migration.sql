/*
  Warnings:

  - The `permissao` column on the `Usuarios` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Permissoes" AS ENUM ('PADRAO', 'CRIADOR', 'ADMINISTRADOR');

-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "permissao",
ADD COLUMN     "permissao" "Permissoes" NOT NULL DEFAULT 'PADRAO';
