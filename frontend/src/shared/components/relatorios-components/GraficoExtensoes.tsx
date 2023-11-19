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
      height: 390,
      type: "radialBar",
    },
    labels: [".xlsx", ".xls", ".csv"],
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["#39B549", "#F2CA30", "#008D53"],
    legend: {
      show: true,
      floating: true,
      fontSize: "16px",
      position: "left",
      offsetX: 20,
      offsetY: 10,
      labels: {
        useSeriesColors: true,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
      },
      itemMargin: {
        vertical: 3,
      },
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
        type="radialBar"
        height={250}
      />
    </Box>
  );
};
