import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Box, Typography, useTheme } from "@mui/material";

interface Upload {
  squad: string;
}

interface GraficoSquadsProps {
  uploads: Upload[];
}

export const GraficoSquads: React.FC<GraficoSquadsProps> = ({ uploads }) => {
  const theme = useTheme();
  const getSquadCounts = () => {
    const squadCounts: { [key: string]: number } = {};

    uploads.forEach((upload) => {
      const { squad } = upload;
      if (squadCounts[squad]) {
        squadCounts[squad]++;
      } else {
        squadCounts[squad] = 1;
      }
    });

    return squadCounts;
  };

  const squadCounts = getSquadCounts();

  const squadLabels = Object.keys(squadCounts);
  const squadData = squadLabels.map((squad) => squadCounts[squad]);

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: squadLabels,
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
    },
  };

  const series: number[] = squadData;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      gap={2}
    >
      <Typography variant="h6" color={theme.palette.primary.main}>
        Squads que mais fizeram uploads
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
