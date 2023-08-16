import React from 'react';

export default function StorageCalculator(list) {
  let result = 0;

  list.forEach((item) => {
    result += item[1]; 
  });

  console.log(result);

  return result / (1024 * 1024);
}
