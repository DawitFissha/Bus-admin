import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select , {SelectChangeEvent} from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import {useAppDispatch,useAppSelector} from '../../app/hooks'
interface filterPanelProps {
activeSchedule:string,
passSchedule:(sch:string)=>void
}
function SearchFields() {

    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%s',m:1,mt:2}}
      >
        <InputBase
          sx={{ ml: 1}}
          placeholder="Passenger Name"
          inputProps={{ 'aria-label': 'search for a booking' }}
        />
        <Divider color="primary" sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1,}}
          placeholder="Passenger Phone"
          inputProps={{ 'aria-label': 'search for a booking' }}
        />
        <Divider color="primary"  sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1,}}
          placeholder="Passenger Seat"
          inputProps={{ 'aria-label': 'search for a booking' }}
        />
        <Divider color="primary"  sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton /*type="submit" */ sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
     
      </Paper>
    );
  }

export default function FilterPanel(props:filterPanelProps) {

    const {activeSchedule,passSchedule} = props
    const schedules = useAppSelector(state=>state.schedules.schedules)
    const [schedule,setSchedule] = React.useState(activeSchedule)
    const scheduleInfo = useAppSelector(state=>state.schedules.schedules.find(sch=>sch._id===schedule))
    const handleScheduleChange = (e:SelectChangeEvent)=>{
        setSchedule(e.target.value)
        }
    const [dateValue, setDateValue] = React.useState<Date | null>(null);
    React.useEffect(()=>{
      passSchedule(schedule)
    },[schedule])
    return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        
        <div
        style={{
            width:'600px',
            height:'200px',
            backgroundColor:'white',
            borderLeft:"8px solid green"
        }}
        >
   <Box sx={{display:'flex',gap:'15px',flexDirection:'column'}}>
 <Box sx={{display:'flex',gap:'11px',alignItems:'center'}}>
<Box>
<FormControl size='small' sx={{ maxWidth: '250px',minWidth:'180px',m:1}}>
<InputLabel id="demo-simple-select-label">Schedule</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  label="Schedule"
  value={schedule}
  onChange={handleScheduleChange}
  renderValue={(selected)=>{
    const source = schedules?.find(sch=>sch._id===selected)?.source
    const destination = schedules?.find(sch=>sch._id===selected)?.destination
    return `from ${source} to ${destination}`
  }}
>
             {
             schedules.map((schedule)=>(
               <MenuItem  key = {schedule._id} value={schedule._id}>{`from ${schedule.source} to ${schedule.destination}`}</MenuItem>
             ))
             }
</Select>
</FormControl>
</Box>
<Box sx={{mr:.2}}>
From <span style={{color:'green'}}>{scheduleInfo?.source}</span> to <span style={{color:'red'}}>{scheduleInfo?.destination}</span> departing on <strong>{new Date(scheduleInfo?.departureDateAndTime).toLocaleDateString()} </strong>at <strong> {new Date(scheduleInfo?.departureDateAndTime).toLocaleTimeString()}</strong>  from {scheduleInfo?.departurePlace}
</Box>
</Box>    
</Box>      

<SearchFields/>

<DatePicker

label="Booking Date"
value={dateValue}
onChange={(newValue) => {
  setDateValue(newValue);
}}
renderInput={(params) => <TextField  sx={{ maxWidth: '250px',minWidth:'180px',m:1}} {...params} />}
/>

        </div>
        
        </LocalizationProvider>
    )
}