import React from 'react';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';//beacuse of lazy loading pages
import { Header,Alert } from 'src/components';
import {ThemeContextProvider} from 'src/context/themeContext'
import {AlertProvider} from 'src/context/alertContext'
import Paper from '@mui/material/Paper';

export default function TodoLayouts() {
  return (
    <AlertProvider>
    <ThemeContextProvider >
      <Header />
      <Alert />
      <Paper sx={{mb:5}} elevation={0} className='main-section app-container ' >
        <Suspense fallback={<div>...</div>}>
          <Outlet />
        </Suspense>
      </Paper>
    </ThemeContextProvider>
    </AlertProvider>
  );
}
