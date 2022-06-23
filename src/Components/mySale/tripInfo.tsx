import * as React from 'react'
import Box from '@mui/material/Box'

interface passengerBoxProps {
    bookingDate:string,
    bookedBy:string,
    bookedAt:string
    price:number
}
const passengerHistory = [
    {
    id:'booking-date',
    label:'Booking Date',
    value :'2022-9-5'
},
{
    id:'booked at',
    label:'Booked At',
    value :'Estifanos'
},
{
    id:'bookedby',
    label:'Booked By',
    value :'Senait malone'
},
{
    id:'price',
    label:'Price',
    value :'620 Birr'
},
]
function SingleBox(props:{passHistory:passengerBoxProps}) {
    const {bookedBy,bookingDate,price,bookedAt} =props.passHistory
    return (
        <>
        {/* <p>Hello</p> */}
                <Box sx={{display:'flex',gap:'6px'}}>
                    
                    <Box>
                        <strong>Booking Date</strong> -
               </Box>
               <Box>
                   {bookingDate}
               </Box>
               
               </Box>
               <Box sx={{display:'flex',gap:'6px'}}>
                    
                    <Box>
                        <strong>Booking At</strong> -
               </Box>
               <Box>
                   {bookedAt}
               </Box>
               
               </Box>
               <Box sx={{display:'flex',gap:'6px'}}>
                    
                    <Box>
                        <strong>Booked By</strong> -
               </Box>
               <Box>
                   {bookedBy}
               </Box>
               
               </Box>
               <Box sx={{display:'flex',gap:'6px'}}>
                    
                    <Box>
                        <strong>Price</strong> -
               </Box>
               <Box>
                   {price}
               </Box>
               
               </Box>
        </>
    )
  
}
 const TripInfo = ({tripInfo}:{tripInfo:passengerBoxProps}) => {
    return (
        <>
        <Box sx={{fontWeight:'normal', fontSize:14, marginLeft:1,marginRight:1,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            
                
                  <SingleBox passHistory={tripInfo}/>
            
            </Box>
        </>
    )
}
export default TripInfo