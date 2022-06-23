import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import {fetchSchedules} from '../../features/schedule/scheduleSlice'
import {fetchCashiers} from '../../features/user/cashierSlice'
import TablePaginationActions from './tablePaginationActions'
import LinearProgress from '@mui/material/LinearProgress';
import BookingRow from './bookingRow'

export default function BookingHistory() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

const schedules = useAppSelector(state=>state.schedules.schedules)
const scheduleStatus = useAppSelector(state=>state.schedules.status)
const cashiers = useAppSelector(state=>state.cashiers.cashiers)
const cashierStatus = useAppSelector(state=>state.cashiers.status)
const dispatch = useAppDispatch()
const selectedSchedule = schedules.find(sch=>sch._id === '6214ceeaa0c60a532437d293')
const passengerInfo:any = selectedSchedule?.passangerInfo.map((passInfo:any)=>(
    {
        name:passInfo?.passangerName[0],
        phoneNumber:passInfo?.passangerPhone,
        seatNumber:passInfo?.passangerOccupiedSitNo.join(','),
        tripHistory:{
          bookedBy: cashiers?.find((cashier:any)=>(cashier._id === passInfo?.bookedBy)) ? `${cashiers?.find((cashier:any)=>(cashier._id === passInfo?.bookedBy)).firstName} ${cashiers?.find((cashier:any)=>(cashier._id === passInfo?.bookedBy)).lastName}`:'dummy booker',
          price:selectedSchedule.tarif,
          bookedAt:'Estifanos',
          bookingDate:new Date().toLocaleDateString(),
        }
    }
))

const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - passengerInfo?.length) : 0;

React.useEffect(()=>{
    if(scheduleStatus==='idle'){
        dispatch(fetchSchedules())
      }
      if(cashierStatus === 'idle') {
        dispatch(fetchCashiers())
      }
},[scheduleStatus,dispatch,cashierStatus])
   return (
    <div
    style={{
      maxWidth:"850px",
      background:'#FFFF',
      overflow:'hidden',
    }}
    >
      
    <TableContainer sx={{maxHeight:'570px'}}>
      <Table stickyHeader aria-label="booking history table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Passenger Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell >Seat Number</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
           (rowsPerPage > 0
            ? passengerInfo?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : passengerInfo
          )?.map((row:any,index:number) => (
            <BookingRow  key={index} row={row} />
          ))
          }
        {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
          {
            passengerInfo?
            <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={passengerInfo?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>:
           <Box sx={{ width: '100%' }}>
           <LinearProgress /> loading booking history ...
         </Box>
          }
      </Table>
    </TableContainer>
    
    </div>
  );
}
