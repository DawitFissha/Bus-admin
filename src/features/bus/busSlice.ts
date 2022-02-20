import {createSlice, PayloadAction} from '@reduxjs/toolkit'
export interface BUS {
    id:string
    description:string
    plateNo:string
    driverId:string|undefined
    redatId:string|undefined
    NoOfSeat:number,
    state:string
}
const initialState:BUS[] = [
    {
    id:'0',
    description:'Bus 1',
    plateNo:'123AA',
    driverId:'0',
    redatId:'2',
    NoOfSeat:49, 
    state:'0',
    },
    {
        id:'1',
        description:'Bus 2',
        plateNo:'123DD',
        driverId:'1',
        redatId:'3',
        NoOfSeat:49,
        state:'0',
        },
]
const busSlice = createSlice({
    name:'busses',
    initialState,
    reducers:{
        addBus:(state,action:PayloadAction<BUS>)=>{
            state.push(action.payload)
        },
        deleteBus:(state,action:PayloadAction<string>)=>{
            state.filter(bus=>bus.id!==action.payload)
        },
        updateBus:(state,action:PayloadAction<BUS>)=>{
            const busTobeEdited = action.payload
            const oldBus = state.find((bus)=>bus.id===busTobeEdited.id)
            if(oldBus){
                oldBus.description = busTobeEdited.description  
                oldBus.plateNo = busTobeEdited.plateNo
                oldBus.driverId = busTobeEdited.driverId
                oldBus.redatId = busTobeEdited.redatId
                oldBus.NoOfSeat = busTobeEdited.NoOfSeat
                oldBus.state = busTobeEdited.state
                
            }
        }

    }
})
export default busSlice.reducer
export const {addBus,deleteBus,updateBus} = busSlice.actions