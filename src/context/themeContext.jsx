import { createContext, useContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const themeContext = createContext(undefined);
export const ThemeContextProvider = ({ children }) => {
  const [themeState, setThemeState] = useState('light');

  const toggleTheme=()=>{
    themeState=='light' ? setThemeState('dark') : setThemeState('light')
  }

  return (
    <themeContext.Provider
      value={{
        themeState,
        toggleTheme,
      }}>

      <ThemeProvider theme={
        createTheme({
          palette: {
            mode: themeState,
          },
        })
      }>
      <CssBaseline />
      {children}
      </ThemeProvider>
      
    </themeContext.Provider>
  );
};

export const useThemeContext = () => useContext(themeContext);
