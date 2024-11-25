import { Chart } from 'chart.js/auto';
import * as colors from '../config/colors';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { AdminContext } from '../contexts/AdminContext';
import axios from '../services/axios';
import { get } from 'lodash';
import { toast } from 'react-toastify';

export const useComparation = () => {

  const { theme } = useContext(ThemeContext);
  const { mode, unsetAdmin } = useContext(AdminContext);
  const [ drivers, setDrivers ] = useState([]);
  const [ driver1, setDriver1 ] = useState('');
  const [ driver2, setDriver2 ] = useState('');

  useEffect(() => {
    if (mode === 'admin') unsetAdmin();

    (async function() {
      const response = await axios.get('/pages/comparation/drivers');
      const data = get(response, 'data');      
      return setDrivers(data.map(driver => {
        return {
          id: driver.id,
          name: driver.name,
          surname: driver.surname,
          shortName: driver.short_name,
        }
      }));
    })();

  }, [mode]);

  const handleCompareClick = async () => {
    if (!driver1) return toast.error('Piloto 1 inválido');
    if (!driver2) return toast.error('Piloto 2 inválido');
    const labels = [];

    (async function() {
      const response = await axios.get(`/pages/comparation/${drivers.filter(driver => `${driver.name} ${driver.surname}` === driver1)[0].id}`);
      const data = get(response, 'data');      
      labels.push(get(data, 'Race.name'));
    })();

    (async function() {
      const response = await axios.get(`/pages/comparation/${drivers.filter(driver => `${driver.name} ${driver.surname}` === driver2)[0].id}`);
      const data = get(response, 'data');     
      labels.push(get(data, 'Race.name'));
    })();
  }

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
            fill: true,
            label: 'Pontos',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: colors.secondRed,
          },
          {
            fill: true,
            label: 'Pontos',
            data: [15, 19, 3, 5, 2, 3],
            backgroundColor: colors.mainRed,
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
        driver2,
        handleCompareClick,
    }

}