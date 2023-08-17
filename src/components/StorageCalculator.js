import React from 'react';

export default function StorageCalculator(list) {
  let result = 0;

  list.forEach((item) => {
    result += item.size; 
  });

  return result / (1024 * 1024);
}
