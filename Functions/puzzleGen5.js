import { boardSegments } from "./Objects";
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

var returnSums = {};

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

    generateYellowSpread(9);
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
    const hints = determineViability(diff, 9);
    if (diff === "easy") {
      hints.c2_3 = [null, null];
      hints.c4_3 = [null, null];
    }

    var fixedIds = spliceObject;

    return [returnObject, longArray, returnSums, fixed, error, hints, fixedIds];
  } catch (err) {
    console.log(err);
  }
}

function generateYellowSpread(cap) {
  var initialSUM = cap;
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

  var randMulti = 10;
  var proceed = false;
  while (proceed == false) {
    //  Generate two numbers between 1 and 10.
    var num1 = Math.ceil(Math.random() * randMulti);
    var num2 = Math.ceil(Math.random() * randMulti);
    //  There are two cells to populate in the southern segment, each of which must be >= 1, so sumEast must exceed sumSouth by >= 2.
    //  This will always be possible given enough iterations, so incrementing randMulti is not necessary.
    var mustExceed = sumSouth + 1;
    if (sumEast + num1 + num2 > mustExceed) {
      proceed = true;
    }
  }

  gridValues.b.east[1] = num1;
  longArray.push(num1);
  gridValues.b.east[2] = num2;
  longArray.push(num2);
  sumEast += num1 + num2;

  //    We now need to distribute the difference between sumEast and sumSouth, less the initial distributions to each cell.
  var duplicate = true;
  while (duplicate === true) {
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
          //  If the number is even, distribute to A.
          distributeA++;
          //  If the number == 2, distribute again to A.
        } else {
          distributeB++;
        }
      }
      if (distributeA !== gridValues.b.east[1]) {
        duplicate = false;
      }
    } else {
      duplicate = false;
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

  var randMulti = 10;
  var loopTracker = 0;
  var proceed = false;
  while (proceed === false) {
    var num = Math.ceil(Math.random() * randMulti);
    //  The sum of the north segment must be > the two cells that have been populated in the west segment.
    if (num + sumNorth > sumWest) {
      gridValues.d.north[2] = num;
      longArray.push(num);
      sumNorth += num;
      proceed = true;
    } else {
      loopTracker++;
      if (loopTracker % 20 === 0) {
        // Ratchet randMulti.
        randMulti++;
      }
    }
  }

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

  var randMulti = 10;
  var loopTracker = 0;
  var proceed = false;
  while (proceed == false) {
    //  Generate two numbers between 1 and 10.
    var num1 = Math.ceil(Math.random() * randMulti);
    var num2 = Math.ceil(Math.random() * randMulti);
    //  There are two cells to populate in the southern segment, each of which must be >= 1, so sumEast must exceed sumSouth by >= 2.
    //  This will always be possible given enough iterations, so incrementing randMulti is not necessary.
    var mustExceed = sumSouth + 1;
    if (sumEast + num1 + num2 > mustExceed) {
      proceed = true;
    } else {
      loopTracker++;
      if (loopTracker % 20 === 0) {
        randMulti++;
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
      //  Generate a number between 1 and 4.
      var rand = Math.round(Math.random());
      if (rand === 0) {
        //  If the number is even, distribute to A.
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

  var randMulti = 10;
  var loopTracker = 0;
  var proceed = false;
  while (proceed === false) {
    var num = Math.ceil(Math.random() * randMulti);
    if (num + sumNorth > sumWest) {
      gridValues.e.north[0] = num;
      longArray.push(num);
      sumNorth += num;
      proceed = true;
    } else {
      loopTracker++;
      if (loopTracker % 10 === 0) {
        randMulti++;
      }
    }
  }

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
    slightly_stressful: [
      [
        returnObject.red.east[3],
        returnObject.orange.east[1],
        returnObject.green.west[1],
        returnObject.red.south[3],
      ],
      ["c1_5", "c2_4", "c4_2", "c5_1"],
    ],
    kinda_hard: [
      [returnObject.orange.east[1], returnObject.green.west[1]],
      ["c2_4", "c4_2"],
    ],
    pretty_damn_tricky: [
      [returnObject.orange.east[2], returnObject.green.west[2]],
      ["c2_5", "c4_1"],
    ],
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

function firstCheck(
  obj,
  lAClone,
  phase,
  isNots,
  solvedRef,
  justObserve,
  diff,
  cap
) {
  for (var segment of obj) {
    if (segment.solvable === false) {
      if (diff === "pretty_damn_tricky") {
        var segFixed = segment.alt_fixed;
      } else {
        var segFixed = segment.fixed;
      }

      var oddEven;
      var options = {
        odd: [],
        even: [],
        total: 0,
      };

      if (segment.correct % 2 === 0) {
        oddEven = "even";
      } else {
        oddEven = "odd";
      }

      for (var i = 1; i < cap; i++) {
        if (lAClone.indexOf(i) !== -1 && solvedRef[i] !== true) {
          var x = segment.ref - (i + segFixed);
          if (x >= 1) {
            if (x >= cap) {
              if (lAClone.indexOf(x) !== -1) {
                if (i % 2 === 0) {
                  options.even.push(i);
                } else {
                  options.odd.push(i);
                }
                options.total++;
              }
            } else {
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
        }
      }
      var considerSolved = false;
      if (phase === 0) {
        if (options.total === 1) {
          if (justObserve === false) {
            considerSolved = true;
          } else {
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
          if (options[oddEven][0] !== segment.correct) {
            isNots[segment.label][1] = options[oddEven][0];
          } else {
            isNots[segment.label][1] = options[oddEven][1];
          }
        }
      } else if (phase === 3) {
        if (options[oddEven].length === 3 && diff !== "pretty_damn_tricky") {
          considerSolved = true;
          isNots[segment.label][0] = oddEven;
          for (var a in options[oddEven]) {
            if (options[oddEven][a] !== segment.correct) {
              isNots[segment.label][1] = options[oddEven][a];
              options[oddEven].splice(a, 1);
              break;
            }
          }
          for (var b in options[oddEven]) {
            if (options[oddEven][b] !== segment.correct) {
              var inverse = cap - options[oddEven][b];
              if (inverse % 2 === 0) {
                isNots[segment.inverse][0] = "even";
              } else {
                isNots[segment.inverse][0] = "odd";
              }
              isNots[segment.inverse][1] = inverse;
            }
          }
        }
      } else if (phase === 4) {
        for (var key in cornerCells) {
          if (
            cornerCells[key] >= 1 &&
            cornerCells[key] < cap &&
            fixed[key] !== true
          ) {
            var cloneSpliced = lAClone.splice(
              lAClone.indexOf(cornerCells[key]),
              1
            );
            var longArraySpliced = longArray.splice(
              longArray.indexOf(cornerCells[key]),
              1
            );
            spliceObject[diff][1].push(key);
            fixed[key] = true;
            return "reset-from-fixed";
            break;
          }
        }
      }

      if (considerSolved === true) {
        var spliceA = lAClone.splice(lAClone.indexOf(segment.correct), 1);
        solvedRef[segment.correct] = true;
        var spliceB = lAClone.splice(lAClone.indexOf(cap - segment.correct), 1);
        solvedRef[cap - segment.correct] = true;
        var spliceC = lAClone.splice(
          lAClone.indexOf(segment.ref - (segment.correct + segFixed)),
          1
        );
        segment.solvable = true;
        return "progress";
      }
    }
  }
  return "exhausted";
}

function determineViability(diff, cap) {
  try {
    var merryGoRound = [
      {
        label: "c2_3",
        inverse: "c1_3",
        perpendicular: "c2_5",
        ref: returnSums.orange,
        fixed: returnObject.orange.east[1],
        alt_fixed: returnObject.orange.east[2],
        correct: returnObject.yellow.north[0],
        solvable: false,
      },
      {
        label: "c3_4",
        inverse: "c3_5",
        perpendicular: "c1_4",
        ref: returnSums.green,
        fixed: returnObject.green.north[1],
        alt_fixed: returnObject.green.north[1],
        correct: returnObject.yellow.east[0],
        solvable: false,
      },
      {
        label: "c4_3",
        inverse: "c5_3",
        perpendicular: "c4_1",
        ref: returnSums.green,
        fixed: returnObject.green.west[1],
        alt_fixed: returnObject.green.west[2],
        correct: returnObject.yellow.south[0],
        solvable: false,
      },
      {
        label: "c3_2",
        inverse: "c3_1",
        perpendicular: "c5_2",
        ref: returnSums.orange,
        fixed: returnObject.orange.south[1],
        alt_fixed: returnObject.orange.south[1],
        correct: returnObject.yellow.west[0],
        solvable: false,
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
      c2_5: [null, null],
      c1_4: [null, null],
      c4_1: [null, null],
      c5_2: [null, null],
      c1_2: [null, null],
      c1_5: [null, null],
      c4_5: [null, null],
      c2_1: [null, null],
      c5_1: [null, null],
      c5_4: [null, null],
    };

    var lAClone = longArray.slice();

    var solvedRef = [null, null, null, null, null, null, null, null, null];

    var satisfied = false;
    if (diff === "kinda_hard" || diff === "pretty_damn_tricky") {
      var phase = 4;
    } else {
      var phase = 0;
    }
    var iterations = 0;
    var justObserve = false;
    var segmentsSolved = 0;
    while (satisfied === false) {
      var result = firstCheck(
        merryGoRound,
        lAClone,
        phase,
        isNots,
        solvedRef,
        justObserve,
        diff,
        cap
      );
      if (result == "exhausted") {
        if (phase === 4) {
          phase = 0;
        } else {
          phase++;
        }
        justObserve = false;
      } else if (result == "satisfied") {
        satisfied = true;
      } else if (result === "progress") {
        if (diff === "kinda_hard" || diff === "pretty_damn_tricky") {
          segmentsSolved++;
          if (segmentsSolved === 2) {
            satisfied = true;
          } else if (segmentsSolved === 1) {
            justObserve = true;
          }
          phase = 4;
        } else {
          segmentsSolved++;
          if (segmentsSolved === 3) {
            satisfied = true;
          } else if (segmentsSolved === 2) {
            justObserve = true;
          }
          phase = 0;
        }
      } else if (result === "reset-from-fixed") {
        phase = 0;
        //justObserve = true;
      }
      iterations++;
      if (iterations === 16) {
        satisfied = true;
      }
    }
    return isNots;
  } catch (err) {
    console.log(err);
  }
}
