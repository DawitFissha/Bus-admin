
import {createTheme} from '@mui/material/styles'
export const theme = createTheme({
    components:{
        MuiTextField:{
            styleOverrides:{
                root:{
                    minWidth:'460px',
                    maxWidth:'600px'
                }
            },
        },
        MuiButton:{
           styleOverrides:{
               root:{
                   fontSize:16,
                   textTransform:'none',
                   backgroundColor:'#087436',
                   color:'white',
                   borderColor: '#0063cc',
                   border:'1px solid',
                   '&:hover':{
                    background:'#087436',
                   },
               }
           },
           defaultProps:{
            variant:'contained',
            size:'medium',
            
           }
        },
        MuiButtonBase:{
            defaultProps:{
                disableRipple:true,
                
            }
        },
        MuiFormControl:{
            defaultProps:{
                variant:'outlined'
            }
        }
    }
})