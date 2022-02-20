import React from 'react';
import {UserRegistration} from './features/user/userform'
import {theme} from './theme/theme'
import {ThemeProvider} from '@mui/material/styles'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Home} from './Components/home'
import {RouteRegistration} from './features/route/routeform'
import {BusRegistration} from './features/bus/busform'
import {Schedule} from './features/schedule/scheduleform'
import {BusList} from './features/bus/buslist'
function App() {
  return (
   <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/users' element = {<UserRegistration/>}/>
        <Route path='/routes' element = {<RouteRegistration/>}/>
        <Route path='/busses' element = {<BusRegistration/>}/>
        <Route path='/schedules' element = {<Schedule/>}/>
        <Route path='/buslist' element = {<BusList/>}/>
      </Routes>
      </BrowserRouter>
   
   </ThemeProvider>
  );
}

export default App;
