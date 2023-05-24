function scanFixed(gameVals, solutions, hardFixed, userFixed) {
  const allCells = [
    [
      "c1_2",
      "c1_4",
      "c1_5",
      "c2_1",
      "c2_4",
      "c2_5",
      "c4_1",
      "c4_2",
      "c4_5",
      "c5_1",
      "c5_2",
      "c5_4",
    ],
    ["c1_3", "c2_3", "c3_1", "c3_2", "c3_4", "c3_5", "c4_3", "c5_3"],
  ];

  for (var its = 0; its < 5; its++) {
    for (var ii = 0; ii < allCells[0].length; ii++) {
      for (var jj = ii + 1; jj < allCells[0].length; jj++) {
        var rand = Math.floor(Math.random() * 2);
        if (rand == 0) {
          var holder = allCells[0][ii];
          allCells[0][ii] = allCells[0][jj];
          allCells[0][jj] = holder;
        }
      }
    }
  }

  return new Promise((resolve, reject) => {
    try {
      for (var i in allCells) {
        //  i == 0 or 1.
        for (var j in allCells[i]) {
          //  Iterate through elements of nested arrays.
          //  completedLoop == true if gameVals[thisCell] == solutions[thisCell] && thisCell is not present in the hardFixed array.
          let completedLoop = false;
          var thisCell = allCells[i][j];
          if (gameVals[thisCell] === solutions[thisCell]) {
            for (var k = 0; k <= hardFixed.length; k++) {
              if (k == hardFixed.length) {
                //  If we've iterated through every element of hardFixed and no matches have been made, set completedLoop == true.
                completedLoop = true;
                break;
              }

              if (thisCell === hardFixed[k]) {
                //  If thisCell exists in hardFixed at index k, break the loop.
                break;
              }
            }

            if (completedLoop === true) {
              //  If no matches have been found, repeat the process for userFixed array.
              if (userFixed.length === 0) {
                resolve([thisCell, solutions[thisCell]]);
                return;
              } else {
                for (var l = 0; l <= userFixed.length; l++) {
                  if (l == userFixed.length) {
                    //  If we've iterated through every element of userFixed and no matches have been made, send back the cell's id and its value.
                    resolve([thisCell, solutions[thisCell]]);
                  }

                  if (thisCell === userFixed[l]) {
                    break;
                  }
                }
              }
            }
          }
        }
      }
      resolve(null);
    } catch (err) {
      console.log(err);
    }
  });
}

export default scanFixed;
