import React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';

export default function Task({actions,taskItem}) {

  return (
    <Card sx={{ display: 'flex',flexWrap:'wrap-reverse',justifyContent:'space-between',alignItems:'center' ,padding:3,}}>

      <Stack spacing={{ xs: 2, sm: 2 }} direction='row' useFlexGap flexWrap='wrap' justifyContent='space-around' alignItems='center'>

        <Checkbox 
        checked={taskItem.is_checked} 
        inputProps={{ 'aria-label': 'controlled' }} 
        onClick={()=>actions.onToggleCheckedItem(taskItem)}
        />

        <IconButton 
        color="primary" 
        aria-label='edit' 
        size='small' 
        onClick={()=>actions.openEditModal(taskItem)}
        >
          <BorderColorIcon fontSize='inherit' />
        </IconButton>

        <IconButton  
        aria-label='archive' 
        size='small'  
        onClick={()=>actions.onToggleArchiveItem(taskItem)}
        >
          {taskItem.is_archived?<UnarchiveIcon fontSize='inherit' />:<ArchiveIcon color="secondary"  fontSize='inherit' />}
        </IconButton>

        <IconButton  
        color="error" 
        aria-label='delete' 
        size='small'
        onClick={()=>actions.onDeleteItem(taskItem)}
        >
          <DeleteIcon fontSize='inherit' />
        </IconButton>

      </Stack>

      <Typography sx={{textAlign:'center'}}   variant='h6' component='div'>
        {taskItem.title}
      </Typography>

    </Card>
  );
}
