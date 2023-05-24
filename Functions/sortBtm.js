function sortBtm(input, initialBtm, val) {
  //  input == splice/append; initialBtm == state variable; val == value to be spliced/appended.

  var btmArray = Object.values(initialBtm); //  array of initialBtm's values
  var btmClone = {}; //  empty object to be filled
  var skipping = false; //  enables us to bypass value to be spliced

  if (input == "splice") {
    return new Promise((resolve, reject) => {
      try {
        for (var i = 0; i < btmArray.length; i++) {
          if (btmArray[i] == val) {
            //  If on this iteration the value of btmArray[i] == the value we're splicing ...
            skipping = true;
          }

          if (skipping == false) {
            //  If we haven't yet struck the value we're splicing, set value normally (i.e. btmClone["b1"] == btmArray[1]).
            btmClone["b" + i] = btmArray[i];
          } else if (skipping == true) {
            //  If this is the iteration on which we have struck the value, skip it (i.e. btmClone["b1"] == btmArray[2]).
            if (btmArray[i + 1] !== undefined) {
              btmClone["b" + i] = btmArray[i + 1];
            } else {
              //  If this element of btmArray == undefinedCell, all cells are accounted for. Set the element == null so that the cell remains usable (setting == undefinedCell would result in the cell becoming invisible).
              btmClone["b" + i] = null;
              break;
            }
          }
        }
        resolve(btmClone);
      } catch (err) {
        console.log(err);
      }
    });
  } else if (input == "append") {
    return new Promise((resolve, reject) => {
      try {
        //  Add the appended value to the beginning of btmArray.
        btmArray.unshift(val);
        //  Remove the final element to avoid a superfluous cell being equal to null and thereby rendering.
        btmArray.pop();

        for (var i = 0; i < btmArray.length; i++) {
          btmClone["b" + i] = btmArray[i];
        }

        resolve(btmClone);
      } catch (err) {
        console.log(err);
      }
    });
  }
}

export default sortBtm;
