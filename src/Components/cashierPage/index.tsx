import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Booking} from '../../features/bookings'
import BookingHistory from '../mySale/sales'
import FilterPanel from '../mySale/bookingFilterPanel'

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

function a11yProps(index:number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MainCashierPage() {
  const [value, setValue] = React.useState(0);
  const [scheduleValue,setScheduleValue] = React.useState('')
  const getSchedule = (sch:string)=>{
    setScheduleValue(sch)
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  console.log(scheduleValue)
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs indicatorColor='secondary' value={value} onChange={handleChange} aria-label="cashier tabs">
          <Tab  label="Booking" {...a11yProps(0)} />
          <Tab label="Ticket History" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Booking passSchedule={getSchedule}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{display:'flex'}}>
                <Box sx={{flexGrow:1}}>
                <BookingHistory providedSchedule={scheduleValue}/>
                </Box>
        <FilterPanel passSchedule ={getSchedule} activeSchedule={scheduleValue}/>
        </Box>
        
      </TabPanel>
     
    </Box>
  );
}
