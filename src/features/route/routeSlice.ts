import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import UserService from '../../services/user.service'
import AuthService from "../../services/auth.service";
export const fetchRoutes = createAsyncThunk('routes/fetchRoutes',async ()=>{
    return await (await UserService.getRoutes()).data
    })

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
        .addCase(fetchRoutes.pending, (state) => {
            state.status = 'loading'
          })
          .addCase(fetchRoutes.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.routes = state.routes.concat(action.payload)
          })
          .addCase(fetchRoutes.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
    }
})

export default routesSlice.reducer
