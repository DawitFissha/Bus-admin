import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Tooltip from  '@mui/material/Tooltip'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TripInfo from './tripInfo'
import Actions from './actions'
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
interface tripInfoProps {
    bookingDate:string,
    bookedBy:string,
    bookedAt:string
    price:number
  }
  
interface bookingRowProps {
    name: string,
    phoneNumber: string,
    seatNumber: string,
    tripHistory:tripInfoProps
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontWeight:'bolder',
    fontFamily: "sans-serif",
    fontSize:16,
  },
}));

export default function BookingRow(props: { row: bookingRowProps}) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <StyledTableCell>
            <Tooltip title="More details">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </Tooltip>
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">
            {row.name}
          </StyledTableCell>
          <StyledTableCell sx={{fontWeight:'bolder'}} component="th" scope="row">{row.phoneNumber}</StyledTableCell>
          <StyledTableCell component="th" scope="row">{row.seatNumber}</StyledTableCell>
          <StyledTableCell align ="center" component="th" scope="row">
            <Actions/>
          </StyledTableCell>
        </TableRow>
        <TableRow>
          <StyledTableCell style={{padding: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{backgroundColor: 'white', marginLeft: 0}}>
                <Typography sx={{marginLeft:1}} variant="h6" gutterBottom component="div">
                  Trip Information
                </Typography>
              
                    <TripInfo tripInfo = {row.tripHistory}/>
                  
                
              </Box>
            </Collapse>
          </StyledTableCell>
        </TableRow>
      </React.Fragment>
    );
  }