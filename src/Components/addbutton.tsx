import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
export function AddButton({description,handleClick}:{description:string,handleClick:()=>void}){
    return (
        <Tooltip title = {`Register New ${description}`}>
            <Button 
            onClick = {handleClick}
            size = 'small' sx = {{
            color:'white',
            backgroundColor:'#007FFF',
            marginLeft:'35%',
            fontWeight:'bold',
            marginTop:'5px',
            borderRadius:'8px',
            '&:hover': {
                backgroundColor:'#0072E5',
              }
        }} startIcon={<AddIcon/>}>Add {description}</Button>
        </Tooltip>
    )
}
