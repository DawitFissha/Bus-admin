import UserService from '../../services/user.service'
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const fetchDrivers = createAsyncThunk('drivers/fetchDrivers',async ()=>{

return await (await UserService.getDrivers()).data

})


type initialStateType = {
    drivers:any[],
    status:'idle' | 'loading' | 'succeeded' | 'failed'
    error:string|undefined
}

const initialState:initialStateType = {
        drivers:[],
        status:'idle',
        error:""
        } as initialStateType

const driverSlice = createSlice({
    name:'drivers',
    initialState,
    reducers:{
       resetDriver:(state) => {
         state.drivers = initialState.drivers
       }
        },
    extraReducers(builder) {
        builder
          .addCase(fetchDrivers.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(fetchDrivers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            
            state.drivers = state.drivers.concat(action.payload)
          })
          .addCase(fetchDrivers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      }
})

export default driverSlice.reducer
export const {resetDriver} = driverSlice.actions