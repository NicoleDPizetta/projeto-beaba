/*
  Warnings:

  - The primary key for the `Campos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Campos` table. All the data in the column will be lost.
  - The `permissao` column on the `Usuarios` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[templateId]` on the table `Campos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `templateId` to the `Campos` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `campos` on the `Templates` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Permissoes" AS ENUM ('PADRAO', 'CRIADOR', 'ADMINISTRADOR');

-- DropForeignKey
ALTER TABLE "Campos" DROP CONSTRAINT "Campos_id_fkey";

-- DropIndex
DROP INDEX "Templates_campos_key";

-- AlterTable
ALTER TABLE "Campos" DROP CONSTRAINT "Campos_pkey",
DROP COLUMN "id",
ADD COLUMN     "templateId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Templates" DROP COLUMN "campos",
ADD COLUMN     "campos" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "permissao",
ADD COLUMN     "permissao" "Permissoes" NOT NULL DEFAULT 'PADRAO';

-- CreateIndex
CREATE UNIQUE INDEX "Campos_templateId_key" ON "Campos"("templateId");

-- AddForeignKey
ALTER TABLE "Campos" ADD CONSTRAINT "Campos_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
