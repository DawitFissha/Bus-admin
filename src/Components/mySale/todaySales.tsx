import * as React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const rows = [
    {
        id:"0",
        route:'From A to B',
        tickets:12,
        total:5000
    },
    {
        id:"1",
        route:'From X to Y',
        tickets:11,
        total:5500
    },
    {
        id:"2",
        route:'From C to D',
        tickets:10,
        total:4820
    }
]
const todaysTotals = rows.map(row=>row.total)
const totalSalesofTheDay = todaysTotals.reduce((prev,current)=>{
return prev + current
},0)

export function TodaysSalesSummary() {
    return (
        <TableContainer sx={{borderLeft:"8px solid green"}} component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="spanning table">
          <TableHead >
         
            <TableRow >
              
              <TableCell>Route</TableCell>
              <TableCell>Tickets Sold</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.route}</TableCell>
                <TableCell>{row.tickets}</TableCell>
                <TableCell>{row.total}</TableCell>
                
              </TableRow>
            ))}
            <TableRow>
              
              <TableCell colSpan={1}>Today's Total Sum</TableCell>
              <TableCell align="right">
                <strong style={{borderBottom:'2px solid',fontSize:16}}>{totalSalesofTheDay} Birr</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
}