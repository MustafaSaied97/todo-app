import React from 'react';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';//beacuse of lazy loading pages
import { Header } from 'src/components';
import {ThemeContextProvider} from 'src/context/themeContext'
import Paper from '@mui/material/Paper';

export default function TodoLayouts() {
  return (
    <ThemeContextProvider >
      <Header />
      <Paper sx={{mb:5}} elevation={0} className='main-section app-container ' >
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Paper>
    </ThemeContextProvider>
  );
}
