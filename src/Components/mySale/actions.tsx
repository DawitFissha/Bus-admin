import * as React from 'react'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Tooltip from  '@mui/material/Tooltip'

interface actionsProps {
    passid:string
    onClickEdit:(id:string)=>void
}
export default function Actions(props:actionsProps) {
const {onClickEdit,passid} = props
    return (
        <>
            <Stack sx={{border:'1px solid'}} direction={'row'} spacing={1}>

            <IconButton  
            onClick={()=>onClickEdit(passid)}
            aria-label="edit">
                 <Tooltip title="Edit booking">
                 <EditIcon/>
                 </Tooltip>
                </IconButton>
                <IconButton color="error" aria-label="cancel">
                 <Tooltip title="cancel booking">
                 <CancelIcon/>
                 </Tooltip>
                </IconButton>
                <IconButton aria-label="refund">
                 <Tooltip title="Make a refund">
                 <CurrencyExchangeIcon/>
                 </Tooltip>
                </IconButton>

            </Stack>
        </>
    )
}