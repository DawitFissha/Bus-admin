import UserService from '../../services/user.service'
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const fetchRedats = createAsyncThunk('redats/fetchRedats',async ()=>{
return await (await UserService.getRedats()).data
})


type initialStateType = {
    redats:any[],
    status:'idle' | 'loading' | 'succeeded' | 'failed'
    error:string|undefined
}

const initialState:initialStateType = {
        redats:[],
        status:'idle',
        error:""
        } as initialStateType

const redatSlice = createSlice({
    name:'redats',
    initialState,
    reducers:{
       resetRedat:(state) => {
         state.redats = initialState.redats
       }
    },
    extraReducers(builder) {
        builder
          .addCase(fetchRedats.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(fetchRedats.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.redats = state.redats.concat(action.payload)
          })
          .addCase(fetchRedats.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      }
})

export default redatSlice.reducer
export const {resetRedat} = redatSlice.actions