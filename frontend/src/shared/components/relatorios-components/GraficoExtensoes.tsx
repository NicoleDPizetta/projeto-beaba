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

  const series: { name: string; data: number[] }[] = [
    {
      name: "Porcentagem",
      data: data,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [".xlsx", ".xls", ".csv"],
    },
    colors: ["#39B549", "#F2CA30", "#008D53"],
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
        type="bar"
        height={250}
      />
    </Box>
  );
};
