import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/user/userSlice'
import rolesReducer from '../features/role/roleSlice'
import routesReducer from '../features/route/routeSlice'
import cityReducer from '../features/city/citySlice'
export const store = configureStore({
  reducer: {
    users:usersReducer,
    roles:rolesReducer,
    routes:routesReducer,
    cities:cityReducer,
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
