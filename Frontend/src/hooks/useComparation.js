import { Chart } from 'chart.js/auto';
import * as colors from '../config/colors';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export const useComparation = () => {

  const { theme } = useContext(ThemeContext);

  Chart.defaults.font = {
    family: 'Poppins',
    size: 12,
    weight: '500'
};

Chart.defaults.color = theme.mode === 'dark' ? colors.lightBackground : colors.darkText;

    const data = {
        labels: ['Max Verstappen', 'Lando Norris', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Pontos',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: colors.secondRed,
          },
          
        ],
      };
      
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
        scales: {
          x: {
            grid: {
              display: false, // Remove as linhas da grade no eixo X
            },
            ticks: {
            },
          },
          y: {
            grid: {
              display: true, // Remove as linhas da grade no eixo Y

            },
            ticks: {
            },
          },
        },
      };

    return {
        data,
        options,
    }

}