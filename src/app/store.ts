import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/user/userSlice'
import driverReducer from '../features/user/driverSlice'
import redatReducer from '../features/user/redatSlice'
import routesReducer from '../features/route/routeSlice'
import cityReducer from '../features/city/citySlice'
import busReducer from '../features/bus/busSlice'
import scheduleReducer from '../features/schedule/scheduleSlice'
import busStateReducer from '../features/bus-states/busstateSlice'
import ticketReducer from '../features/bookings/ticketslice'

export const store = configureStore({
  reducer: {
    users:usersReducer,
    drivers:driverReducer,
    redats:redatReducer,
    routes:routesReducer,
    cities:cityReducer,
    busses:busReducer,
    schedules:scheduleReducer,
    busStates:busStateReducer, 
    tickets:ticketReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
