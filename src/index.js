module.exports = function longestConsecutiveLength(array) {
  let seenElems = {};
  let sequences = {};

  array.forEach((elem) => {
    if (seenElems[elem]) {
      return;
    }
    seenElems[elem] = true;

    let high = low = elem;
    if (sequences[elem + 1]) {
      high = sequences[elem + 1];
      delete sequences[elem + 1];
    }

    if (sequences[elem - 1]) {
      low = sequences[elem - 1];
      delete sequences[elem - 1];
    }

    sequences[high] = low;
    sequences[low] = high;
  });

  //count max sequence length
  let maxLength = 0;
  Object.keys(sequences).forEach((key) => {
    const currLow = key;
    const currHigh = sequences[key];
    const length = currHigh - currLow + 1;
    if (length > maxLength) {
      maxLength = length;
    }
    delete sequences[currHigh];
  });
  return maxLength;
}
