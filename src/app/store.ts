import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/user/userSlice'
import rolesReducer from '../features/role/roleSlice'
import routesReducer from '../features/route/routeSlice'
import cityReducer from '../features/city/citySlice'
import busReducer from '../features/bus/busSlice'
import scheduleReducer from '../features/schedule/scheduleSlice'
export const store = configureStore({
  reducer: {
    users:usersReducer,
    roles:rolesReducer,
    routes:routesReducer,
    cities:cityReducer,
    busses:busReducer,
    schedules:scheduleReducer,
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
