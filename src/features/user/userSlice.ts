import {createSlice,PayloadAction} from '@reduxjs/toolkit'
export interface USER {
firstName:string
lastName:string
gender:string
phoneNumber:string
role:string
password:string
}
const initialState:USER[] = [

]
const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        addUser:(state,action:PayloadAction<USER>)=>{
            state.push(action.payload)
        }
    }
})
export const {addUser} = usersSlice.actions
export default usersSlice.reducer
