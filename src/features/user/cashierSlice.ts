import UserService from '../../services/user.service'
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const fetchCashiers = createAsyncThunk('cashiers/fetchCashiers',async ()=>{

return await (await UserService.getCashiers()).data

})


type initialStateType = {
    cashiers:any[],
    status:'idle' | 'loading' | 'succeeded' | 'failed'
    error:string|undefined
}

const initialState:initialStateType = {
        cashiers:[],
        status:'idle',
        error:""
        } as initialStateType

const cashiersSlice = createSlice({
    name:'cashiers',
    initialState,
    reducers:{
       resetCashiers:(state) => {
         state.cashiers = initialState.cashiers
       }
        },
    extraReducers(builder) {
        builder
          .addCase(fetchCashiers.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(fetchCashiers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            
            state.cashiers = state.cashiers.concat(action.payload)
          })
          .addCase(fetchCashiers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      }
})

export default cashiersSlice.reducer
export const {resetCashiers} = cashiersSlice.actions