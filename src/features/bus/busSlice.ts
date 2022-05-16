import {createSlice, PayloadAction,createAsyncThunk} from '@reduxjs/toolkit'
import UserService from '../../services/user.service'
import AuthService from "../../services/auth.service";

export const addBusses = createAsyncThunk('busses/addNewBus',async (bus: any) => {
  return await  ( await AuthService.addBus(bus)).data
  }
)

interface BussesState {
    busses:any[]
    status:'idle' | 'loading' | 'succeeded' | 'failed'
    error:string|undefined
} 
const initialState = {
    busses:[],
    status:"idle",
    error:undefined
    
} as BussesState
export const fetchBusses = createAsyncThunk('busses/fetchBusses',async ()=>{
 return await (await UserService.getBusList()).data
})

const busSlice = createSlice({
    name:'busses',
    initialState,
    reducers:{

       }
    ,
    extraReducers(builder) {
        builder
          .addCase(fetchBusses.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(fetchBusses.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched busses to the array
            state.busses = state.busses.concat(action.payload)
          })
          .addCase(fetchBusses.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
          .addCase(addBusses.fulfilled,(state,action)=>{
            state.busses.push(action.payload)
          })
      }
})
export default busSlice.reducer
