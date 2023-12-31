import React, { useEffect, useState } from 'react';
import { convertTempTo, ENDPOINTS, getCurrentLocation, callApi } from 'src/utils';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

export default function WeatherPage() {
  const [isLoading, setisLoading] = useState(false);
  const [weatherList, setWeatherList] = useState([]);
  const [weatherDataArr, setWeatherDataArr] = useState([]);
  const [value, setValue] = useState(0);
  const numberOfDay = 24 / 3;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setWeatherDataArr(weatherList[newValue]);
  };
  const getWeatherData = async () => {
    let coordinates = await getCurrentLocation();
    try {
      setisLoading(true);
      let { list } = await callApi({
        method: ENDPOINTS.getHourlyWeather.method,
        url: `${ENDPOINTS.getHourlyWeather.url}?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
      });
      const res = list.reduce((acc, curr, i) => {
        if (!(i % numberOfDay)) {
          // if index is 0 or can be divided by the `size`...
          acc.push(list.slice(i, i + numberOfDay)); // ..push a chunk of the original array to the accumulator
        }
        return acc;
      }, []);
      setWeatherList(res);
      setWeatherDataArr(res[0]);
    } catch (err) {
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Box sx={{ mt: 5, bgcolor: 'background.paper', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <Skeleton animation='wave' variant='rectangular' width='60%' height={100} style={{ borderRadius: 6 }} />
          <Skeleton animation='wave' variant='rectangular' width='80%' height='50vh' style={{ borderRadius: 6 }} />
        </Box>
      ) : (
        <Box sx={{ mt: 5, bgcolor: 'background.paper', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <Tabs value={value} onChange={handleChange} variant='' sx={{marginLeft:'auto',marginRight:'auto',width:"100%",maxWidth:'700px',overflow:"auto"}} scrollButtons allowScrollButtonsMobile aria-label='scrollable force tabs example'>
        {weatherList.map((weatherListItem,index)=><Tab label={moment(weatherListItem[0].dt_txt).format('dddd')} key={index} />)}
      </Tabs>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableBody>
                {weatherDataArr.map((weatherData, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align='center'>{moment(weatherData.dt_txt).format('LT')}</TableCell>
                    <TableCell align='center'>
                      <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`} width='50' alt='' />
                    </TableCell>
                    <TableCell align='center'>{weatherData?.weather[0]?.main}</TableCell>
                    <TableCell align='center'>{convertTempTo(weatherData?.main?.temp, 'K-C')}°C</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}
