import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button'
export function AddButton({description,handleClick}:{description:string,handleClick:()=>void}){
    return (
        <Button 
            onClick = {handleClick}
            size = 'small' sx = {{
            color:'white',
            backgroundColor:'#007FFF',
            marginLeft:'35%',
            fontWeight:'bold',
            // padding:'12px 24px',
            borderRadius:'8px',
            '&:hover': {
                backgroundColor:'#0072E5',
              }
        }} startIcon={<AddIcon/>}>Add {description}</Button>
    )
}
