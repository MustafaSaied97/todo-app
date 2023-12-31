import React, { useEffect, useState } from 'react';
import { getUID, LocalStorage,convertTempTo, ENDPOINTS, getCurrentLocation, callApi } from 'src/utils';
import { ModalForm, Task, WeatherCard } from 'src/components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import moment from 'moment'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default function WeatherPage() {
  const [isLoading, setisLoading] = useState(false);
  const [weatherList, setWeatherList] = useState([...da]);

  const [weatherDataArr, setWeatherDataArr] = useState(da[0]);

  const [value, setValue] = useState(0);
  const numberOfDay = 24/3;
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setWeatherDataArr(weatherList[newValue])
  };
  const getWeatherData = async () => {
    let coordinates = await getCurrentLocation();
    try {
      setisLoading(true);
      let {list} = await callApi({
        method: ENDPOINTS.getHourlyWeather.method,
        url: `${ENDPOINTS.getHourlyWeather.url}?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
      });
      const res = list.reduce((acc, curr, i) => {
        if ( !(i % numberOfDay)  ) {    // if index is 0 or can be divided by the `size`...
          acc.push(list.slice(i, i + numberOfDay));   // ..push a chunk of the original array to the accumulator
        }
        return acc;
      }, []);
      console.log('res',res);
      setWeatherList(res)
      setWeatherDataArr(res[0])

      
      // setWeatherData(data);
    } catch (err) {
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    getWeatherData();
    //dt 1703980800 moment(1703980800).format('dddd')
    //dt_txt 2023-12-31 00:00:00 moment('2023-12-31 00:00:00').format('dddd')

  }, []);
  useEffect(() => {
    console.log('weatherDataArr',weatherDataArr);

  }, [weatherDataArr]);
  

  return (
    <Box sx={{mt:5, bgcolor: 'background.paper', display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems:'center', gap:5 }}>
      <Tabs value={value} onChange={handleChange} variant='scrollable' scrollButtons='auto' aria-label='scrollable auto tabs example'>
        {weatherList.map((weatherListItem,index)=><Tab label={moment(weatherListItem[0].dt_txt).format('dddd')} key={index} />)}
      </Tabs>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {weatherDataArr.map((weatherData,index) => (

            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0},  }}
            >
              <TableCell align="center">{moment(weatherData.dt_txt).format('LT')}</TableCell>
              <TableCell align="center">
                <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`} width="50" alt="" />
              </TableCell>
              <TableCell align="center">{weatherData?.weather[0]?.main}</TableCell>
              <TableCell align="center">{convertTempTo(weatherData?.main?.temp,'K-C')}°C</TableCell>
            </TableRow>
            
          ))}
        </TableBody>

      </Table>
    </TableContainer>

    </Box>
  );
}


var da=[
  [
      {
          "dt": 1703980800,
          "main": {
              "temp": 288.4,
              "feels_like": 287.81,
              "temp_min": 288.4,
              "temp_max": 290.79,
              "pressure": 1021,
              "sea_level": 1021,
              "grnd_level": 1021,
              "humidity": 70,
              "temp_kf": -2.39
          },
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10n"
              }
          ],
          "clouds": {
              "all": 96
          },
          "wind": {
              "speed": 3.96,
              "deg": 347,
              "gust": 5.03
          },
          "visibility": 10000,
          "pop": 0.4,
          "rain": {
              "3h": 0.73
          },
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2023-12-31 00:00:00"
      },
      {
          "dt": 1703991600,
          "main": {
              "temp": 289.12,
              "feels_like": 288.57,
              "temp_min": 289.12,
              "temp_max": 290.56,
              "pressure": 1021,
              "sea_level": 1021,
              "grnd_level": 1020,
              "humidity": 69,
              "temp_kf": -1.44
          },
          "weather": [
              {
                  "id": 803,
                  "main": "Clouds",
                  "description": "broken clouds",
                  "icon": "04n"
              }
          ],
          "clouds": {
              "all": 68
          },
          "wind": {
              "speed": 3.56,
              "deg": 353,
              "gust": 4.97
          },
          "visibility": 10000,
          "pop": 0.28,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2023-12-31 03:00:00"
      },
      {
          "dt": 1704002400,
          "main": {
              "temp": 290.12,
              "feels_like": 289.6,
              "temp_min": 290.12,
              "temp_max": 290.98,
              "pressure": 1022,
              "sea_level": 1022,
              "grnd_level": 1021,
              "humidity": 66,
              "temp_kf": -0.86
          },
          "weather": [
              {
                  "id": 802,
                  "main": "Clouds",
                  "description": "scattered clouds",
                  "icon": "03d"
              }
          ],
          "clouds": {
              "all": 36
          },
          "wind": {
              "speed": 2.69,
              "deg": 341,
              "gust": 3.69
          },
          "visibility": 10000,
          "pop": 0.12,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2023-12-31 06:00:00"
      },
      {
          "dt": 1704013200,
          "main": {
              "temp": 292.99,
              "feels_like": 292.41,
              "temp_min": 292.99,
              "temp_max": 292.99,
              "pressure": 1022,
              "sea_level": 1022,
              "grnd_level": 1022,
              "humidity": 53,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "clouds": {
              "all": 3
          },
          "wind": {
              "speed": 4.45,
              "deg": 327,
              "gust": 4.81
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2023-12-31 09:00:00"
      },
      {
          "dt": 1704024000,
          "main": {
              "temp": 293.05,
              "feels_like": 292.51,
              "temp_min": 293.05,
              "temp_max": 293.05,
              "pressure": 1021,
              "sea_level": 1021,
              "grnd_level": 1020,
              "humidity": 54,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "clouds": {
              "all": 2
          },
          "wind": {
              "speed": 5.2,
              "deg": 328,
              "gust": 5.52
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2023-12-31 12:00:00"
      },
      {
          "dt": 1704034800,
          "main": {
              "temp": 291.82,
              "feels_like": 291.31,
              "temp_min": 291.82,
              "temp_max": 291.82,
              "pressure": 1021,
              "sea_level": 1021,
              "grnd_level": 1020,
              "humidity": 60,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "clouds": {
              "all": 2
          },
          "wind": {
              "speed": 4.38,
              "deg": 341,
              "gust": 5.33
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2023-12-31 15:00:00"
      },
      {
          "dt": 1704045600,
          "main": {
              "temp": 291.24,
              "feels_like": 290.75,
              "temp_min": 291.24,
              "temp_max": 291.24,
              "pressure": 1022,
              "sea_level": 1022,
              "grnd_level": 1021,
              "humidity": 63,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02n"
              }
          ],
          "clouds": {
              "all": 14
          },
          "wind": {
              "speed": 3.2,
              "deg": 7,
              "gust": 4.2
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2023-12-31 18:00:00"
      },
      {
          "dt": 1704056400,
          "main": {
              "temp": 290.65,
              "feels_like": 290.15,
              "temp_min": 290.65,
              "temp_max": 290.65,
              "pressure": 1022,
              "sea_level": 1022,
              "grnd_level": 1022,
              "humidity": 65,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "clouds": {
              "all": 0
          },
          "wind": {
              "speed": 1.93,
              "deg": 22,
              "gust": 2.62
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2023-12-31 21:00:00"
      }
  ],
  [
      {
          "dt": 1704067200,
          "main": {
              "temp": 290.15,
              "feels_like": 289.66,
              "temp_min": 290.15,
              "temp_max": 290.15,
              "pressure": 1021,
              "sea_level": 1021,
              "grnd_level": 1021,
              "humidity": 67,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "clouds": {
              "all": 0
          },
          "wind": {
              "speed": 1.51,
              "deg": 34,
              "gust": 2.33
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-01 00:00:00"
      },
      {
          "dt": 1704078000,
          "main": {
              "temp": 289.35,
              "feels_like": 288.85,
              "temp_min": 289.35,
              "temp_max": 289.35,
              "pressure": 1022,
              "sea_level": 1022,
              "grnd_level": 1021,
              "humidity": 70,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "clouds": {
              "all": 1
          },
          "wind": {
              "speed": 0.96,
              "deg": 137,
              "gust": 1.09
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-01 03:00:00"
      },
      {
          "dt": 1704088800,
          "main": {
              "temp": 288.91,
              "feels_like": 288.47,
              "temp_min": 288.91,
              "temp_max": 288.91,
              "pressure": 1022,
              "sea_level": 1022,
              "grnd_level": 1022,
              "humidity": 74,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "clouds": {
              "all": 3
          },
          "wind": {
              "speed": 1.89,
              "deg": 181,
              "gust": 1.85
          },
          "visibility": 10000,
          "pop": 0.12,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-01 06:00:00"
      },
      {
          "dt": 1704099600,
          "main": {
              "temp": 291.82,
              "feels_like": 291.31,
              "temp_min": 291.82,
              "temp_max": 291.82,
              "pressure": 1022,
              "sea_level": 1022,
              "grnd_level": 1022,
              "humidity": 60,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "clouds": {
              "all": 5
          },
          "wind": {
              "speed": 1.42,
              "deg": 246,
              "gust": 1.37
          },
          "visibility": 10000,
          "pop": 0.24,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-01 09:00:00"
      },
      {
          "dt": 1704110400,
          "main": {
              "temp": 292.34,
              "feels_like": 291.88,
              "temp_min": 292.34,
              "temp_max": 292.34,
              "pressure": 1020,
              "sea_level": 1020,
              "grnd_level": 1020,
              "humidity": 60,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10d"
              }
          ],
          "clouds": {
              "all": 10
          },
          "wind": {
              "speed": 3.29,
              "deg": 306,
              "gust": 3.03
          },
          "visibility": 10000,
          "pop": 0.24,
          "rain": {
              "3h": 0.31
          },
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-01 12:00:00"
      },
      {
          "dt": 1704121200,
          "main": {
              "temp": 292.02,
              "feels_like": 291.5,
              "temp_min": 292.02,
              "temp_max": 292.02,
              "pressure": 1020,
              "sea_level": 1020,
              "grnd_level": 1019,
              "humidity": 59,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10d"
              }
          ],
          "clouds": {
              "all": 99
          },
          "wind": {
              "speed": 3.46,
              "deg": 309,
              "gust": 3.96
          },
          "visibility": 10000,
          "pop": 0.23,
          "rain": {
              "3h": 0.18
          },
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-01 15:00:00"
      },
      {
          "dt": 1704132000,
          "main": {
              "temp": 291.29,
              "feels_like": 290.86,
              "temp_min": 291.29,
              "temp_max": 291.29,
              "pressure": 1021,
              "sea_level": 1021,
              "grnd_level": 1020,
              "humidity": 65,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10n"
              }
          ],
          "clouds": {
              "all": 100
          },
          "wind": {
              "speed": 3.51,
              "deg": 301,
              "gust": 4.46
          },
          "visibility": 10000,
          "pop": 0.35,
          "rain": {
              "3h": 0.24
          },
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-01 18:00:00"
      },
      {
          "dt": 1704142800,
          "main": {
              "temp": 290.96,
              "feels_like": 290.49,
              "temp_min": 290.96,
              "temp_max": 290.96,
              "pressure": 1021,
              "sea_level": 1021,
              "grnd_level": 1020,
              "humidity": 65,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10n"
              }
          ],
          "clouds": {
              "all": 72
          },
          "wind": {
              "speed": 3.49,
              "deg": 292,
              "gust": 4.81
          },
          "visibility": 10000,
          "pop": 0.35,
          "rain": {
              "3h": 0.4
          },
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-01 21:00:00"
      }
  ],
  [
      {
          "dt": 1704153600,
          "main": {
              "temp": 290.9,
              "feels_like": 290.35,
              "temp_min": 290.9,
              "temp_max": 290.9,
              "pressure": 1020,
              "sea_level": 1020,
              "grnd_level": 1020,
              "humidity": 62,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 803,
                  "main": "Clouds",
                  "description": "broken clouds",
                  "icon": "04n"
              }
          ],
          "clouds": {
              "all": 71
          },
          "wind": {
              "speed": 4.14,
              "deg": 287,
              "gust": 5.6
          },
          "visibility": 10000,
          "pop": 0.39,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-02 00:00:00"
      },
      {
          "dt": 1704164400,
          "main": {
              "temp": 290.93,
              "feels_like": 290.38,
              "temp_min": 290.93,
              "temp_max": 290.93,
              "pressure": 1020,
              "sea_level": 1020,
              "grnd_level": 1019,
              "humidity": 62,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "clouds": {
              "all": 0
          },
          "wind": {
              "speed": 4.86,
              "deg": 294,
              "gust": 6.41
          },
          "visibility": 10000,
          "pop": 0.12,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-02 03:00:00"
      },
      {
          "dt": 1704175200,
          "main": {
              "temp": 291.07,
              "feels_like": 290.77,
              "temp_min": 291.07,
              "temp_max": 291.07,
              "pressure": 1021,
              "sea_level": 1021,
              "grnd_level": 1020,
              "humidity": 71,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10d"
              }
          ],
          "clouds": {
              "all": 2
          },
          "wind": {
              "speed": 4.34,
              "deg": 305,
              "gust": 6.06
          },
          "visibility": 10000,
          "pop": 0.31,
          "rain": {
              "3h": 0.3
          },
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-02 06:00:00"
      },
      {
          "dt": 1704186000,
          "main": {
              "temp": 292.64,
              "feels_like": 292.37,
              "temp_min": 292.64,
              "temp_max": 292.64,
              "pressure": 1021,
              "sea_level": 1021,
              "grnd_level": 1021,
              "humidity": 66,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10d"
              }
          ],
          "clouds": {
              "all": 8
          },
          "wind": {
              "speed": 4.84,
              "deg": 314,
              "gust": 5.62
          },
          "visibility": 10000,
          "pop": 0.47,
          "rain": {
              "3h": 0.97
          },
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-02 09:00:00"
      },
      {
          "dt": 1704196800,
          "main": {
              "temp": 293.27,
              "feels_like": 292.9,
              "temp_min": 293.27,
              "temp_max": 293.27,
              "pressure": 1020,
              "sea_level": 1020,
              "grnd_level": 1020,
              "humidity": 60,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10d"
              }
          ],
          "clouds": {
              "all": 9
          },
          "wind": {
              "speed": 5.44,
              "deg": 303,
              "gust": 5.91
          },
          "visibility": 10000,
          "pop": 0.55,
          "rain": {
              "3h": 0.49
          },
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-02 12:00:00"
      },
      {
          "dt": 1704207600,
          "main": {
              "temp": 292.36,
              "feels_like": 291.98,
              "temp_min": 292.36,
              "temp_max": 292.36,
              "pressure": 1020,
              "sea_level": 1020,
              "grnd_level": 1020,
              "humidity": 63,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "clouds": {
              "all": 3
          },
          "wind": {
              "speed": 4.15,
              "deg": 299,
              "gust": 4.93
          },
          "visibility": 10000,
          "pop": 0.04,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-02 15:00:00"
      },
      {
          "dt": 1704218400,
          "main": {
              "temp": 291.49,
              "feels_like": 291.26,
              "temp_min": 291.49,
              "temp_max": 291.49,
              "pressure": 1021,
              "sea_level": 1021,
              "grnd_level": 1020,
              "humidity": 72,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10n"
              }
          ],
          "clouds": {
              "all": 6
          },
          "wind": {
              "speed": 3.97,
              "deg": 285,
              "gust": 5.23
          },
          "visibility": 10000,
          "pop": 0.32,
          "rain": {
              "3h": 0.37
          },
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-02 18:00:00"
      },
      {
          "dt": 1704229200,
          "main": {
              "temp": 291.4,
              "feels_like": 291.21,
              "temp_min": 291.4,
              "temp_max": 291.4,
              "pressure": 1021,
              "sea_level": 1021,
              "grnd_level": 1020,
              "humidity": 74,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10n"
              }
          ],
          "clouds": {
              "all": 64
          },
          "wind": {
              "speed": 4.14,
              "deg": 298,
              "gust": 5.78
          },
          "visibility": 10000,
          "pop": 0.31,
          "rain": {
              "3h": 0.87
          },
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-02 21:00:00"
      }
  ],
  [
      {
          "dt": 1704240000,
          "main": {
              "temp": 290.88,
              "feels_like": 290.59,
              "temp_min": 290.88,
              "temp_max": 290.88,
              "pressure": 1020,
              "sea_level": 1020,
              "grnd_level": 1020,
              "humidity": 72,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 803,
                  "main": "Clouds",
                  "description": "broken clouds",
                  "icon": "04n"
              }
          ],
          "clouds": {
              "all": 82
          },
          "wind": {
              "speed": 3.37,
              "deg": 289,
              "gust": 4.41
          },
          "visibility": 10000,
          "pop": 0.27,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-03 00:00:00"
      },
      {
          "dt": 1704250800,
          "main": {
              "temp": 290.56,
              "feels_like": 290.13,
              "temp_min": 290.56,
              "temp_max": 290.56,
              "pressure": 1020,
              "sea_level": 1020,
              "grnd_level": 1019,
              "humidity": 68,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 804,
                  "main": "Clouds",
                  "description": "overcast clouds",
                  "icon": "04n"
              }
          ],
          "clouds": {
              "all": 100
          },
          "wind": {
              "speed": 3.26,
              "deg": 272,
              "gust": 4.43
          },
          "visibility": 10000,
          "pop": 0.08,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-03 03:00:00"
      },
      {
          "dt": 1704261600,
          "main": {
              "temp": 290.89,
              "feels_like": 290.47,
              "temp_min": 290.89,
              "temp_max": 290.89,
              "pressure": 1020,
              "sea_level": 1020,
              "grnd_level": 1020,
              "humidity": 67,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 804,
                  "main": "Clouds",
                  "description": "overcast clouds",
                  "icon": "04d"
              }
          ],
          "clouds": {
              "all": 100
          },
          "wind": {
              "speed": 3.01,
              "deg": 276,
              "gust": 4.29
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-03 06:00:00"
      },
      {
          "dt": 1704272400,
          "main": {
              "temp": 292.69,
              "feels_like": 292.19,
              "temp_min": 292.69,
              "temp_max": 292.69,
              "pressure": 1021,
              "sea_level": 1021,
              "grnd_level": 1020,
              "humidity": 57,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 804,
                  "main": "Clouds",
                  "description": "overcast clouds",
                  "icon": "04d"
              }
          ],
          "clouds": {
              "all": 100
          },
          "wind": {
              "speed": 3.72,
              "deg": 280,
              "gust": 3.88
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-03 09:00:00"
      },
      {
          "dt": 1704283200,
          "main": {
              "temp": 292.58,
              "feels_like": 292.12,
              "temp_min": 292.58,
              "temp_max": 292.58,
              "pressure": 1019,
              "sea_level": 1019,
              "grnd_level": 1018,
              "humidity": 59,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 804,
                  "main": "Clouds",
                  "description": "overcast clouds",
                  "icon": "04d"
              }
          ],
          "clouds": {
              "all": 100
          },
          "wind": {
              "speed": 4.52,
              "deg": 281,
              "gust": 4.47
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-03 12:00:00"
      },
      {
          "dt": 1704294000,
          "main": {
              "temp": 291.61,
              "feels_like": 291.1,
              "temp_min": 291.61,
              "temp_max": 291.61,
              "pressure": 1019,
              "sea_level": 1019,
              "grnd_level": 1018,
              "humidity": 61,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 804,
                  "main": "Clouds",
                  "description": "overcast clouds",
                  "icon": "04d"
              }
          ],
          "clouds": {
              "all": 100
          },
          "wind": {
              "speed": 3.34,
              "deg": 292,
              "gust": 3.83
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-03 15:00:00"
      },
      {
          "dt": 1704304800,
          "main": {
              "temp": 290.84,
              "feels_like": 290.26,
              "temp_min": 290.84,
              "temp_max": 290.84,
              "pressure": 1019,
              "sea_level": 1019,
              "grnd_level": 1019,
              "humidity": 61,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 803,
                  "main": "Clouds",
                  "description": "broken clouds",
                  "icon": "04n"
              }
          ],
          "clouds": {
              "all": 83
          },
          "wind": {
              "speed": 2.04,
              "deg": 273,
              "gust": 2.55
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-03 18:00:00"
      },
      {
          "dt": 1704315600,
          "main": {
              "temp": 290.29,
              "feels_like": 289.63,
              "temp_min": 290.29,
              "temp_max": 290.29,
              "pressure": 1019,
              "sea_level": 1019,
              "grnd_level": 1019,
              "humidity": 60,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "clouds": {
              "all": 6
          },
          "wind": {
              "speed": 1.8,
              "deg": 253,
              "gust": 2.26
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-03 21:00:00"
      }
  ],
  [
      {
          "dt": 1704326400,
          "main": {
              "temp": 289.82,
              "feels_like": 289.08,
              "temp_min": 289.82,
              "temp_max": 289.82,
              "pressure": 1018,
              "sea_level": 1018,
              "grnd_level": 1018,
              "humidity": 59,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 802,
                  "main": "Clouds",
                  "description": "scattered clouds",
                  "icon": "03n"
              }
          ],
          "clouds": {
              "all": 33
          },
          "wind": {
              "speed": 1.84,
              "deg": 237,
              "gust": 2.39
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-04 00:00:00"
      },
      {
          "dt": 1704337200,
          "main": {
              "temp": 289.16,
              "feels_like": 288.38,
              "temp_min": 289.16,
              "temp_max": 289.16,
              "pressure": 1018,
              "sea_level": 1018,
              "grnd_level": 1017,
              "humidity": 60,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 802,
                  "main": "Clouds",
                  "description": "scattered clouds",
                  "icon": "03n"
              }
          ],
          "clouds": {
              "all": 25
          },
          "wind": {
              "speed": 2.46,
              "deg": 234,
              "gust": 3.57
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-04 03:00:00"
      },
      {
          "dt": 1704348000,
          "main": {
              "temp": 289.97,
              "feels_like": 289.22,
              "temp_min": 289.97,
              "temp_max": 289.97,
              "pressure": 1018,
              "sea_level": 1018,
              "grnd_level": 1018,
              "humidity": 58,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02d"
              }
          ],
          "clouds": {
              "all": 14
          },
          "wind": {
              "speed": 3.45,
              "deg": 254,
              "gust": 5.09
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-04 06:00:00"
      },
      {
          "dt": 1704358800,
          "main": {
              "temp": 292.44,
              "feels_like": 291.7,
              "temp_min": 292.44,
              "temp_max": 292.44,
              "pressure": 1019,
              "sea_level": 1019,
              "grnd_level": 1018,
              "humidity": 49,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "clouds": {
              "all": 3
          },
          "wind": {
              "speed": 5.04,
              "deg": 263,
              "gust": 5.5
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-04 09:00:00"
      },
      {
          "dt": 1704369600,
          "main": {
              "temp": 292.44,
              "feels_like": 291.68,
              "temp_min": 292.44,
              "temp_max": 292.44,
              "pressure": 1017,
              "sea_level": 1017,
              "grnd_level": 1016,
              "humidity": 48,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02d"
              }
          ],
          "clouds": {
              "all": 20
          },
          "wind": {
              "speed": 5.43,
              "deg": 272,
              "gust": 6.22
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-04 12:00:00"
      },
      {
          "dt": 1704380400,
          "main": {
              "temp": 291.56,
              "feels_like": 290.79,
              "temp_min": 291.56,
              "temp_max": 291.56,
              "pressure": 1017,
              "sea_level": 1017,
              "grnd_level": 1017,
              "humidity": 51,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 804,
                  "main": "Clouds",
                  "description": "overcast clouds",
                  "icon": "04d"
              }
          ],
          "clouds": {
              "all": 100
          },
          "wind": {
              "speed": 4.99,
              "deg": 275,
              "gust": 6.24
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "d"
          },
          "dt_txt": "2024-01-04 15:00:00"
      },
      {
          "dt": 1704391200,
          "main": {
              "temp": 291.33,
              "feels_like": 290.67,
              "temp_min": 291.33,
              "temp_max": 291.33,
              "pressure": 1019,
              "sea_level": 1019,
              "grnd_level": 1018,
              "humidity": 56,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 804,
                  "main": "Clouds",
                  "description": "overcast clouds",
                  "icon": "04n"
              }
          ],
          "clouds": {
              "all": 100
          },
          "wind": {
              "speed": 5,
              "deg": 275,
              "gust": 6.57
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-04 18:00:00"
      },
      {
          "dt": 1704402000,
          "main": {
              "temp": 291.08,
              "feels_like": 290.44,
              "temp_min": 291.08,
              "temp_max": 291.08,
              "pressure": 1019,
              "sea_level": 1019,
              "grnd_level": 1019,
              "humidity": 58,
              "temp_kf": 0
          },
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "clouds": {
              "all": 7
          },
          "wind": {
              "speed": 5.03,
              "deg": 273,
              "gust": 7.04
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
              "pod": "n"
          },
          "dt_txt": "2024-01-04 21:00:00"
      }
  ]
]