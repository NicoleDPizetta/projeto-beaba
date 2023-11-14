import { Box, Typography, Paper, Divider, useTheme } from "@mui/material";
import { BotoesLoginCadastro, Vantagens } from "../../shared/components";

export const LandingPage = () => {
  const theme = useTheme();

  return (
    <Box
      width={"100%"}
      height={"100v%"}
      bgcolor={theme.palette.background.default}
    >
      <Box
        role="navigation"
        width={"100%"}
        bgcolor={theme.palette.primary.main}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-around"}
          gap={4}
          padding={2}
        >
          <Box
            flex={1}
            height={"4.5rem"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <img
              height={"100%"}
              src={"/logo.svg"}
              alt={"Logotipo das Lojas Quero Quero"}
              loading={"lazy"}
            />
          </Box>

          <Typography
            flex={3}
            variant="h6"
            textAlign={"center"}
            color={theme.palette.primary.contrastText}
          >
            Sistema de Gerenciamento Eletrônico de Templates
          </Typography>

          <Box
            flex={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            gap={2}
          >
            <BotoesLoginCadastro />
          </Box>
        </Box>
      </Box>

      <Box
        role="main"
        flex={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Paper
          height={"30rem"}
          component={Box}
          margin={"6rem"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          padding={6}
          gap={6}
        >
          <Box
            height={"80%"}
            flex={1.2}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            textAlign={"center"}
            padding={4}
          >
            <Typography
              variant="h1"
              fontSize={"3.5rem"}
              color={theme.palette.primary.main}
            >
              Padronize seu fluxo de dados e elimine erros!
            </Typography>

            <Box display={"flex"} gap={2} margin={2}>
              <BotoesLoginCadastro />
            </Box>

            <Typography variant={"body1"}>
              Dê adeus à falta de padronização e validação nos seus envios de
              arquivos. Nossa solução foi criada para simplificar e automatizar
              esse processo, tornando o envio de arquivos mais eficiente e livre
              de erros.
            </Typography>
          </Box>

          <Box
            flex={0.9}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <img
              width={"80%"}
              height={"80%"}
              src={"/undraw_booking_re_gw4j.svg"}
              alt={"Logotipo das Lojas Quero Quero"}
              loading={"lazy"}
            />
          </Box>
        </Paper>
      </Box>

      <Box
        flex={1}
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"center"}
      >
        <Box
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Typography
            variant="h6"
            fontSize={"1.5rem"}
            textAlign={"center"}
            color={theme.palette.primary.main}
          >
            Para todos
          </Typography>

          <Box
            width={"98%"}
            display={"flex"}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={4}
          >
            <Vantagens
              key={"vantagem-templates-colegas"}
              texto="Use templates prontos criados por colegas"
              svg="/undraw_typewriter_re_u9i2.svg"
            />

            <Vantagens
              key={"vantagem-praticidade-download"}
              texto="Tenha a praticidade de poder fazer download de templates a qualquer momento"
              svg="/undraw_cloud_files_wmo8.svg"
            />

            <Vantagens
              key={"vantagem-validacao-automatica"}
              texto="Valide seus arquivos de forma automatica!"
              svg="/undraw_certification_re_ifll.svg"
            />

            <Vantagens
              key={"vantagem-armazenamento-seguro"}
              texto="Armazene seus arquivos em um local seguro"
              svg="/undraw_folder_re_apfp.svg"
            />

            <Vantagens
              key={"vantagem-economize-tempo"}
              texto="Economize tempo com o fluxo de dados automatizado"
              svg="/undraw_time_management_re_tk5w.svg"
            />

            <Vantagens
              key={"vantagem-foco-tarefas"}
              texto="Aumente a produtividade focando em outras tarefas"
              svg="/undraw_dev_focus_re_6iwt.svg"
            />
          </Box>
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
        >
          <Typography
            variant="h6"
            fontSize={"1.5rem"}
            textAlign={"center"}
            color={theme.palette.primary.main}
          >
            Para cargos administrativos
          </Typography>

          <Box
            width={"98%"}
            display={"flex"}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={4}
          >
            <Vantagens
              key={"vantagem-criar-templates"}
              texto="Crie templates personalizados para as diferentes necessidades do seu time"
              svg="/undraw_building_blocks_re_5ahy.svg"
            />

            <Vantagens
              key={"vantagem-gerenciar-templates"}
              texto="Ative e desative templates, mantendo o controle sobre quais modelos estão disponíveis"
              svg="/undraw_folder_files_re_2cbm.svg"
            />

            <Vantagens
              key={"vantagem-perfis-permissoes"}
              texto="Gerencie 3 tipos de permissões de usuário diferentes"
              svg="/undraw_subscriptions_re_k7jj.svg"
            />

            <Vantagens
              key={"vantagem-relatorios"}
              texto="Tenha acesso ao dashboard de relatórios para analisar as atividades recentes"
              svg="/undraw_data_re_80ws.svg"
            />

            <Vantagens
              key={"vantagem-uploads"}
              texto="Tenha informações sobre arquivos enviados: Usuario, repositório destino, data e horário"
              svg="/undraw_spreadsheet_re.svg"
            />

            <Vantagens
              key={"vantagem-adeus-erros"}
              texto="Dê adeus aos erros e à falta de padronização nos arquivos enviados pela equipe!"
              svg="/undraw_data_processing_yrrv.svg"
            />

          </Box>
        </Box>
      </Box>

      <Box
        flex={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        paddingY={18}
      >
        <Paper
          component={Box}
          height={"16rem"}
          width={"70%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={2}
          padding={2}
          bgcolor={theme.palette.background.paper}
          borderRadius={".3rem"}
        >
          <Box
            flex={1.2}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={4}
            padding={2}
          >
            <Typography paragraph textAlign={"center"}>
              Pronto para transformar a maneira como sua equipe lida com
              arquivos? Experimente agora o nosso Sistema de Gerenciamento
              Eletrônico de Templates e simplifique seus processos!
            </Typography>

            <Box display={"flex"} gap={2}>
              <BotoesLoginCadastro />
            </Box>
          </Box>

          <Box flex={0.7}>
            <img
              width={"90%"}
              height={"90%"}
              src={"undraw_engineering_team_a7n2.svg"}
              alt={"Time trabalhando em conjunto"}
              loading={"lazy"}
            />
          </Box>
        </Paper>
      </Box>

      <Box
        flex={1}
        bottom={0}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        padding={2}
        bgcolor={theme.palette.primary.main}
      >
        <Typography
          variant="caption"
          color={theme.palette.primary.contrastText}
        >
          Projeto Beabá - Nicole Dalzotto Pizetta - QQTECH Turma 5 - Todos os
          direitos reservados©
        </Typography>
      </Box>
    </Box>
  );
};
