import {createSlice,PayloadAction} from '@reduxjs/toolkit'
export interface ROUTE {
id:string
source:string
destination:string
price:number
departurePlace?:string[]
distance?:number|null
estimatedHour?:number|null
}
const initialState:ROUTE[] = [

]
const routesSlice = createSlice({
    name:'routes',
    initialState,
    reducers:{
        addRoute:(state,action:PayloadAction<ROUTE>)=>{
            state.push(action.payload)
        }
    }
})
export const {addRoute} = routesSlice.actions
export default routesSlice.reducer
