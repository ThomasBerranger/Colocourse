function sortByQuantity(array, reverse) {
  
  return array.sort((a, b) => {
    let fa = a.currentQuantity / a.maxQuantity,
    fb = b.currentQuantity / b.maxQuantity;
    
    if (!reverse ? fa < fb : fa > fb) {
      return -1;
    } else if (!reverse ? fa > fb : fa < fb) {
      return 1;
    } else {
      return 0;
    }
  });
  
}

function sortByName(array, reverse) {
  
  return array.sort((a, b) => {
    let fa = a.name.toLowerCase(),
    fb = b.name.toLowerCase();
    
    if (!reverse ? fa < fb : fa > fb) {
      return -1;
    } else if (!reverse ? fa > fb : fa < fb) {
      return 1;
    } else {
      return 0;
    }
  });
  
}

export { sortByQuantity, sortByName };