import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell ,{tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppSelector} from '../../app/hooks'
import {useAppDispatch} from '../../app/hooks'
import{styled} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { Dialog, DialogContent } from '@mui/material';
import { BusRegistration } from './busform';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { allBusses } from '../../App';
export function BusList(){

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'green',
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const busStatus = useAppSelector(state=>state.busses.status)
const drivers = useAppSelector(state=>state.drivers.drivers)
const redats = useAppSelector(state=>state.redats.redats)
const BusState = useAppSelector(state=>state.busStates)
const dispatch = useAppDispatch();
const [busId,setBusId] = React.useState<string|null>(null)
const handleBusDelete = (id:string)=>{
    // dispatch(deleteBus(id))
    // console.log('deleted ?')
}
  const [opendDialog,setOpenDialog] = React.useState(false)
  const DialogClose = () => {
    setOpenDialog(false)
  }
  const OpenEditBusForm = (id:string)=>{
    setOpenDialog(true)
    setBusId(id)
  }
  const oldBusData = useAppSelector(state=>state.busses.busses.find(bus=>bus._id===busId))
  console.log(drivers)
  console.log(drivers.find(driver=>driver._id === '62839d11e8b2c30023a67189')?.firstName)
return (
  <>
      <h2>List of Busses</h2>
      {
        busStatus === 'loading'?
        <Box>
          <CircularProgress/>
        </Box>
        :<div>

        {
          
          allBusses.length>0?(
            <TableContainer sx={{maxWidth:1000}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Side Number</StyledTableCell>
            <StyledTableCell align="right">Plate Number</StyledTableCell>
            <StyledTableCell align="right">Driver</StyledTableCell>
            <StyledTableCell align="right">Redat</StyledTableCell>
            <StyledTableCell align="right">Number of Seat</StyledTableCell>
            <StyledTableCell align="right">State</StyledTableCell>
            <StyledTableCell align="right">Activities</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allBusses.map((bus:any) => (
           
            <StyledTableRow
            key={bus._id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <StyledTableCell component="th" scope="row">
              {bus.driverId}
            </StyledTableCell>
            <StyledTableCell align="right">{bus.busPlateNo}</StyledTableCell>
            <StyledTableCell align="right">{`${drivers.find((driver)=>driver._id===bus.driverId)?.firstName} ${drivers.find((driver)=>driver._id===bus.driverId)?.lastName}`}</StyledTableCell>
            <StyledTableCell align="right">{`${redats.find((redat)=>redat._id===bus.redatId)?.firstName} ${redats.find((redat)=>redat._id===bus.redatId)?.lastName}`}</StyledTableCell>
            <StyledTableCell align="right">{bus.totalNoOfSit}</StyledTableCell>
            <StyledTableCell align="right">{bus.busState}</StyledTableCell>
             <StyledTableCell> 
                      <Tooltip title={`Delete ${bus.sideNo}`}>
                      <IconButton color="primary" onClick = {()=>handleBusDelete(bus._id)}>
                     <DeleteIcon/>
                 </IconButton>
                 
                      </Tooltip>
                 <Tooltip title = {`Edit ${bus.sideNo}`}>
                 <IconButton 
                 onClick = {()=>{OpenEditBusForm(bus._id)}}
                 sx = {{marginLeft:'15px'}} color="primary">
                     <EditIcon/>
                 </IconButton>
                 </Tooltip>

                 </StyledTableCell>     
          </StyledTableRow>
           
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          ):<h3>No registered busses yet</h3>
        }
      </div>

      }
    <Dialog open = {opendDialog} onClose = {DialogClose}>
              <DialogContent>
              <BusRegistration
              CloseDialog = {DialogClose}
              providedId = {oldBusData?.id}
              providedsideNo={oldBusData?.sideNo}
              providedDriver = {oldBusData?.driverId}
              providedRedat = {oldBusData?.redatId}
              providedNumberOfSeat = {oldBusData?.totalNoOfSit}
              providedPlateNumber = {oldBusData?.busPlateNo}
              providedState = {oldBusData?.state}
              />
              </DialogContent>
            </Dialog>
  </>
  );
}