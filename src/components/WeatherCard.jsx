import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTESNAMES, convertTempTo } from 'src/utils';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

export default function WeatherCard({temp,main,location,time,iconId}) {

  return (
    <Link to={ROUTESNAMES.weather} className='no-decoration'>
        <Card sx={{ display: 'flex' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component='div' variant='h5'>
                    {temp&&convertTempTo(temp,'K-C')} °C
                    </Typography>
                    <Typography component='div' variant='subtitle1'>
                    {main}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary' component='div'>
                    {location}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary' component='div'>
                    {time}
                    </Typography>

                </CardContent>
            </Box>
        <CardMedia component='img' sx={{ width: 120 }} image={`https://openweathermap.org/img/wn/${iconId}@2x.png`} alt='Live from space album cover' />
        </Card>
    </Link>
  );
}
