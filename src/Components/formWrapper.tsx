import * as React from 'react'
import Box, { BoxProps } from '@mui/material/Box';
export const FormWrapper = (props:BoxProps&{customPadding?:number})=>{
    const {sx,customPadding,...other} = props
    return(
        <Box sx={{p:customPadding?customPadding:1,...sx}} {...other}/>
    )
}