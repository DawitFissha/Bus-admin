export function getSeatList(NoofSeat:number){
 let seatList = []
 let i:number;
 for(i=1;i<=NoofSeat;i++){
     seatList.push(i)
 }
 return seatList
}