function Remove<T>(inputArray:T[],index:number):T[]{
    let newArray:T[] = []
    inputArray.map((arr)=>{
      if(inputArray[index]!==arr){
        newArray.push(arr)
      }
    })
    return newArray
  }
  export default Remove