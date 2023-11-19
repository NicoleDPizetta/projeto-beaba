import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Box, Typography, useTheme } from "@mui/material";

interface Upload {
  extensao: string;
}

interface GraficoExtensoesProps {
  uploads: Upload[];
}

export const GraficoExtensoes: React.FC<GraficoExtensoesProps> = ({
  uploads,
}) => {
  const theme = useTheme();
  const getPercentagens = (extension: string): string => {
    const totalUploads = uploads.length;
    const count = uploads.filter(
      (upload) => upload.extensao === extension
    ).length;
    const percentagem = (count / totalUploads) * 100;
    return percentagem.toFixed(2);
  };

  const data = [".xlsx", ".xls", ".csv"].map((extension) =>
    parseFloat(getPercentagens(extension))
  );

  const series: number[] = data;

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: [".xlsx", ".xls", ".csv"],
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={2}
    >
      <Typography variant="h6" color={theme.palette.primary.main}>
        Extensões com mais uploads
      </Typography>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={300}
      />
    </Box>
  );
};
