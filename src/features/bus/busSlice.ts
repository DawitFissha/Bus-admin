import {createSlice, PayloadAction,createAsyncThunk} from '@reduxjs/toolkit'

export interface BUS {
    id:string
    description:string
    plateNo:string
    driverId:string|undefined
    redatId:string|undefined
    NoOfSeat:number,
    state:string
}

interface initialStateType {
    busses:BUS[]
    status:'idle' | 'loading' | 'succeeded' | 'failed'
    error:string|undefined
} 
export const fetchBusses = createAsyncThunk('busses/fetchBusses',async ()=>{
const response = await fetch('http://localhost:8080/busses')
return await response.json()
})


const initialState = {
    busses:
    [
        // {
        //     id:'dummy0Bus',
        //     description:'Dummy Bus',
        //     plateNo:'dummy6u5AA',
        //     driverId:'dummy0Driver',
        //     redatId:'dummy0Redat',
        //     NoOfSeat:50, 
        //     state:'0',
        //     },
        // {
        // id:'0',
        // description:'Bus 1',
        // plateNo:'123AA',
        // driverId:'0',
        // redatId:'2',
        // NoOfSeat:49, 
        // state:'0',
        // },
        // {
        //     id:'1',
        //     description:'Bus 2',
        //     plateNo:'123DD',
        //     driverId:'1',
        //     redatId:'3',
        //     NoOfSeat:49,
        //     state:'0',
        //     },
    ],
    status:'idle',
    error:undefined
} as initialStateType

const busSlice = createSlice({
    name:'busses',
    initialState,
    reducers:{
        addBus:(state,action:PayloadAction<BUS>)=>{
            state.busses.push(action.payload)
        },
        deleteBus:(state,action:PayloadAction<string>)=>{
            state.busses = state.busses.filter(({id})=>id!==action.payload)
        },

        updateBus:(state,action:PayloadAction<BUS>)=>{
            const busTobeEdited = action.payload
            const oldBus = state.busses.find((bus)=>bus.id===busTobeEdited.id)
            if(oldBus){
                oldBus.description = busTobeEdited.description  
                oldBus.plateNo = busTobeEdited.plateNo
                oldBus.driverId = busTobeEdited.driverId
                oldBus.redatId = busTobeEdited.redatId
                oldBus.NoOfSeat = busTobeEdited.NoOfSeat
                oldBus.state = busTobeEdited.state
                
            }
        }

    },
    extraReducers(builder) {
        builder
          .addCase(fetchBusses.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchBusses.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched busses to the array
            state.busses=[...state.busses,action.payload]
          })
          .addCase(fetchBusses.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      }
})
export default busSlice.reducer
export const {addBus,deleteBus,updateBus} = busSlice.actions