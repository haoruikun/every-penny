import React from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


export default function DoughnutChart(props) {
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: props.chartdata,
        backgroundColor: props.chartcolor,
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: props.chartlables
  };

  const options = {
    cutout: '50%',
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        tooltip: {
            backgroundColor: theme.palette.background.paper,
            bodyColor: '#000',
            borderColor: theme.palette.divider,
            borderWidth: 1,
            mode: 'index',
            titleFontColor: theme.palette.text.primary,
            callbacks: {
                label: function(TooltipItem) {
                    return TooltipItem.label +': $' + TooltipItem.parsed;
                }
            }
        },
    } 
  };

  return (
    <Card>
      <CardHeader title="Spendings by Categories" sx={{fontWeight: 700}}/>
      <Divider />
      <CardContent>
        <Box
          sx={{
            minHeight: '50vh',
            height: `calc(${props.height} - 105px)`,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};
