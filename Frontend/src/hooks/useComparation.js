import { Chart } from 'chart.js/auto';
import * as colors from '../config/colors';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { AdminContext } from '../contexts/AdminContext';
import axios from '../services/axios';
import { get } from 'lodash';

export const useComparation = () => {

  const { theme } = useContext(ThemeContext);
  const { mode, unsetAdmin } = useContext(AdminContext);
  const { drivers, setDrivers } = useState([]);
  const { driver1, setDriver1 } = useState('');
  const { driver2, setDriver2 } = useState('');

  useEffect(() => {
    if (mode === 'admin') unsetAdmin();

  }, []);

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
              display: false,
            },
            ticks: {
            },
          },
          y: {
            grid: {
              display: true,

            },
            ticks: {
            },
          },
        },
      };

    return {
        data,
        options,
        drivers,
        setDriver1,
        driver1,
        setDriver2,
        driver2
    }

}