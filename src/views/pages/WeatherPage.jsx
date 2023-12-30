import React, { useEffect, useState } from 'react';
import { getUID,LocalStorage, ENDPOINTS, getCurrentLocation,callApi } from 'src/utils';
import { ModalForm, Task,WeatherCard } from 'src/components';

export default function WeatherPage() {
  const [isLoading, setisLoading] = useState(false)
  const [weatherData, setWeatherData] = useState({})
  const getWeatherData = async () => {
    let coordinates=await getCurrentLocation()
    try {
      setisLoading(true)
      let data = await callApi({
        method: ENDPOINTS.getHourlyWeather.method,
        url: `${ENDPOINTS.getHourlyWeather.url}?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
      }        
      );
      setWeatherData(data)
    } catch (err) {
    } finally {
      setisLoading(false)
    }
  };
  useEffect(()=>{
    getWeatherData()
  },[]);
  useEffect(()=>{
   console.log('weatherData',weatherData);
  },[weatherData]);

  return (
    <div>
      <p>{isLoading}</p>
    </div>
  );
}
