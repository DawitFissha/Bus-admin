
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
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

function a11yProps(index: number) {
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
                <Box>
                <div
                style={{
                    width:'600px',
                    height:'200px',
                    backgroundColor:'white',
                }}
                >
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
                </div>
                </Box>
        </Box>
        
      </TabPanel>
     
    </Box>
  );
}
