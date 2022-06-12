import * as React from 'react'
import {getSeatList} from '../../utils/getSeatList'
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import SeatBox from './seatBox'
interface SeatBoxesProps {
    chooseSeat:(seat:number)=>void
    noOfSeat?:number
    occupiedSeats:number[]
  }
const SeatBoxes = (props:SeatBoxesProps)=> {
    const {chooseSeat,noOfSeat,occupiedSeats} = props
      return (
          <>
          {
              getSeatList(noOfSeat?noOfSeat:49).map((value:number)=>(
                  <Grid key = {value} item xs={2}>
                  <Tooltip title={`Seat - ${value}`}>
                  <SeatBox  variant='outlined'
                            sx = {{backgroundColor:occupiedSeats.includes(value)?'red':'green',
                                  pointerEvents:occupiedSeats.includes(value)?'none':'auto'
                                  }}
                            onClick={()=>chooseSeat(value)}>
                    {value}
                  </SeatBox>
                  </Tooltip>
                </Grid>
              ))
          }
          </>
      )
  }
  export default SeatBoxes