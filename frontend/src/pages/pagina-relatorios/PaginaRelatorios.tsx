import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  useTheme,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { styled } from "@mui/material/styles";
import { LayoutBase } from "../../shared/layouts";
import { pyApi } from "../../server/api/api";
import { GraficoExtensoes, GraficoSquads } from "../../shared/components";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: ( event: React.MouseEvent<HTMLButtonElement>, newPage: number ) => void;
}

interface Upload {
  id: string;
  id_gdrive: string;
  nome: string;
  extensao: string;
  data_upload: number;
  criador: string;
  squad: string;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handlePrimeiraPagina = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handlePaginaAnterior = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleProximaPagina = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleUltimaPagina = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handlePrimeiraPagina} disabled={page === 0} aria-label="Primeira página" > 
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />} 
      </IconButton>
      
      <IconButton onClick={handlePaginaAnterior} disabled={page === 0} aria-label="Página anterior" > 
        {theme.direction === "rtl" ? ( <KeyboardArrowRight /> ) : ( <KeyboardArrowLeft /> )} 
      </IconButton>
      
      <IconButton onClick={handleProximaPagina} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Próxima página" > 
        {theme.direction === "rtl" ? ( <KeyboardArrowLeft /> ) : ( <KeyboardArrowRight /> )} 
      </IconButton>
      
      <IconButton onClick={handleUltimaPagina} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="Última página" > 
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />} 
      </IconButton>
    </Box>
  );
}

export const PaginaRelatorios = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [uploads, setUploads] = useState<Upload[]>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - uploads.length) : 0;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getRelatorios = async () => {
    try {
      const response = await pyApi.get("/relatorios");
      const data = response.data;
      console.log(data);
      setUploads(data);
    } catch (error) {
      console.error("Erro ao receber dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRelatorios();
  }, []);

  return (
    <LayoutBase>
      <Paper elevation={3} component={Box} width={"95%"} marginX={"auto"} display={"flex"} gap={2} >
        {isLoading ? 
        (
          <Box flex={4} display={"flex"} justifyContent="center" alignItems="center" padding={4} >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            flex={4}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={4}
            padding={2}
          >
            <Box width={"100%"} display={"flex"} justifyContent={"space-around"} >
              <GraficoExtensoes uploads={uploads} />
              <GraficoSquads uploads={uploads} />
            </Box>
            
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="custom pagination table" >
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Usuário</StyledTableCell>
                    <StyledTableCell>Arquivo</StyledTableCell>
                    <StyledTableCell>Squad</StyledTableCell>
                    <StyledTableCell>Data de Upload</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0 ? uploads.slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage ) : 
                    uploads).map((upload) => (
                      <StyledTableRow key={upload.id}>
                        <TableCell>{upload.criador}</TableCell>
                        <TableCell>{upload.nome}</TableCell>
                        <TableCell>{upload.squad}</TableCell>
                        <TableCell>{new Date(upload.data_upload).toLocaleString()}</TableCell>
                      </StyledTableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, 50, { label: "Todos", value: -1 }]}
                      colSpan={3}
                      count={uploads.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{inputProps: {"aria-label": "Linhas por página"}, native: true}}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
    </LayoutBase>
  );
};
