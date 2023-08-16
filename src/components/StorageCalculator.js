import React from 'react'

export default function StorageCalculator(list) {
   let result = 0;
    list.map((item)=>{
       result =  item[1] += result
    })
    console.log(result);
    
  return (
    result
  )
}
