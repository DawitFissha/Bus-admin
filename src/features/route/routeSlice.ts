import {createSlice,PayloadAction,createAsyncThunk} from '@reduxjs/toolkit'
import AuthService from "../../services/auth.service";
export const addRoutes = createAsyncThunk('routes/addNewRoute',async (route: any) => {
    return await  ( await AuthService.addRoute(route)).data
    
  }
)
export interface ROUTE {
id:string
source:string
destination:string
price:number
departurePlace?:string[]
distance?:number|null
estimatedHour?:number|null
assignedBus:string[]
}
type initialStateType = {
    routes:any[],
    status:'idle' | 'loading' | 'succeeded' | 'failed'
    error:string|undefined
}
const initialState:initialStateType = {
    routes:[],
    status:'idle',
    error:""
    } as initialStateType

const routesSlice = createSlice({
    name:'routes',
    initialState,
    reducers:{

    },
    extraReducers(builder) {
        builder
        .addCase(addRoutes.fulfilled,(state,action)=>{
            state.routes.push(action.payload)
        })
    }
})

export default routesSlice.reducer
