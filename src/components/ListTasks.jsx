import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import {Task} from 'src/components';
export default function ListTasks() {

  return (
    <Box sx={{ width: '100%' , mt: 6}}>
      <Stack spacing={5}>
        {
          [1,1,5,84,6].map((Item,index)=>
            <Task key={index}/> 
          )
        }
      </Stack>
    </Box>
  );
}