import * as React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Divider from '@mui/material/Divider';
import Select,{SelectChangeEvent} from '@mui/material/Select';
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl, InputLabel, MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DatePicker } from '@mui/lab';
const TextFieldForBooking = styled(TextField)({
    maxWidth:'200px',
    minWidth:'150px'
})
const initialFormValues = {
  seatNumber:1,
  firstName:'',
  lastName:'',
  phoneNumber:'',
}
export function Booking(){
const [formValues,setFormValues] = React.useState(initialFormValues)
const [schedule,setSchedule] = React.useState('')
const [bookingDate,setBookingDate] = React.useState<Date|null>(new Date())
const handleScheduleChange = (e:SelectChangeEvent)=>{
    setSchedule(e.target.value)
  }
const schedules = useAppSelector(state=>state.schedules.schedules)
const handleFormValuesChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  const {name,value} = e.target
  setFormValues({
    ...formValues,
    [name]:value
  })
}
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div
        style = {{
             width:"850px",
            marginTop:'2px',
            marginLeft:'auto',
            marginRight:'auto',
            height:'auto',
            background:'#FFFF',
            marginBottom:'5px',
        }}
        >
           <Box sx ={{
             paddingTop:"5px"
            //  display:'table-cell',
            //  verticalAlign:"middle"
           }}>
           <h2 style= {{
                textAlign:"center",
            }}>Book A Ticket</h2>
           </Box>
            <Divider/>
         <Box sx={{display:'flex',m:1,paddingBottom:'6px'}}>

         <Box sx={{flexGrow:1}}>
           
           <FormControl sx={{marginLeft:'6px',maxWidth:'250px',minWidth:'180px',}}>
           <InputLabel id="schedule-select-helper-label">Schedule</InputLabel>
           
           <Select
            
             labelId="schedule-select-helper-label"
             id="role-select-helper"
             value={schedule}
             label="Schedule"
             onChange={handleScheduleChange}
           >
             <MenuItem value="">
               <em>None</em>
             </MenuItem>
             {
             schedules.map((schedule)=>(
               <MenuItem  key = {schedule.id} value={schedule.description}>{schedule.description}</MenuItem>
             ))
             }
           </Select>
           </FormControl>
           </Box>
           <Box>
           <DatePicker
            label="Booking Date"
            value={bookingDate}
            onChange={(newValue) => {
            setBookingDate(newValue);
        }}
        renderInput={(params) => <TextFieldForBooking {...params} />}
      />
           </Box>
         </Box>
         <Divider/>
         <Box sx={{m:1}}>
         <h3>Route information</h3>
         </Box>
                  <Box sx={
               {
                 display:'flex',
                 m:1,
                 justifyContent:'space-around',
                 }
               }>
                <Box >
                    {/* source text field goes here  */}
                    <TextFieldForBooking
                    id="source-city"
                    name="Source city"
                    label="Source City"
                    value =''
                        />
                </Box>
                <Box>
                    {/* destination text field goes here  */}
                    <TextFieldForBooking
                    id="destination-city"
                    name="Destination"
                    label="Destination City"
                    value =''
                        />
                </Box>
                <Box>
                    {/* departure date text field goes here  */}
                    <TextFieldForBooking
                    id="departure-date"
                    name="Departure Date"
                    label="Departure Date"
                    value =''
                        />
                </Box>
                <Box>
                    {/* departure time text field goes here  */}
                    <TextFieldForBooking
                    id="departure-time"
                    name="Departure Time"
                    label="Departure Time"
                    value =''
                        />
                </Box>
             </Box>
             <Box sx={{display:'flex',m:1,paddingTop:'10px'}}>
             <Box sx={{marginLeft:'6px'}}>
                    {/* departure time text field goes here  */}
                    <TextFieldForBooking
                    id="departure-time"
                    name="Departure Time"
                    label="Departure Time"
                    value =''
                        />
                </Box>
                <Box sx={{marginLeft:"7px"}}>
                    {/* departure time text field goes here  */}
                    <TextFieldForBooking
                    id="seat-number"
                    name="seatNumber"
                    label="Seat Number"
                    value ={formValues.seatNumber}
                    type='number'
                    onChange = {handleFormValuesChange}
                        />
                </Box>
                <Box sx={{alignSelf:'center',marginLeft:'16px'}}>
                  <Typography color = "primary" variant="button" display="block" gutterBottom>
                Choose a seat
              </Typography>
                </Box>  
                </Box>
                <Divider/>
                <Box sx={{m:1}}>
         <h3>Passenger information</h3>
         </Box>
         <Box sx={
               {
                 display:'flex',
                 m:1,
                 }
               }>
                 <Box sx={{marginLeft:'6px'}}>
                    
                    <TextFieldForBooking
                    id="first-name"
                    name="firstName"
                    label="First Name"
                    value ={formValues.firstName}
                    onChange = {handleFormValuesChange}
                        />
                </Box>
                <Box sx={{marginLeft:'7px'}}>
            
                    <TextFieldForBooking
                    id="last-name"
                    name="lastName"
                    label="Last Name"
                    value ={formValues.lastName}
                    onChange = {handleFormValuesChange}
                        />
                </Box>
                <Box sx={{marginLeft:'7px'}}>
                    <TextFieldForBooking
                    id="phone-number"
                    name="phoneNumber"
                    label="Phone Number"
                    value ={formValues.phoneNumber}
                    onChange = {handleFormValuesChange}
                        />
                </Box>
                 </Box>
                 <Divider/>
              <Box sx={{p:2}}>
              <Button sx={{
                   display:'block',
                   marginLeft: 'auto',
                   marginRight: 'auto',
                   width:"150px"
                 }}> Book Now </Button>
              </Box>
        </div>
        </LocalizationProvider>
    )
}