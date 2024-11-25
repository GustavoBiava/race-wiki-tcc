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
  const [ labels, setLabels ] = useState([]);
  const [ datasets, setDatasets ] = useState([]);

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
  }, []);

  const handleCompareClick = async () => {
    if (!driver1) return toast.error('Piloto 1 inválido');
    if (!driver2) return toast.error('Piloto 2 inválido');
    if (driver1 === driver2) return toast.error('Pilotos não podem ser iguais!');

    const newLabels = [];
    const newDatasets = [];

      const response1 = await axios.get(`/pages/comparation/${drivers.filter(driver => `${driver.name} ${driver.surname}` === driver1)[0].id}`);
      const data1 = get(response1, 'data');  
      newDatasets.push({
      fill: true,
        label: driver1,
        data: data1.map((race) => race.points),
        backgroundColor: 'rgba(179, 0, 15, 0.5)',
      });    
      data1.map((result) => {
        return newLabels.push(get(result, 'Race.name'));
      });
     
    const response2 = await axios.get(`/pages/comparation/${drivers.filter(driver => `${driver.name} ${driver.surname}` === driver2)[0].id}`);
    const data2 = get(response2, 'data');     
    newDatasets.push({
      fill: true,
      label: driver2,
      data: data2.map((race) => race.points),
      backgroundColor: 'rgba(179, 0, 15, 0.5)',
    });  

    if (data2.length > newLabels.length) {
      data2.map((result) => {
        return newLabels.push(get(result, 'Race.name'));
      });
    }

    setLabels(newLabels);
    setDatasets(newDatasets);
  }

  Chart.defaults.font = {
    family: 'Poppins',
    size: 12,
    weight: '500'
};

Chart.defaults.color = theme.mode === 'dark' ? colors.lightBackground : colors.darkText;

    const data = {
        labels: labels || ['Brasil', 'Baku', 'Monza', 'Singapura', 'Las Vegas', 'Arábia'],
        datasets: datasets || [
          {
            fill: false,
            label: 'Max Verstappen',
            data: [15, 12, 8, 6, 2, 3],
            backgroundColor: colors.secondRed,
          },
          {
            fill: false,
            label: 'Lando Norris',
            data: [25, 18, 2, 1, 2, 2],
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