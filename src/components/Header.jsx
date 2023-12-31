import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import { Link } from 'react-router-dom';
import { ROUTESNAMES } from 'src/utils';
import {useThemeContext} from 'src/context/themeContext'

export default function Header() {
  const {themeState,toggleTheme}=useThemeContext()

  return (
    <section className='header-section'>
      <AppBar sx={{m:0}} position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}  >   
            <Link to={ROUTESNAMES.todo} className='btn'>
              TODO APP
            </Link>           
          </Typography>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleTheme}
          >
            {themeState=='light'?<Brightness4OutlinedIcon />:<Brightness4RoundedIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </section>
  )
}
