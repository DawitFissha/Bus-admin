import * as React from 'react' 
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import zemen from './zemen.jfif'

export default function TicketHeader() {
    return (
        <div style ={{width:'100%'}}>
            <Box sx={{display:'flex',flexDirection:'column',bgcolor: 'background.paper', borderRadius: 1 }}>

            <Box sx={{display:'flex',alignItems:'center'}}>
                <Box>
                    <Avatar alt="company logo" src={zemen}/>
                </Box>
                <Box sx={{marginLeft:'11px'}}>
                    Zemen Bus Transportaion Service
                </Box>
                <Box sx={{position:'relative',float:'right'}}>
                    hello
                </Box>
            </Box>
            </Box>
        </div>
    )
}