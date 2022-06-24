
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Booking} from '../../features/bookings'
import BookingHistory from '../mySale/sales'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField,{TextFieldProps} from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { AccountCircle } from '@mui/icons-material';
import { alpha, styled } from '@mui/material/styles';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';

function CustomizedInputBase() {
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
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 1,}}
        placeholder="Passenger Phone"
        inputProps={{ 'aria-label': 'search for a booking' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 1,}}
        placeholder="Passenger Seat"
        inputProps={{ 'aria-label': 'search for a booking' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton /*type="submit" */ sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
   
    </Paper>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
// function TextFiveldForSearch(props:TextFieldProps) {
//   return (
//     <TextField
//     {...props}
//     size='small'
//     sx={{ maxWidth: '250px',minWidth:'180px',borderRadius:"4px"}}
//     InputProps={{
//       startAdornment: (
//         <InputAdornment position="start">
//           <AccountCircle />
//         </InputAdornment>
//       ),
//     }}
    
//   />
//   )
// }
// const TextFieldForSearch = styled((props: TextFieldProps) => (
//   <TextField
//   size="small"
//     sx={{ maxWidth: '250px',minWidth:'180px',borderRadius:"4px"}}
//     InputProps={{ disableUnderline: true, 
//       // endAdornment: (
//       //   <InputAdornment position="start">
//       //     <AccountCircle />
//       //   </InputAdornment>
//       // ),
//     } as Partial<OutlinedInputProps>
          
//   }
//     {...props}
//   />
// ))(({ theme }) => ({
//   '& .MuiFilledInput-root': {
//     border: '1px solid #e2e2e1',
//     overflow: 'hidden',
//     borderRadius: '32px',
//     backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
//     transition: theme.transitions.create([
//       'border-color',
//       'background-color',
//       'box-shadow',
//     ]),
//     '&:hover': {
//       backgroundColor: 'transparent',
//     },
//     '&.Mui-focused': {
//       backgroundColor: 'transparent',
//       boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
//       borderColor: theme.palette.primary.main,
//     },
//   },
// }));
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index:number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MainCashierPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [dateValue, setDateValue] = React.useState<Date | null>(null);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs indicatorColor='secondary' value={value} onChange={handleChange} aria-label="cashier tabs">
          <Tab  label="Booking" {...a11yProps(0)} />
          <Tab label="Ticket History" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Booking/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{display:'flex'}}>
                <Box sx={{flexGrow:1}}>
                <BookingHistory/>
                </Box>
                <Box sx={{ml:2}}>
                <div
                style={{
                    width:'600px',
                    height:'200px',
                    backgroundColor:'white',
                    borderLeft:"8px solid green"
                }}
                >
           <Box sx={{display:'flex',gap:'15px',flexDirection:'column'}}>
         <Box sx={{display:'flex',gap:'15px',alignItems:'center'}}>
        <Box>
      <FormControl size='small' sx={{ maxWidth: '250px',minWidth:'180px',m:1}}>
        <InputLabel id="demo-simple-select-label">Schedule</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Schedule"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box>
        From A to B departing on 2022-05-11 at 8:30 pm from mexico
    </Box>
    </Box>    
    </Box>      

    {/* <Box sx={{display:'flex',gap:'7px',alignItems:'center',m:1}}>
      <Box>
      <TextFieldForSearch
        id="search-by-passenger-name"
        label="passenger name"
        />
      </Box>
      <Box>
        phone number
      </Box>
      <Box>
        seat number
      </Box>
      </Box>         */}
      <CustomizedInputBase/>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        
        label="Booking Date"
        value={dateValue}
        onChange={(newValue) => {
          setDateValue(newValue);
        }}
        renderInput={(params) => <TextField  sx={{ maxWidth: '250px',minWidth:'180px',m:1}} {...params} />}
      />
    </LocalizationProvider>
                </div>
                </Box>
        </Box>
        
      </TabPanel>
     
    </Box>
  );
}
