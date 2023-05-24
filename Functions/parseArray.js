function parseArray(arr) {
  return new Promise((resolve, reject) => {
    try {
      var i = -1; //  tracks the number of iterations of the loop
      var j = -1; //  resets every 7 iterations
      var k = 0; //  increments every 7 iterations
      var lettersToPush = [[]]; //  fills with 7 elements, then is pushed and reset
      var uidsToPush = [[]]; // fills with 7 elements, then is pushed and reset
      while (i < arr.length) {
        i++;
        j++;
        //  e.g. arr[i] == 'A', i == 0 (pushing l-0).
        lettersToPush[k].push(arr[i]);
        uidsToPush[k].push("l-" + i);
        if (j == 6) {
          //  Once we've pushed seven elements, reset index variable j and increment sub-array index k.
          k++;
          j = -1;
          lettersToPush[k] = [];
          uidsToPush[k] = [];
        }
      }
      resolve([lettersToPush, uidsToPush]);
    } catch (err) {
      console.log(err);
    }
  });
}

export default parseArray;
