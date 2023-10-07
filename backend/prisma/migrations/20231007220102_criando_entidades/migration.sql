-- CreateTable
CREATE TABLE "Squads" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Squads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" TEXT NOT NULL,
    "nome_completo" TEXT NOT NULL,
    "nome_exibicao" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "permissao" TEXT NOT NULL,
    "squad" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo_dados" TEXT NOT NULL,

    CONSTRAINT "Campos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Templates" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "extensao" TEXT NOT NULL,
    "colunas" INTEGER NOT NULL,
    "linhas" INTEGER,
    "squad" TEXT NOT NULL,
    "criador" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "campos" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Uploads" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "extensao" TEXT NOT NULL,
    "colunas" INTEGER NOT NULL,
    "linhas" INTEGER NOT NULL,
    "squad" TEXT NOT NULL,
    "criador" TEXT NOT NULL,
    "template_origem" TEXT NOT NULL,
    "data_upload" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Uploads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Templates_salvos_do_Usuario" (
    "usario_dono" TEXT NOT NULL,
    "template_salvo" TEXT NOT NULL,

    CONSTRAINT "Templates_salvos_do_Usuario_pkey" PRIMARY KEY ("usario_dono","template_salvo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Squads_nome_key" ON "Squads"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_matricula_key" ON "Usuarios"("matricula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Templates_campos_key" ON "Templates"("campos");

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_squad_fkey" FOREIGN KEY ("squad") REFERENCES "Squads"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campos" ADD CONSTRAINT "Campos_id_fkey" FOREIGN KEY ("id") REFERENCES "Templates"("campos") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_criador_fkey" FOREIGN KEY ("criador") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Templates" ADD CONSTRAINT "Templates_squad_fkey" FOREIGN KEY ("squad") REFERENCES "Squads"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Uploads" ADD CONSTRAINT "Uploads_criador_fkey" FOREIGN KEY ("criador") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Uploads" ADD CONSTRAINT "Uploads_squad_fkey" FOREIGN KEY ("squad") REFERENCES "Squads"("nome") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Uploads" ADD CONSTRAINT "Uploads_template_origem_fkey" FOREIGN KEY ("template_origem") REFERENCES "Templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Templates_salvos_do_Usuario" ADD CONSTRAINT "Templates_salvos_do_Usuario_usario_dono_fkey" FOREIGN KEY ("usario_dono") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Templates_salvos_do_Usuario" ADD CONSTRAINT "Templates_salvos_do_Usuario_template_salvo_fkey" FOREIGN KEY ("template_salvo") REFERENCES "Templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
