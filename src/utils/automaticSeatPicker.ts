export function AutomaticSeatPicker(totalSeats:number[],occupiedSeats:number[]){
    let freeSeats:number[] = []
    let min = freeSeats[0]
    totalSeats.map((singleSeat:number)=>{
        if(!occupiedSeats.includes(singleSeat)){
            freeSeats.push(singleSeat)
        }
    }
    )
    
    return freeSeats
}

