import * as React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Divider from '@mui/material/Divider';
import Select,{SelectChangeEvent} from '@mui/material/Select';
import {useAppDispatch,useAppSelector} from '../../app/hooks'
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl, InputAdornment, InputLabel, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import {SavingProgress} from '../../Components/savingProgress'
import { DatePicker } from '@mui/lab';
import { useFormik } from 'formik';
import {SaveSuccessfull} from '../../Components/saveSuccess'
import ScheduleIcon from '@mui/icons-material/Schedule';
import PlaceIcon from '@mui/icons-material/Place';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SvgIcon from '@mui/material/SvgIcon';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SeatPicker from '../../Components/seat-picker'
import {fetchSchedules,resetSchedule} from '../schedule/scheduleSlice'
import {allBusses} from '../../App'
import AuthService from '../../services/auth.service'
type FormTypes = {firstName:string,lastName:string,phoneNumber:string,seatNumber?:number}
const validate = (values:FormTypes) => {
    const errors:Partial<FormTypes> = {}
    
    if (!values.firstName) {
      errors.firstName = 'Please Enter First Name of the Passenger'
    } 
    if (!values.lastName) {
      errors.lastName = 'Please Enter Lasst Name of the Passenger'
    } 
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Please Enter Phone Number of the Passenger'
    } 
    return errors;
  };
const TextFieldForBooking = styled(TextField)({
    maxWidth:'190px',
    minWidth:'140px'
})

export function Booking(){
const [seatPickerOpen,setSeatPickerOpen] = React.useState(false)
const handleClickOpenSeatPicker = ()=>{
  setSeatPickerOpen(true)
}
const handleCloseSeatPickcer = ()=>{
  setSeatPickerOpen(false)
}
const handleSeatChoosing = (seat:number)=>{
  setSeatNumber(prev=>[...prev,seat])
  setSeatPickerOpen(false)
}
const dispatch = useAppDispatch();
const [schedule,setSchedule] = React.useState('')
const [bookingDate,setBookingDate] = React.useState<Date|null>(new Date())
const scheduleInfo = useAppSelector(state=>state.schedules.schedules.find(sch=>sch._id===schedule))
const [saveStatus,setSaveStatus] = React.useState(false)
const handleSaveStatusClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setSaveStatus(false);
};
const [seatNumber, setSeatNumber] = React.useState<number[]>([]);
const handleScheduleChange = (e:SelectChangeEvent)=>{
    setSchedule(e.target.value)
}

const [loading, setLoading] = React.useState(false);
const schedules = useAppSelector(state=>state.schedules.schedules)
const scheduleStatus = useAppSelector(state=>state.schedules.status)
const [seatNumberRequired,setSeatNumberRequired] = React.useState(false)

React.useEffect(()=>{

document.title+=` - Book A Ticket`
  if(scheduleStatus==='idle'){
    dispatch(fetchSchedules())
  }

if(Boolean(schedule&&(seatNumber?.length>0))){
  AuthService.lockSit(seatNumber,schedule)
}
if(seatNumber.length>0){
  setSeatNumberRequired(false)
}

},[scheduleStatus,dispatch,schedule,seatNumber])
const formik = useFormik({
  initialValues: {
  firstName:'',
  lastName:'',
  phoneNumber:'',
  },
  validate,
  onSubmit: async (values,{resetForm}) => {
    if(seatNumber.length===0){
      setSeatNumberRequired(true)
      return 
    }
      if(!loading){
          setLoading(true)
          try {
            await AuthService.bookTicket({
              passname:`${values.firstName} ${values.lastName}`,
              passphone:values.phoneNumber,
              sits:seatNumber
            },schedule)
            
            resetForm({values:{
              seatNumber:1,
              firstName:'',
              lastName:'',
              phoneNumber:'',
            }})
            
            setSeatNumberRequired(false)
            setSeatNumber([])
            setSaveStatus(true)
            dispatch(resetSchedule())
            dispatch(fetchSchedules())
            setSchedule(prev=>prev)
}
          catch(err){
            console.log(`something happened ${err}`)
          }
          finally {
            setLoading(false)
          }
        }
     
  },
});

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SavingProgress loading={loading}/>
          <form onSubmit={formik.handleSubmit}>
        <div
        style = {{
            maxWidth:"850px",
            // marginTop:'2px',
            height:'570px',
            background:'#FFFF',
            // marginBottom:'5px',
        }}
        >
           <Box sx ={{
             paddingTop:"5px"
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
             renderValue={(selected)=>{
               const source = schedules?.find(sch=>sch._id===selected)?.source
               const destination = schedules?.find(sch=>sch._id===selected)?.destination
               return `from ${source} to ${destination}`
             }}
             startAdornment={
             <InputAdornment position="start">
             <ScheduleIcon color='primary' fontSize='large'/>
           </InputAdornment>
           }
           >
             <MenuItem value="">
               <em>None</em>
             </MenuItem>
             {
             schedules.map((schedule)=>(
               <MenuItem  key = {schedule._id} value={schedule._id}>{`from ${schedule.source} to ${schedule.destination}`}</MenuItem>
             ))
             }
           </Select>
           </FormControl>
           </Box>
           <Box>
           <DatePicker
            disabled
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
                    disabled
                    id="source-city"
                    name="Source city"
                    label="Source City"
                    value ={scheduleInfo?scheduleInfo.source:''}
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <PlaceIcon color='primary' fontSize='large'/>
                        </InputAdornment>
                      )
                    }}
                        />
                </Box>
                <Box>
                    {/* destination text field goes here  */}
                    <TextFieldForBooking
                    disabled
                    id="destination-city"
                    name="Destination"
                    label="Destination City"
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <PlaceIcon color='primary' fontSize='large'/>
                        </InputAdornment>
                      )
                    }}
                    value ={scheduleInfo?scheduleInfo.destination:''}
                        />
                </Box>
                <Box>
                    {/* departure date text field goes here  */}
                    <TextFieldForBooking
                    disabled
                    id="departure-date"
                    name="Departure Date"
                    label="Departure Date"
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <EventIcon color='primary' fontSize='large'/>
                        </InputAdornment>
                      )
                    }}
                      
                    value ={scheduleInfo?new Date(scheduleInfo?.departureDateAndTime).toLocaleDateString():''}
                        />
                </Box>
                <Box>
                    {/* departure time text field goes here  */}
                    <TextFieldForBooking
                    disabled
                    id="departure-time"
                    name="Departure Time"
                    label="Departure Time"
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <AccessTimeIcon color='primary' fontSize='large'/>
                        </InputAdornment>
                      )
                    }}
                    value ={scheduleInfo?new Date(scheduleInfo?.departureDateAndTime).toLocaleTimeString():''}
                        />
                </Box>
             </Box>
             <Box sx={{display:'flex',m:1,paddingTop:'10px'}}>
             <Box sx={{marginLeft:'6px'}}>

                    {/* departure place select goes here  */}
                    <FormControl sx={{maxWidth:'250px',minWidth:'200px',}}>
           
              <TextFieldForBooking
                    disabled
                    id="departure-date"
                    name="Departure Date"
                    label="Departure Place"
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                          <SvgIcon color="primary" fontSize="large">
                      <path fill="currentColor" d="M22 7V16C22 16.71 21.62 17.36 21 17.72V19.25C21 19.66 20.66 20 20.25 20H19.75C19.34 20 19 19.66 19 19.25V18H12V19.25C12 19.66 11.66 20 11.25 20H10.75C10.34 20 10 19.66 10 19.25V17.72C9.39 17.36 9 16.71 9 16V7C9 4 12 4 15.5 4S22 4 22 7M13 15C13 14.45 12.55 14 12 14S11 14.45 11 15 11.45 16 12 16 13 15.55 13 15M20 15C20 14.45 19.55 14 19 14S18 14.45 18 15 18.45 16 19 16 20 15.55 20 15M20 7H11V11H20V7M7 9.5C6.97 8.12 5.83 7 4.45 7.05C3.07 7.08 1.97 8.22 2 9.6C2.03 10.77 2.86 11.77 4 12V20H5V12C6.18 11.76 7 10.71 7 9.5Z" />
                    </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                      
                    value ={scheduleInfo?.departurePlace?scheduleInfo?.departurePlace:''}
                        />
           </FormControl>
                </Box>
                <Box sx={{marginLeft:"7px"}}>
                    
                    <TextFieldForBooking
                    id="seat-number"
                    name="seatNumber"
                    label="Seat Number"
                  
                    value={seatNumber?.join(',')}
                    disabled
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <SvgIcon color="primary" fontSize="large">
                        <path fill="currentColor" d="M9 19H15V21H9C6.24 21 4 18.76 4 16V7H6V16C6 17.66 7.34 19 9 19M10.42 5.41C11.2 4.63 11.2 3.36 10.42 2.58C9.64 1.8 8.37 1.8 7.59 2.58C6.81 3.36 6.81 4.63 7.59 5.41C8.37 6.2 9.63 6.2 10.42 5.41M11.5 9C11.5 7.9 10.6 7 9.5 7H9C7.9 7 7 7.9 7 9V15C7 16.66 8.34 18 10 18H15.07L18.57 21.5L20 20.07L14.93 15H11.5L11.5 9Z" />
                        </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    error={seatNumberRequired}
                    helperText={seatNumberRequired && 'Please Select a seat first'}

                        /> 
                        
                </Box>
                <Box sx={{alignSelf:'center',marginLeft:'32px'}}>
                  <Button disabled={!Boolean(schedule)} color = "primary" variant="text" 
                          onClick={handleClickOpenSeatPicker}
                  >
                Choose A Seat
              </Button>
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
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <SvgIcon color='primary' fontSize='large'>
                        <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                        </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                </Box>
                <Box sx={{marginLeft:'7px'}}>
            
                    <TextFieldForBooking
                    id="last-name"
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <SvgIcon color='primary' fontSize='large'>
                        <path fill="currentColor" d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" />
                        </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                </Box>
                <Box sx={{marginLeft:'7px'}}>
                    <TextFieldForBooking
                    id="phone-number"
                    name="phoneNumber"
                    label="Phone Number"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    InputProps={{
                      startAdornment:(
                        <InputAdornment position="start">
                        <LocalPhoneIcon color='primary' fontSize='large'/>
                        </InputAdornment>
                      )
                    }}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    />
                </Box>
                 </Box>
                 <Divider/>
              <Box sx={{p:2}}>
              <Button 
              type="submit"
              sx={{
                   display:'block',
                   marginLeft: 'auto',
                   marginRight: 'auto',
                   width:"150px"
                 }}> Book Now </Button>
              </Box>
              
        </div>
        </form>
        <SaveSuccessfull open={saveStatus} handleClose={handleSaveStatusClose} message = 'Ticket Successfully Booked' />
        <SeatPicker busPlateNo = {scheduleInfo?.assignedBus?allBusses.find((activeBus:any)=>activeBus._id===scheduleInfo?.assignedBus).busPlateNo:'x'} occupiedSeats={scheduleInfo?.occupiedSitNo} numberOfSeat = {scheduleInfo?.totalNoOfSit} handleSeatChoosing = {handleSeatChoosing} open={seatPickerOpen} handleClose = {handleCloseSeatPickcer}/>
        </LocalizationProvider>
    )
}