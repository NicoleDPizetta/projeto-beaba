/*
  Warnings:

  - You are about to drop the `Campos` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_gdrive]` on the table `Uploads` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_gdrive` to the `Uploads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Campos" DROP CONSTRAINT "Campos_templateId_fkey";

-- AlterTable
ALTER TABLE "Uploads" ADD COLUMN     "id_gdrive" TEXT NOT NULL;

-- DropTable
DROP TABLE "Campos";

-- CreateIndex
CREATE UNIQUE INDEX "Uploads_id_gdrive_key" ON "Uploads"("id_gdrive");
