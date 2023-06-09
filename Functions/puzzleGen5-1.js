var cornerCells = {};

var gridValues = {
  a: {
    south: [0, 0, 0, 0],
    east: [0, 0, 0, 0],
  },
  b: {
    south: [0, 0, 0],
    east: [0, 0, 0],
  },
  c: {
    north: [0, 0],
    east: [0, 0],
    south: [0, 0],
    west: [0, 0],
  },
  d: {
    north: [0, 0, 0],
    west: [0, 0, 0],
  },
  e: {
    north: [0, 0, 0, 0],
    west: [0, 0, 0, 0],
  },
};

var returnObject = {};
var returnSums = {};
var solutions = {};

var spliceObject = {
  easy: [],
  not_so_easy: [],
  slightly_stressful: [],
  kinda_hard: [],
  pretty_damn_tricky: [],
};

var sums = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
};

var longArray = [];

var fixed = {};

var error = 0;

export default function puzzleGen5(diff) {
  try {
    longArray = [];
    error = 0;
    fixed = {
      c1_2: null,
      c1_3: null,
      c1_4: null,
      c1_5: null,
      c2_1: null,
      c2_3: null,
      c2_4: null,
      c2_5: null,
      c3_1: null,
      c3_2: null,
      c3_4: null,
      c3_5: null,
      c4_1: null,
      c4_2: null,
      c4_3: null,
      c4_5: null,
      c5_1: null,
      c5_2: null,
      c5_3: null,
      c5_4: null,
    };

    generateYellowSpread();
    generateOrange();
    generateGreen();
    generateRed();
    generateBlue();

    var rand = Math.floor(Math.random() * 2);
    if (rand === 0) {
      returnObject = {
        red: {
          south: [
            gridValues.a.south[0],
            gridValues.a.south[1],
            gridValues.a.south[2],
            gridValues.a.south[3],
          ],
          east: [
            gridValues.a.east[0],
            gridValues.a.east[1],
            gridValues.a.east[2],
            gridValues.a.east[3],
          ],
        },
        orange: {
          south: [
            gridValues.b.south[0],
            gridValues.b.south[1],
            gridValues.b.south[2],
          ],
          east: [
            gridValues.b.east[0],
            gridValues.b.east[1],
            gridValues.b.east[2],
          ],
        },
        yellow: {
          north: [gridValues.c.north[0], gridValues.c.north[1]],
          east: [gridValues.c.east[0], gridValues.c.east[1]],
          south: [gridValues.c.south[0], gridValues.c.south[1]],
          west: [gridValues.c.west[0], gridValues.c.west[1]],
        },
        green: {
          north: [
            gridValues.d.north[0],
            gridValues.d.north[1],
            gridValues.d.north[2],
          ],
          west: [
            gridValues.d.west[0],
            gridValues.d.west[1],
            gridValues.d.west[2],
          ],
        },
        blue: {
          north: [
            gridValues.e.north[0],
            gridValues.e.north[1],
            gridValues.e.north[2],
            gridValues.e.north[3],
          ],
          west: [
            gridValues.e.west[0],
            gridValues.e.west[1],
            gridValues.e.west[2],
            gridValues.e.west[3],
          ],
        },
      };

      returnSums = {
        red: sums.a,
        orange: sums.b,
        yellow: sums.c,
        green: sums.d,
        blue: sums.e,
      };

      cornerCells = {
        c2_1: gridValues.a.south[0],
        c4_5: gridValues.e.north[0],
        c1_2: gridValues.a.east[0],
        c5_4: gridValues.e.west[0],
        c5_1: gridValues.a.south[3],
        c1_5: gridValues.a.east[3],
      };
    } else {
      returnObject = {
        red: {
          south: [
            gridValues.e.north[0],
            gridValues.e.north[1],
            gridValues.e.north[2],
            gridValues.e.north[3],
          ],
          east: [
            gridValues.e.west[0],
            gridValues.e.west[1],
            gridValues.e.west[2],
            gridValues.e.west[3],
          ],
        },
        orange: {
          south: [
            gridValues.d.north[0],
            gridValues.d.north[1],
            gridValues.d.north[2],
          ],
          east: [
            gridValues.d.west[0],
            gridValues.d.west[1],
            gridValues.d.west[2],
          ],
        },
        yellow: {
          north: [gridValues.c.south[0], gridValues.c.south[1]],
          east: [gridValues.c.west[0], gridValues.c.west[1]],
          south: [gridValues.c.north[0], gridValues.c.north[1]],
          west: [gridValues.c.east[0], gridValues.c.east[1]],
        },
        green: {
          north: [
            gridValues.b.south[0],
            gridValues.b.south[1],
            gridValues.b.south[2],
          ],
          west: [
            gridValues.b.east[0],
            gridValues.b.east[1],
            gridValues.b.east[2],
          ],
        },
        blue: {
          north: [
            gridValues.a.south[0],
            gridValues.a.south[1],
            gridValues.a.south[2],
            gridValues.a.south[3],
          ],
          west: [
            gridValues.a.east[0],
            gridValues.a.east[1],
            gridValues.a.east[2],
            gridValues.a.east[3],
          ],
        },
      };

      returnSums = {
        red: sums.e,
        orange: sums.d,
        yellow: sums.c,
        green: sums.b,
        blue: sums.a,
      };

      cornerCells = {
        c2_1: gridValues.e.north[0],
        c4_5: gridValues.a.south[0],
        c1_2: gridValues.e.west[0],
        c5_4: gridValues.a.east[0],
        c5_1: gridValues.e.north[3],
        c1_5: gridValues.e.west[3],
      };
    }

    shuffleArray(diff);

    solutions = {
      c0_3: returnSums.yellow,
      c0_4: returnSums.green,
      c0_5: returnSums.blue,
      c1_1: returnSums.red,
      c1_2: returnObject.red.east[0],
      c1_3: returnObject.red.east[1],
      c1_4: returnObject.red.east[2],
      c1_5: returnObject.red.east[3],
      c1_6: returnSums.red,
      c2_1: returnObject.red.south[0],
      c2_2: returnSums.orange,
      c2_3: returnObject.orange.east[0],
      c2_4: returnObject.orange.east[1],
      c2_5: returnObject.orange.east[2],
      c2_6: returnSums.orange,
      c3_0: returnSums.yellow,
      c3_1: returnObject.yellow.west[1],
      c3_2: returnObject.yellow.west[0],
      c3_3: returnSums.yellow,
      c3_4: returnObject.yellow.east[0],
      c3_5: returnObject.yellow.east[1],
      c3_6: returnSums.yellow,
      c4_0: returnSums.green,
      c4_1: returnObject.green.west[2],
      c4_2: returnObject.green.west[1],
      c4_3: returnObject.green.west[0],
      c4_4: returnSums.green,
      c4_5: returnObject.blue.north[0],
      c5_0: returnSums.blue,
      c5_1: returnObject.blue.west[3],
      c5_2: returnObject.blue.west[2],
      c5_3: returnObject.blue.west[1],
      c5_4: returnObject.blue.west[0],
      c5_5: returnSums.blue,
      c6_1: returnSums.red,
      c6_2: returnSums.orange,
      c6_3: returnSums.yellow,
    };

    var hints;
    if (diff !== "easy") {
      hints = prepBoard(diff);
    } else {
      hints = {
        c2_3: [null, null],
        c3_4: [null, null],
        c4_3: [null, null],
        c3_2: [null, null],
        c1_3: [null, null],
        c3_5: [null, null],
        c5_3: [null, null],
        c3_1: [null, null],
      };
    }

    var fixedIds = spliceObject;

    return [returnObject, longArray, returnSums, fixed, error, hints, fixedIds];
  } catch (err) {}
}

function generateYellowSpread() {
  var initialSUM = 9;
  //    Set the first segment.
  var initialNum1 = Math.ceil(Math.random() * (initialSUM - 1));
  gridValues.c.north[0] = initialNum1;
  longArray.push(initialNum1);
  var initialNum2 = initialSUM - initialNum1;
  gridValues.c.north[1] = initialNum2;
  longArray.push(initialNum2);

  //  Generate the three remaining segments, ensuring that they all sum to initialSUM.
  var indexes = ["east", "south", "west"];

  for (var i = 0; i < 3; i++) {
    var proceed = false;
    while (proceed === false) {
      var innerCell = Math.ceil(Math.random() * (initialSUM - 1));
      if (longArray.indexOf(innerCell) === -1) {
        gridValues.c[indexes[i]][0] = innerCell;
        longArray.push(innerCell);
        gridValues.c[indexes[i]][1] = initialSUM - innerCell;
        longArray.push(initialSUM - innerCell);
        proceed = true;
      }
    }
  }

  checkSum(4, "c");
}

function generateOrange() {
  //  Sync segment with existing grid values.
  gridValues.b.south[0] = gridValues.c.west[0];
  gridValues.b.east[0] = gridValues.c.north[0];
  var sumEast = gridValues.b.east[0];
  var sumSouth = gridValues.b.south[0];

  var randMulti = 9;
  var num1 = Math.ceil(Math.random() * randMulti);

  sumEast += num1;
  gridValues.b.east[1] = num1;
  longArray.push(num1);

  //    Store segmentDiff for the purpose of determining whether it's necessary to limit the maximum value of num2, so as to avoid anomalous numbers.
  var segmentDiff = sumEast - sumSouth;

  var num2;
  if (segmentDiff > 9) {
    //  (segmentDiff + num2) is the number that we'll eventually have to distribute.
    //  We ideally don't want to be distributing more than 18. The number to be distributed is ((sumEast + num2) - sumSouth).
    //  Given that that maximum possible value of segmentDiff is (8 + 9)(17) - 2 == 15, we set the cap by subtracting segmentDiff from 16, which effectively sets a floor of 1.
    //  If segmentDiff is at maximum (15), the maximum value of num2 is (16 - 15)(1).
    //  If segmentDiff is at minimum under these conditions (10), the maximum value of num2 is (16 - 10)(6).

    num2 = Math.ceil(Math.random() * (16 - segmentDiff));
  } else {
    //  Otherwise, generate normally.
    num2 = Math.ceil(Math.random() * randMulti);

    if (sumEast + num2 < sumSouth + 2) {
      //  If all three numbers in the row sum to less than the minimum possible sum of the column (the existing value + 2), set num2 = 9.
      //  This will always work under the current rules, because the column cannot exceed 10.
      //  Extreme case A: (2 + 1 + 9)(12) will always be greater than (8 + 2)(10).
      //  Extreme case B: (1 + 1 + 9)(11) will always be greater than (7 + 2)(9).

      num2 = 9;
    }
  }
  gridValues.b.east[2] = num2;
  longArray.push(num2);
  sumEast += num2;

  //    We now need to distribute the difference between sumEast and sumSouth, less the initial distributions to each cell.
  var toDistribute = sumEast - sumSouth;

  var distributeA = 1;
  var distributeB = 1;
  toDistribute -= 2;
  if (toDistribute > 0) {
    //  If there is still something to distribute ...
    while (toDistribute > 0) {
      toDistribute--;
      //  Generate a number between 1 and 4.
      var rand = Math.round(Math.random());
      if (rand === 0) {
        distributeA++;
      } else {
        distributeB++;
      }
    }
  }

  gridValues.b.south[1] = distributeA;
  longArray.push(distributeA);
  gridValues.b.south[2] = distributeB;
  longArray.push(distributeB);

  checkSum(2, "b");
}

function generateGreen() {
  //  Sync segment with existing grid values.
  gridValues.d.north[0] = gridValues.c.east[0];
  gridValues.d.north[1] = gridValues.b.east[1];
  gridValues.d.west[0] = gridValues.c.south[0];
  gridValues.d.west[1] = gridValues.b.south[1];

  var sumNorth = gridValues.d.north[0] + gridValues.d.north[1];

  var sumWest = gridValues.d.west[0] + gridValues.d.west[1];

  var segmentDiff = sumNorth - sumWest;

  var randMulti = 9;
  var num = Math.ceil(Math.random() * randMulti);

  if (segmentDiff + num > 12) {
    //  If the sum of the column exceeds the sum of the row by more than 12, manually set num = 1. This limits the value of the outer row cell to the lowest value possible.
    //  Example: (6 + 7 + 9)(22) - (2 + 4)(6) == 16.
    //  22 > 12, so num set = 1.
    //  Problem becomes (6 + 7 + 1)(14) - (2 + 4)(6) == 8.
    num = 1;
  } else if (segmentDiff + num < 1) {
    //  If the sum of the column is <= the sum of the row with the outer row cell still unpopulated, boost num by the difference plus 1.
    //  The +1 ensures that the value of the outer row cell is positive.
    //  Subtracting (segmentDiff + num) from sumWest will always yield a positive number under these conditions.
    //  Example: (2 + 4 + 1)(7) - (6 + 7)(13) == -6.
    //  -6 < 1, so num increased by (6 + 1).
    //  New num = 8 => (2 + 4 + 8)(14) - (6 + 7)(13) == 1.
    var gap = sumWest - (sumNorth + num);

    num += gap + 1;
  } else {
    //  If (segmentDiff + num) is neither > 12 nor < 1, it is viable.
  }

  gridValues.d.north[2] = num;
  longArray.push(num);
  sumNorth += num;

  gridValues.d.west[2] = sumNorth - sumWest;
  longArray.push(sumNorth - sumWest);

  checkSum(2, "d");
}

function generateRed() {
  //  Sync segment with existing grid values.
  gridValues.a.east[1] = gridValues.c.north[1];
  gridValues.a.east[2] = gridValues.d.north[2];
  gridValues.a.south[1] = gridValues.c.west[1];
  gridValues.a.south[2] = gridValues.d.west[2];

  var sumEast = gridValues.a.east[1] + gridValues.a.east[2];

  var sumSouth = gridValues.a.south[1] + gridValues.a.south[2];

  var segmentDiff = sumEast - sumSouth;

  var randMulti = 10;
  var num1 = Math.ceil(Math.random() * randMulti);

  var num2 = Math.ceil(Math.random() * randMulti);

  if (segmentDiff + num1 + num2 > 20) {
    var proceed = false;
    var index = 0;
    while (proceed === false) {
      index++;
      if (index % 2 !== 0) {
        num1--;
      } else {
        num2--;
      }
      if (segmentDiff + num1 + num2 <= 20) {
        proceed = true;
      }
    }
  } else if (segmentDiff + num1 + num2 < 2) {
    var proceed = false;
    var index = 0;
    while (proceed === false) {
      index++;
      if (index % 2 !== 0) {
        num1++;
      } else {
        num2++;
      }
      if (segmentDiff + num1 + num2 >= 2) {
        proceed = true;
      }
    }
  }

  gridValues.a.east[0] = num1;
  longArray.push(num1);
  gridValues.a.east[3] = num2;
  longArray.push(num2);
  sumEast += num1 + num2;

  var toDistribute = sumEast - sumSouth;

  var distributeA = 1;
  var distributeB = 1;
  toDistribute -= 2;
  if (toDistribute > 0) {
    //  If there is still something to distribute ...
    while (toDistribute > 0) {
      toDistribute--;
      var rand = Math.round(Math.random());
      if (rand === 0) {
        distributeA++;
      } else {
        distributeB++;
      }
    }
  }

  gridValues.a.south[0] = distributeA;
  longArray.push(distributeA);
  gridValues.a.south[3] = distributeB;
  longArray.push(distributeB);

  checkSum(2, "a");
}

function generateBlue() {
  //  Sync segment with existing grid values.
  gridValues.e.north[1] = gridValues.c.east[1];
  gridValues.e.north[2] = gridValues.b.east[2];
  gridValues.e.north[3] = gridValues.a.east[3];
  gridValues.e.west[1] = gridValues.c.south[1];
  gridValues.e.west[2] = gridValues.b.south[2];
  gridValues.e.west[3] = gridValues.a.south[3];

  var sumNorth =
    gridValues.e.north[1] + gridValues.e.north[2] + gridValues.e.north[3];

  var sumWest =
    gridValues.e.west[1] + gridValues.e.west[2] + gridValues.e.west[3];

  var segmentDiff = sumNorth - sumWest;

  var randMulti = 10;
  var num = Math.ceil(Math.random() * randMulti);

  if (segmentDiff + num > 12) {
    num = 1;
  } else if (segmentDiff + num < 1) {
    var gap = sumWest - (sumNorth + num);

    num += gap + 1;
  }

  gridValues.e.north[0] = num;
  longArray.push(num);
  sumNorth += num;

  gridValues.e.west[0] = sumNorth - sumWest;
  longArray.push(sumNorth - sumWest);

  checkSum(2, "e");
}

function checkSum(limit, segment) {
  var metaSum = 0;
  var targetSum;
  for (var key in gridValues[segment]) {
    targetSum = 0;
    for (var i in gridValues[segment][key]) {
      targetSum += gridValues[segment][key][i];
      metaSum += gridValues[segment][key][i];
    }
  }

  if (metaSum / targetSum == limit) {
    //  i.e. if 20 / 10 == 2, set the shared sum == 10.
    sums[segment] = targetSum;
  } else {
    alert("error!");
    error++;
  }
}

function shuffleArray(diff) {
  spliceObject = {
    easy: [
      [
        returnObject.red.east[0],
        returnObject.red.east[3],
        returnObject.red.south[0],
        returnObject.yellow.north[1],
        returnObject.yellow.south[1],
        returnObject.blue.north[0],
        returnObject.red.south[3],
        returnObject.blue.west[0],
      ],
      ["c1_2", "c1_5", "c2_1", "c1_3", "c5_3", "c4_5", "c5_1", "c5_4"],
    ],
    not_so_easy: [
      [
        returnObject.red.east[0],
        returnObject.red.east[3],
        returnObject.red.south[0],
        returnObject.orange.east[1],
        returnObject.green.west[1],
        returnObject.blue.north[0],
        returnObject.red.south[3],
        returnObject.blue.west[0],
      ],
      ["c1_2", "c1_5", "c2_1", "c2_4", "c4_2", "c4_5", "c5_1", "c5_4"],
    ],
    slightly_stressful: [[], []],
    kinda_hard: [[], []],
    pretty_damn_tricky: [[], []],
  };

  //  Iterate through the relevant spliceObject array
  var index = 0;
  //  Iterate through the first array of the relevant spliceObject key.
  for (var val of spliceObject[diff][0]) {
    //  Iterate through longArray.
    for (var i = 0; i < longArray.length; i++) {
      //  If the number at longArray[i] == a number on the grid that needs to be fixed, splice it from longArray.
      if (longArray[i] == val) {
        var splicedVal = longArray.splice(i, 1);
        //  i.e. spliceObject['easy'][1][0], or "c1_3".
        fixed[spliceObject[diff][1][index]] = true;
        break;
      }
    }
    index++;
  }

  // Shuffle array.
  for (var i = 0; i < longArray.length; i++) {
    for (var j = i + 1; j < longArray.length; j++) {
      var rand = Math.floor(Math.random() * 2);
      if (rand === 0) {
        var holder = longArray[j];
        longArray[j] = longArray[i];
        longArray[i] = holder;
      }
    }
  }
}

function getCombos(fixedSum, ref, unfixedTiles, lAClone, solvedRef) {
  try {
    var options = {
      odd: [],
      even: [],
      total: 0,
    };

    for (var i = 1; i < 9; i++) {
      //  Iterate through all numbers which could reside in a yellow segment, i.e. 1 - 8.
      if (lAClone.indexOf(i) !== -1 && solvedRef[i] !== true) {
        //  If i hasn't already been assigned to a yellow segment ...
        //  x = the sum of the segment, less (i + the sum of all fixed tiles).
        //  Basically we're finding out whether we can find a viable combination of numbers that sums to x based upon the current state of the segment.
        //  If there is only one unfixed tile in the segment, this is simply a matter of checking whether x exists in lAClone.
        //  If there are two unfixed tiles, we need to scan lAClone for a viable combination.
        var x = ref - (i + fixedSum);
        if (unfixedTiles === 1) {
          if (x >= 1) {
            if (x > 8) {
              //    If x is greater than 8, add i automatically so long as it exists in lAClone.
              if (lAClone.indexOf(x) !== -1) {
                if (i % 2 === 0) {
                  options.even.push(i);
                } else {
                  options.odd.push(i);
                }
                options.total++;
              }
            } else {
              //    If x is <= 8, check how many times it appears in lAClone.
              //    If it doesn't appear at all, ignore.
              //    If once, add i only if x has already been assigned to a yellow segment.
              //    If multiple times, add unconditionally.
              var appearances = 0;
              for (var num of lAClone) {
                if (num === x) {
                  appearances++;
                }
              }
              if (appearances > 1) {
                if (i % 2 === 0) {
                  options.even.push(i);
                } else {
                  options.odd.push(i);
                }
                options.total++;
              } else {
                if (appearances == 1 && solvedRef[x] === true) {
                  if (i % 2 === 0) {
                    options.even.push(i);
                  } else {
                    options.odd.push(i);
                  }
                  options.total++;
                }
              }
            }
          } else {
            break;
          }
        } else if (unfixedTiles === 2) {
          //    If there are multiple unfixedTiles, we need to add an extra layer of checking.
          var viableCombo = false;
          for (var y = 0; y < lAClone.length; y++) {
            var tileA = lAClone[y];
            for (var z = y + 1; z < lAClone.length; z++) {
              var tileB = lAClone[z];
              if (tileA + tileB === x) {
                //  If the two tiles sum to x ...
                viableCombo = true;
                break;
              }
            }
            if (viableCombo === true) {
              break;
            }
          }
        }
        if (viableCombo === true) {
          //  If there is a viable combination, add i as an option.
          if (i % 2 === 0) {
            options.even.push(i);
          } else {
            options.odd.push(i);
          }
          options.total++;
        }
      } else {
      }
    }
    return options;
  } catch (err) {}
}

function checkGrid(
  obj,
  lAClone,
  phase,
  isNots,
  solvedRef,
  diff,
  lastLap,
  solvedIds
) {
  try {
    for (var segment of obj) {
      if (segment.solved === false && solvedIds.indexOf(segment.label) === -1) {
        var considerSolved = false;
        if (solutions[segment.label] % 2 === 0) {
          var oddEven = "even";
        } else {
          var oddEven = "odd";
        }
        //var fixedTiles = 0;
        var unfixedTiles = 0;
        var fixedSum = 0;

        for (var tile of segment.arr) {
          if (fixed[tile] === true || solvedIds.indexOf(segment.label) !== -1) {
            fixedSum += solutions[tile];
          } else {
            unfixedTiles++;
          }
        }
        if (unfixedTiles <= 2) {
          if (unfixedTiles === 0) {
            considerSolved = true;
          } else {
            const options = getCombos(
              fixedSum,
              solutions[segment.ref],
              unfixedTiles,
              lAClone,
              solvedRef,
              solvedIds
            );

            if (phase === 0) {
              if (options.total === 1) {
                considerSolved = true;
                if (lastLap === true) {
                  return "satisfied";
                }
              }
            } else if (phase === 1) {
              if (options[oddEven].length === 1) {
                considerSolved = true;
                isNots[segment.label][0] = oddEven;
              }
            } else if (phase === 2) {
              if (options[oddEven].length === 2) {
                considerSolved = true;
                isNots[segment.label][0] = oddEven;
                if (options[oddEven][0] !== solutions[segment.label]) {
                  isNots[segment.label][1] = options[oddEven][0];
                } else {
                  isNots[segment.label][1] = options[oddEven][1];
                }
              }
            }
          }

          if (considerSolved === true) {
            segment.solved = true;
            solvedIds.push(
              segment.label,
              segment.inverse,
              segment.innerFixed,
              segment.outerFixed
            );
            var spliceA = lAClone.splice(
              lAClone.indexOf(solutions[segment.label]),
              1
            );
            solvedRef[solutions[segment.label]] = true;
            var spliceB = lAClone.splice(
              lAClone.indexOf(9 - solutions[segment.label]),
              1
            );
            solvedRef[9 - solutions[segment.label]] = true;
            if (
              fixed[segment.outerFixed] !== true &&
              solvedIds.indexOf(segment.outerFixed) === -1
            ) {
              var spliceC = lAClone.splice(
                lAClone.indexOf(solutions[segment.outerFixed]),
                1
              );
            }
            if (
              fixed[segment.innerFixed] !== true &&
              solvedIds.indexOf(segment.innerFixed) === -1
            ) {
              var spliceD = lAClone.splice(
                lAClone.indexOf(solutions[segment.innerFixed]),
                1
              );
            }
            return "progress";
          }
        } else {
        }
      } else {
      }
    }
    return "exhausted";
  } catch (err) {}
}

function tileFix(obj, lAClone, diff, last, solvedIds) {
  try {
    var fixables = [
      "c5_1",
      "c1_5",
      "c2_1",
      "c4_5",
      "c5_4",
      "c1_2",
      "c4_2",
      "c2_4",
      "c4_1",
      "c2_5",
      "c5_2",
      "c1_4",
    ];

    for (var segment of obj) {
      for (var i = 0; i < 2; i++) {
        if (i === 0) {
          var focusCell = segment.innerFixed;
          var otherCell = segment.outerFixed;
        } else {
          var focusCell = segment.outerFixed;
          var otherCell = segment.innerFixed;
        }

        if (last === false) {
          if (fixed[focusCell] !== true && fixed[otherCell] !== true) {
            if (solvedIds.indexOf(focusCell) === -1) {
              var appearanceCount = 0;
              var marker = 0;
              for (var j in lAClone) {
                if (lAClone[j] === solutions[focusCell]) {
                  appearanceCount++;
                  marker = j;
                }
              }
              if (appearanceCount === 2) {
                fixed[focusCell] = true;
                var spliced = lAClone.splice(marker, 1);

                var splicedLongArray = longArray.splice(
                  longArray.indexOf(solutions[focusCell]),
                  1
                );

                spliceObject[diff][0].push(solutions[focusCell]);
                spliceObject[diff][1].push(focusCell);
                return;
              }
            } else {
            }
          } else {
          }
        }
      }
    }

    for (var el of fixables) {
      if (fixed[el] !== true) {
        fixed[el] = true;
        var spliced = lAClone.splice(lAClone.indexOf(solutions[el]), 1);

        var splicedLongArray = longArray.splice(
          longArray.indexOf(solutions[el]),
          1
        );

        spliceObject[diff][0].push(solutions[el]);
        spliceObject[diff][1].push(el);
        return;
      }
    }
  } catch (err) {}
}

function prepBoard(diff) {
  try {
    var merryGoRound = [
      {
        label: "c2_3",
        ref: "c2_2",
        outerFixed: "c2_5",
        innerFixed: "c2_4",
        arr: ["c2_4", "c2_5"],
        inverse: "c1_3",
        solved: false,
      },
      {
        label: "c3_4",
        ref: "c4_4",
        outerFixed: "c1_4",
        innerFixed: "c2_4",
        arr: ["c2_4", "c1_4"],
        inverse: "c3_5",
        solved: false,
      },
      {
        label: "c4_3",
        ref: "c4_4",
        outerFixed: "c4_1",
        innerFixed: "c4_2",
        arr: ["c4_2", "c4_1"],
        inverse: "c5_3",
        solved: false,
      },
      {
        label: "c3_2",
        ref: "c2_2",
        outerFixed: "c5_2",
        innerFixed: "c4_2",
        arr: ["c4_2", "c5_2"],
        inverse: "c3_1",
        solved: false,
      },
      {
        label: "c1_3",
        ref: "c1_1",
        outerFixed: "c1_5",
        innerFixed: "c1_2",
        arr: ["c1_2", "c1_4", "c1_5"],
        inverse: "c2_3",
        solved: false,
      },
      {
        label: "c3_5",
        ref: "c5_5",
        outerFixed: "c1_5",
        innerFixed: "c4_5",
        arr: ["c4_5", "c2_5", "c1_5"],
        inverse: "c3_4",
        solved: false,
      },
      {
        label: "c5_3",
        ref: "c5_5",
        outerFixed: "c5_1",
        innerFixed: "c5_4",
        arr: ["c5_4", "c5_2", "c5_1"],
        inverse: "c4_3",
        solved: false,
      },
      {
        label: "c3_1",
        ref: "c1_1",
        outerFixed: "c5_1",
        innerFixed: "c2_1",
        arr: ["c2_1", "c4_1", "c5_1"],
        inverse: "c3_2",
        solved: false,
      },
    ];

    var isNots = {
      c2_3: [null, null],
      c3_4: [null, null],
      c4_3: [null, null],
      c3_2: [null, null],
      c1_3: [null, null],
      c3_5: [null, null],
      c5_3: [null, null],
      c3_1: [null, null],
    };

    var lAClone = longArray.slice();
    var solvedRef = [null, null, null, null, null, null, null, null, null];
    var phase = 0;
    var segmentsSolved = 0;
    var lastLap = false;
    var tilesFixed = 0;
    var solvedIds = [];

    if (
      diff === "kinda_hard" ||
      diff === "pretty_damn_tricky" ||
      diff === "slightly_stressful"
    ) {
      tilesFixed++;
      tileFix(merryGoRound, lAClone, diff, false, solvedIds);
    }

    for (var i = 0; i < 20; i++) {
      var result = checkGrid(
        merryGoRound,
        lAClone,
        phase,
        isNots,
        solvedRef,
        diff,
        lastLap,
        solvedIds
      );
      if (result === "exhausted") {
        if (phase === 0 && lastLap === true) {
          if (tilesFixed <= 2) {
            tilesFixed++;
            tileFix(merryGoRound, lAClone, diff, true, solvedIds);
          }
          return isNots;
        }
        phase++;
        if (phase === 3) {
          tilesFixed++;
          tileFix(merryGoRound, lAClone, diff, false, solvedIds);
          phase = 0;
        }
      } else if (result === "progress") {
        segmentsSolved++;
        if (diff === "kinda_hard") {
          if (segmentsSolved === 3) {
            lastLap = true;
          }
        } else if (diff === "slightly_stressful") {
          if (segmentsSolved === 4) {
            if (tilesFixed < 2) {
              tilesFixed++;
              tileFix(merryGoRound, lAClone, diff, true, solvedIds);
            }
            return isNots;
          }
        } else if (diff === "pretty_damn_tricky") {
          if (segmentsSolved === 2) {
            lastLap = true;
          }
        } else {
          if (segmentsSolved === 1) {
            return isNots;
          }
        }
        phase = 0;
      } else if (result === "satisfied") {
        if (diff !== "easy" && diff !== "not_so_easy") {
          if (tilesFixed < 2) {
            tileFix(merryGoRound, lAClone, diff, true, solvedIds);
          }
        }

        return isNots;
      }
    }

    return isNots;
  } catch (err) {}
}
