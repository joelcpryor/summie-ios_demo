var gridValues = {
  a: {
    south: [0, 0, 0],
    east: [0, 0, 0],
  },
  b: {
    north: [0, 0, 0],
    west: [0, 0, 0],
  },
  c: {
    south: [0, 0, 0, 0],
    east: [0, 0, 0, 0],
  },
  d: {
    north: [0, 0, 0, 0],
    west: [0, 0, 0, 0],
  },
  e: {
    south: [0, 0, 0, 0, 0],
    east: [0, 0, 0, 0, 0],
  },
  f: {
    north: [0, 0, 0, 0, 0],
    west: [0, 0, 0, 0, 0],
  },
};

var sums = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
};

var longArray = [];
var returnObject = {};
var error = 0;
var randMulti;
var fixed = {};

export default function puzzleGen6(diff) {
  try {
    longArray = [];
    error = 0;
    randMulti = 9;

    fixed = {
      c1_2: null,
      c1_3: null,
      c1_4: null,
      c1_5: null,
      c1_6: null,
      c2_1: null,
      c2_3: null,
      c2_4: null,
      c2_5: null,
      c2_6: null,
      c3_1: null,
      c3_2: null,
      c3_4: null,
      c3_5: null,
      c3_6: null,
      c4_1: null,
      c4_2: null,
      c4_3: null,
      c4_5: null,
      c4_6: null,
      c5_1: null,
      c5_2: null,
      c5_3: null,
      c5_4: null,
      c5_6: null,
      c6_1: null,
      c6_2: null,
      c6_3: null,
      c6_4: null,
      c6_5: null,
    };

    console.log("running generateA()");
    generateA();
    console.log("running generateB()");
    generateB();
    console.log("running generateC()");
    generateC();
    console.log("running generateD()");
    generateD();
    console.log("running generateE()");
    generateE();
    console.log("running generateF()");
    generateF();
    console.log("running checker()");
    checker();

    var rand = Math.round(Math.random());
    if (rand === 0) {
      returnObject = {
        red: {
          south: [
            gridValues.e.south[0],
            gridValues.e.south[1],
            gridValues.e.south[2],
            gridValues.e.south[3],
            gridValues.e.south[4],
          ],
          east: [
            gridValues.e.east[0],
            gridValues.e.east[1],
            gridValues.e.east[2],
            gridValues.e.east[3],
            gridValues.e.east[4],
          ],
        },
        orange: {
          south: [
            gridValues.c.south[0],
            gridValues.c.south[1],
            gridValues.c.south[2],
            gridValues.c.south[3],
          ],
          east: [
            gridValues.c.east[0],
            gridValues.c.east[1],
            gridValues.c.east[2],
            gridValues.c.east[3],
          ],
        },
        yellow: {
          south: [
            gridValues.a.south[0],
            gridValues.a.south[1],
            gridValues.a.south[2],
          ],
          east: [
            gridValues.a.east[0],
            gridValues.a.east[1],
            gridValues.a.east[2],
          ],
        },
        green: {
          north: [
            gridValues.b.north[0],
            gridValues.b.north[1],
            gridValues.b.north[2],
          ],
          west: [
            gridValues.b.west[0],
            gridValues.b.west[1],
            gridValues.b.west[2],
          ],
        },
        blue: {
          north: [
            gridValues.d.north[0],
            gridValues.d.north[1],
            gridValues.d.north[2],
            gridValues.d.north[3],
          ],
          west: [
            gridValues.d.west[0],
            gridValues.d.west[1],
            gridValues.d.west[2],
            gridValues.d.west[3],
          ],
        },
        violet: {
          north: [
            gridValues.f.north[0],
            gridValues.f.north[1],
            gridValues.f.north[2],
            gridValues.f.north[3],
            gridValues.f.north[4],
          ],
          west: [
            gridValues.f.west[0],
            gridValues.f.west[1],
            gridValues.f.west[2],
            gridValues.f.west[3],
            gridValues.f.west[4],
          ],
        },
      };
      var returnSums = {
        red: sums.e,
        orange: sums.c,
        yellow: sums.a,
        green: sums.b,
        blue: sums.d,
        violet: sums.f,
      };
    } else {
      returnObject = {
        red: {
          south: [
            gridValues.f.north[0],
            gridValues.f.north[1],
            gridValues.f.north[2],
            gridValues.f.north[3],
            gridValues.f.north[4],
          ],
          east: [
            gridValues.f.west[0],
            gridValues.f.west[1],
            gridValues.f.west[2],
            gridValues.f.west[3],
            gridValues.f.west[4],
          ],
        },
        orange: {
          south: [
            gridValues.d.north[0],
            gridValues.d.north[1],
            gridValues.d.north[2],
            gridValues.d.north[3],
          ],
          east: [
            gridValues.d.west[0],
            gridValues.d.west[1],
            gridValues.d.west[2],
            gridValues.d.west[3],
          ],
        },
        yellow: {
          south: [
            gridValues.b.north[0],
            gridValues.b.north[1],
            gridValues.b.north[2],
          ],
          east: [
            gridValues.b.west[0],
            gridValues.b.west[1],
            gridValues.b.west[2],
          ],
        },
        green: {
          north: [
            gridValues.a.south[0],
            gridValues.a.south[1],
            gridValues.a.south[2],
          ],
          west: [
            gridValues.a.east[0],
            gridValues.a.east[1],
            gridValues.a.east[2],
          ],
        },
        blue: {
          north: [
            gridValues.c.south[0],
            gridValues.c.south[1],
            gridValues.c.south[2],
            gridValues.c.south[3],
          ],
          west: [
            gridValues.c.east[0],
            gridValues.c.east[1],
            gridValues.c.east[2],
            gridValues.c.east[3],
          ],
        },
        violet: {
          north: [
            gridValues.e.south[0],
            gridValues.e.south[1],
            gridValues.e.south[2],
            gridValues.e.south[3],
            gridValues.e.south[4],
          ],
          west: [
            gridValues.e.east[0],
            gridValues.e.east[1],
            gridValues.e.east[2],
            gridValues.e.east[3],
            gridValues.e.east[4],
          ],
        },
      };
      var returnSums = {
        red: sums.f,
        orange: sums.d,
        yellow: sums.b,
        green: sums.a,
        blue: sums.c,
        violet: sums.e,
      };
    }

    shuffler(diff);

    return [returnObject, longArray, returnSums, fixed, error];
  } catch (err) {
    console.log(err);
  }
}

function distributor(total, slices) {
  //    Initiate an array that will contain one element for every slice.
  var distributions = [];
  //    To begin with, initialise every element at 1. Decrement `total` accordingly.
  for (var i = 0; i < slices; i++) {
    distributions.push(1);
    total--;
  }

  while (total > 0) {
    //  Randomly generate a number between 0 and (the quantity of slices).
    var rand = Math.floor(Math.random() * slices);
    //  Increment one of the elements, i.e. distributions[1].
    distributions[rand]++;
    //  Decrement the total.
    total--;
    //  To increase variability, increment again 50% of the time.
    if (total > 0) {
      var addAnother = Math.floor(Math.random() * 2);
      if (addAnother === 0) {
        distributions[rand]++;
        total--;
      }
    }
  }

  return distributions;
}

function generator(slices) {
  console.log("running generator(" + slices + ")");
  var returnArray = [];
  var returnSum = 0;
  //    Generate one random number per slice.
  for (var i = 0; i < slices; i++) {
    var rand = Math.ceil(Math.random() * randMulti);
    returnArray.push(rand);
  }

  //    Sum all elements.
  for (var j = 0; j < returnArray.length; j++) {
    returnSum += returnArray[j];
  }

  return [returnArray, returnSum];
}

function checker() {
  for (var key in gridValues) {
    //  key == a, b, c, etc.
    var keySum = 0;
    for (var axis in gridValues[key]) {
      //  axis == north, south, east, west.
      var axisSum = 0;
      for (var el in gridValues[key][axis]) {
        //  el == 0, 1, 2, etc.
        keySum += gridValues[key][axis][el];
        axisSum += gridValues[key][axis][el];
      }
    }
    //  To check that segments sum to the same value, ensure that (keySum / 2) == axisSum.
    if (keySum / 2 !== axisSum) {
      error++;
    } else if (sums[key] !== axisSum) {
      error++;
    }
  }
}

function shuffler(diff) {
  var spliceObject = {
    template: [
      [
        returnObject.red.east[0],
        returnObject.red.east[1],
        returnObject.red.east[2],
        returnObject.red.east[3],
        returnObject.red.east[4],
        returnObject.red.south[0],
        returnObject.orange.east[0],
        returnObject.orange.east[1],
        returnObject.orange.east[2],
        returnObject.orange.east[3],
        returnObject.red.south[1],
        returnObject.orange.south[0],
        returnObject.yellow.east[0],
        returnObject.yellow.east[1],
        returnObject.yellow.east[2],
        returnObject.green.west[2],
        returnObject.green.west[1],
        returnObject.green.west[0],
        returnObject.blue.north[0],
        returnObject.violet.north[1],
        returnObject.blue.west[3],
        returnObject.blue.west[2],
        returnObject.blue.west[1],
        returnObject.blue.west[0],
        returnObject.violet.north[0],
        returnObject.violet.west[4],
        returnObject.violet.west[3],
        returnObject.violet.west[2],
        returnObject.violet.west[1],
        returnObject.violet.west[0],
      ],
      [
        "c1_2",
        "c1_3",
        "c1_4",
        "c1_5",
        "c1_6",
        "c2_1",
        "c2_3",
        "c2_4",
        "c2_5",
        "c2_6",
        "c3_1",
        "c3_2",
        "c3_4",
        "c3_5",
        "c3_6",
        "c4_1",
        "c4_2",
        "c4_3",
        "c4_5",
        "c4_6",
        "c5_1",
        "c5_2",
        "c5_3",
        "c5_4",
        "c5_6",
        "c6_1",
        "c6_2",
        "c6_3",
        "c6_4",
        "c6_5",
      ],
    ],
    kinda_hard: [
      [
        returnObject.red.east[3], //
        returnObject.red.east[4], //
        returnObject.orange.east[1], //
        returnObject.orange.east[3], //
        returnObject.yellow.east[1], //
        returnObject.green.west[1], //
        returnObject.blue.west[3], //
        returnObject.blue.west[1], //
        returnObject.violet.west[4], //
        returnObject.violet.west[3], //
      ],
      [
        "c1_5", //
        "c1_6", //
        "c2_4", //
        "c2_6", //
        "c3_5", //
        "c4_2", //
        "c5_1", //
        "c5_3", //
        "c6_1", //
        "c6_2", //
      ],
    ],
    pretty_damn_tricky: [
      [
        returnObject.red.east[3], //
        returnObject.orange.east[1], //
        returnObject.orange.east[3], //
        returnObject.yellow.east[1], //
        returnObject.green.west[1], //
        returnObject.blue.west[3], //
        returnObject.blue.west[1], //
        returnObject.violet.west[3], //
      ],
      [
        "c1_5", //
        "c2_4", //
        "c2_6", //
        "c3_5", //
        "c4_2", //
        "c5_1", //
        "c5_3", //
        "c6_2", //
      ],
    ],
    break_my_brain: [
      [
        returnObject.red.east[3], //
        returnObject.orange.east[1], //
        returnObject.orange.east[3], //
        returnObject.yellow.east[1], //
        returnObject.green.west[1], //
        returnObject.blue.west[3], //
        returnObject.blue.west[1], //
        returnObject.violet.west[3], //
      ],
      [
        "c1_5", //
        "c2_4", //
        "c2_6", //
        "c3_5", //
        "c4_2", //
        "c5_1", //
        "c5_3", //
        "c6_2", //
      ],
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
        longArray.splice(i, 1);
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

function generateA() {
  console.log("inside generateA()");
  //    First we generate the innermost south/east segment.
  //    The southern cells are generated randomly.
  var proceed = false;
  while (proceed == false) {
    var result = generator(3);
    //  Ensure that the sum of the segment is greater than 3.
    if (result[1] > 3) {
      proceed = true;
    }
  }
  var yCells = result[0];
  var yCellsSum = result[1];
  //    Assign values to their respective cells.
  gridValues.a.south[0] = yCells[0];
  longArray.push(yCells[0]);
  gridValues.a.south[1] = yCells[1];
  longArray.push(yCells[1]);
  gridValues.a.south[2] = yCells[2];
  longArray.push(yCells[2]);

  //    Next, the sum is distributed across the corresponding eastern cells.
  var distributed = distributor(yCellsSum, 3);
  //    Assign values to their respective cells.
  gridValues.a.east[0] = distributed[0];
  longArray.push(distributed[0]);
  gridValues.a.east[1] = distributed[1];
  longArray.push(distributed[1]);
  gridValues.a.east[2] = distributed[2];
  longArray.push(distributed[2]);

  //
  sums.a = yCellsSum;
}

function generateB() {
  //    B is A's north/west counterpart.
  //    Sync intersections.
  gridValues.b.north[0] = gridValues.a.east[0];
  var sumNorth = gridValues.a.east[0];
  gridValues.b.west[0] = gridValues.a.south[0];
  var sumWest = gridValues.a.south[0];

  //    Randomly generate the remaining two northern cells.
  var proceed = false;
  var loopTracker = 0;
  while (proceed == false) {
    loopTracker++;
    if (loopTracker % 10 === 0) {
      console.log("Incrementing randMulti in GenerateB()");
      randMulti++;
      console.log("New randMulti == " + randMulti);
    }
    var result = generator(2);
    //  The sum of the northern segment must be > the western cell by at least 2, (i.e. > (x + 1)).
    //  For example, [1, 5, 2] cannot be accepted against [7, 0, 0], because the minimum sum of the latter array is 9, which is less than (1 + 5 + 2).
    //  If this happens, the loop is repeated until the former array sums to >= 9.
    if (result[1] + sumNorth > sumWest + 1) {
      proceed = true;
    }
  }
  //    If the condition is satisfied, sync the array with gridValues and update sumNorth.
  gridValues.b.north[1] = result[0][0];
  longArray.push(result[0][0]);
  gridValues.b.north[2] = result[0][1];
  longArray.push(result[0][1]);
  sumNorth += result[1];

  //    The number to be distributed is (sumNorth - sumWest), and the number of cells to populate == 2.
  var distributed = distributor(sumNorth - sumWest, 2);
  gridValues.b.west[1] = distributed[0];
  longArray.push(distributed[0]);
  gridValues.b.west[2] = distributed[1];
  longArray.push(distributed[1]);

  //
  sums.b = sumNorth;
}

function generateC() {
  //    Sync intersections.
  gridValues.c.south[1] = gridValues.b.west[1];
  var sumSouth = gridValues.b.west[1];
  gridValues.c.east[1] = gridValues.b.north[1];
  var sumEast = gridValues.b.north[1];

  //    Set c3_2 == to a fraction of the yellow segment sum.
  var c3_2 = Math.ceil(Math.random() * (sums.a - 1));
  gridValues.c.south[0] = c3_2;
  sumSouth += c3_2;
  longArray.push(c3_2);

  //    Set c2_3 == to a fraction of the yellow segment sum.
  var c2_3 = Math.ceil(Math.random() * (sums.a - 1));
  gridValues.c.east[0] = c2_3;
  sumEast += c2_3;
  longArray.push(c2_3);

  //    Randomly generate the remaining two southern cells.
  var proceed = false;
  var loopTracker = 0;
  while (proceed == false) {
    loopTracker++;
    if (loopTracker % 10 === 0) {
      console.log("Incrementing randMulti in generateC()");
      randMulti++;
      console.log("New randMulti == " + randMulti);
    }
    var result = generator(2);
    //  Sum of the southern segment must be > the eastern segment by at least 2.
    //  If this condition can't be met, randMulti will begin to ratchet up until a satisfactory array is produced.
    if (result[1] + sumSouth > sumEast + 1) {
      proceed = true;
    }
  }

  //    Skip [1] and [2] because they have already been populated.
  gridValues.c.south[2] = result[0][0];
  longArray.push(result[0][0]);
  gridValues.c.south[3] = result[0][1];
  longArray.push(result[0][1]);
  sumSouth += result[1];

  var distributed = distributor(sumSouth - sumEast, 2);

  //    Skip [0] and [1] because they have already been populated.
  gridValues.c.east[2] = distributed[0];
  longArray.push(distributed[0]);
  gridValues.c.east[3] = distributed[1];
  longArray.push(distributed[1]);

  //
  sums.c = sumSouth;
}

function generateD() {
  //    Sync intersections.
  gridValues.d.north[1] = gridValues.a.east[1];
  gridValues.d.north[2] = gridValues.c.east[2];
  var sumNorth = gridValues.a.east[1] + gridValues.c.east[2];
  gridValues.d.west[1] = gridValues.a.south[1];
  gridValues.d.west[2] = gridValues.c.south[2];
  var sumWest = gridValues.a.south[1] + gridValues.c.south[2];

  //    Set c4_5 == to a fraction of the green segment sum.
  var c4_5 = Math.ceil(Math.random() * (sums.b - 1));
  console.log("sums.b == " + sums.b + ", (sums.b - 1) == " + (sums.b - 1));
  console.log("c4_5 == " + c4_5);
  gridValues.d.north[0] = c4_5;
  sumNorth += c4_5;
  longArray.push(c4_5);

  //    Set c5_4 == to a fraction of the green segment sum.
  var c5_4 = Math.ceil(Math.random() * (sums.b - 1));
  console.log("sums.b == " + sums.b + ", (sums.b - 1) == " + (sums.b - 1));
  console.log("c5_4 == " + c5_4);
  gridValues.d.west[0] = c5_4;
  sumWest += c5_4;
  longArray.push(c5_4);

  //    There's only one cell in each segment to populate, so there's no need for generator() or distributor().
  //    Here we simply generate the value of the northern cell, then set the western cell to the difference between the two segments.
  //    The conditional below is designed to moderate the result. Stacking a large number on top of an already large difference will result in c5_1 being in the high teens or twenties, so we constrain the range under such a condition.
  //    If sumNorth is < sumWest, we add the difference to the generated number to ensure that the c5_1 will be positive.
  var rand;
  if (sumWest > sumNorth) {
    var negativeDifference = sumWest - sumNorth;
    rand = Math.ceil(Math.random() * randMulti);
    rand += negativeDifference;
  } else {
    if (sumNorth - sumWest > 5) {
      rand = Math.ceil(Math.random() * 5);
    } else {
      rand = Math.ceil(Math.random() * randMulti);
    }
  }

  gridValues.d.north[3] = rand;
  sumNorth += rand;
  longArray.push(rand);

  gridValues.d.west[3] = sumNorth - sumWest;
  longArray.push(sumNorth - sumWest);

  sums.d = sumNorth;
}

function generateE() {
  //    Sync intersections.
  gridValues.e.south[2] = gridValues.b.west[2];
  gridValues.e.south[3] = gridValues.d.west[3];
  var sumSouth = gridValues.b.west[2] + gridValues.d.west[3];
  gridValues.e.east[2] = gridValues.b.north[2];
  gridValues.e.east[3] = gridValues.d.north[3];
  var sumEast = gridValues.b.north[2] + gridValues.d.north[3];

  //    Set c3_1 == to the difference between c3_2 and sums.a.
  c3_1 = sums.a - gridValues.c.south[0];
  console.log("sums.a == " + sums.a + ", c3_1 == " + c3_1);
  gridValues.e.south[1] = c3_1;
  sumSouth += c3_1;
  longArray.push(c3_1);

  //    Set c1_3 == to the difference between c2_3 and sums.a.
  c1_3 = sums.a - gridValues.c.east[0];
  console.log("sums.a == " + sums.a + ", c1_3 == " + c1_3);
  gridValues.e.east[1] = c1_3;
  sumEast += c1_3;
  longArray.push(c1_3);

  var proceed = false;
  var loopTracker = 0;
  while (proceed == false) {
    loopTracker++;
    if (loopTracker % 10 === 0) {
      console.log("Incrementing randMulti in generateE()");
      randMulti++;
      console.log("New randMulti == " + randMulti);
    }
    var result = generator(2);
    if (result[1] + sumSouth > sumEast + 1) {
      proceed = true;
    }
  }

  gridValues.e.south[0] = result[0][0];
  longArray.push(result[0][0]);
  //    Skip [1], [2] and [3].
  gridValues.e.south[4] = result[0][1];
  longArray.push(result[0][1]);
  sumSouth += result[1];

  var distributed = distributor(sumSouth - sumEast, 2);
  gridValues.e.east[0] = distributed[0];
  longArray.push(distributed[0]);
  //    Skip [1], [2] and [3].
  gridValues.e.east[4] = distributed[1];
  longArray.push(distributed[1]);

  //
  sums.e = sumSouth;
}

function generateF() {
  //  Sync intersections.
  gridValues.f.north[2] = gridValues.a.east[2];
  gridValues.f.north[3] = gridValues.c.east[3];
  gridValues.f.north[4] = gridValues.e.east[4];
  var sumNorth =
    gridValues.a.east[2] + gridValues.c.east[3] + gridValues.e.east[4];
  gridValues.f.west[2] = gridValues.a.south[2];
  gridValues.f.west[3] = gridValues.c.south[3];
  gridValues.f.west[4] = gridValues.e.south[4];
  var sumWest =
    gridValues.a.south[2] + gridValues.c.south[3] + gridValues.e.south[4];

  //    Set c5_6 == to a fraction of sums.b.
  c5_6 = sums.b - gridValues.d.north[0];
  console.log("sums.b == " + sums.b + ", c5_6 == " + c5_6);
  gridValues.f.north[1] = c5_6;
  sumNorth += c5_6;
  longArray.push(c5_6);

  //    Set c6_5 == to a fraction of sums.b.
  c6_5 = sums.b - gridValues.d.west[0];
  console.log("sums.b == " + sums.b + ", c6_5 == " + c6_5);
  gridValues.f.west[1] = c6_5;
  sumWest += c6_5;
  longArray.push(c6_5);

  var rand;
  if (sumWest > sumNorth) {
    var negativeDifference = sumWest - sumNorth;
    rand = Math.ceil(Math.random() * randMulti);
    rand += negativeDifference;
  } else {
    if (sumNorth - sumWest > 5) {
      rand = Math.ceil(Math.random() * 5);
    } else {
      rand = Math.ceil(Math.random() * randMulti);
    }
  }

  gridValues.f.north[0] = rand;
  sumNorth += rand;
  longArray.push(rand);

  gridValues.f.west[0] = sumNorth - sumWest;
  longArray.push(sumNorth - sumWest);

  //
  sums.f = sumNorth;
}
