import React from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
export function SavingProgress({loading}:{loading:boolean}){
    return (
        <>
        {
         loading && (
          <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
         )
       }
        </>
    )
}