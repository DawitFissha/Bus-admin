export function AutomaticSeatPicker(totalSeats:number[],occupiedSeats:number[]){
    let freeSeats:number[] = []
    let pickedSeat:number
    totalSeats.map((singleSeat:number)=>{
        if(!occupiedSeats.includes(singleSeat)){
            freeSeats.push(singleSeat)
        }
    }
    )
    
    pickedSeat = Math.min(...freeSeats)
    return pickedSeat
}

