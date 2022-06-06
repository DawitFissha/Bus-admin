import * as React from 'react';
import {UserRegistration} from './features/user/userform'
import {theme} from './theme/theme'
import {ThemeProvider} from '@mui/material/styles'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Home} from './Components/home'
import {RouteRegistration} from './features/route/routeform'
import {BusRegistration} from './features/bus/busform'
import {Schedule} from './features/schedule/scheduleform'
import {BusList} from './features/bus/buslist'
import {Booking} from './features/bookings/booking-form'
import {Login} from './Components/login'
import {OrganizationCode} from './Components/orgUnit'
import {PublicPage} from './Components/publicPage'
import {RequireAuth} from './Components/requireAuth'
import {fetchBusses} from './features/bus/busSlice'
import {useAppSelector} from './app/hooks'
import {useAppDispatch} from './app/hooks'

export let allBusses:any
export let ActiveBusses:any[]
function App() {
  const dispatch = useAppDispatch()
   const busStatus = useAppSelector(state=>state.busses.status)
   allBusses = useAppSelector(state=>state.busses.busses)
   ActiveBusses = allBusses.filter((bus:any)=>bus.busState==="Active") .map((ab:any)=>(
    {
      _id:ab._id,
      busPlateNo:ab.busPlateNo
    }
  )) 
 React.useEffect(()=>{
   if(busStatus === 'idle'){
     dispatch(fetchBusses())
   }
 },[busStatus,dispatch])
  return (
   <ThemeProvider theme={theme}>
     
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<PublicPage/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/orgCode' element = {<OrganizationCode/>}/>
        <Route
            path="/booking"
            element={
              <RequireAuth>
                <Booking/>
              </RequireAuth>
            }
          />
        <Route
            path="/buslist"
            element={
              <RequireAuth>
                <BusList/>
              </RequireAuth>
            }
          />

        <Route
            path="/schedules"
            element={
              <RequireAuth>
                <Schedule/>
              </RequireAuth>
            }
          />

        <Route
            path="/busses"
            element={
              <RequireAuth>
                <BusRegistration/>
              </RequireAuth>
            }
          />

        <Route
            path="/routes"
            element={
              <RequireAuth>
                <RouteRegistration/>
              </RequireAuth>
            }
          />

        <Route
            path="/users"
            element={
              <RequireAuth>
                <UserRegistration/>
              </RequireAuth>
            }
          />

        <Route
            path="/home"
            element={
              <RequireAuth>
                <Home/>
              </RequireAuth>
            }
          />
      </Routes>
      </BrowserRouter>
   
   </ThemeProvider>
  );
}

export default App;
