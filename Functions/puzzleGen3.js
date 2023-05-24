var gridValues = {
  c0_1: 0,
  c0_2: 0,
  c0_3: 0,
  c1_1: 0,
  c1_2: 0,
  c1_3: 0,
  c2_1: 0,
  c2_2: 0,
  c2_3: 0,
};

var sums = {
  red: 0,
  orange: 0,
  yellow: 0,
  green: 0,
  blue: 0,
  violet: 0,
};

var longArray = [];

var fixed = {};

var error = 0;

var numbersAvailable;

export default function puzzleGen3(diff) {
  console.log(diff);
  try {
    longArray = [];
    error = 0;
    numbersAvailable = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    fixed = {
      c0_1: null,
      c0_2: null,
      c0_3: null,
      c1_1: null,
      c1_2: null,
      c1_3: null,
      c2_1: null,
      c2_2: null,
      c2_3: null,
    };

    generate();
    addSums();
    shuffleArray(diff);

    return [gridValues, longArray, sums, fixed, error];
  } catch (err) {
    console.log(err);
  }
}

function generate() {
  for (var i = 0; i < 9; i++) {
    var rand = Math.floor(Math.random() * numbersAvailable.length);
    var num = numbersAvailable[rand];
    longArray.push(num);
    var spliced = numbersAvailable.splice(rand, 1);
  }

  gridValues.c0_1 = longArray[0];
  gridValues.c0_2 = longArray[1];
  gridValues.c0_3 = longArray[2];
  gridValues.c1_1 = longArray[3];
  gridValues.c1_2 = longArray[4];
  gridValues.c1_3 = longArray[5];
  gridValues.c2_1 = longArray[6];
  gridValues.c2_2 = longArray[7];
  gridValues.c2_3 = longArray[8];
}

function addSums() {
  sums = {
    red: gridValues.c0_1 + gridValues.c0_2 + gridValues.c0_3,
    orange: gridValues.c1_1 + gridValues.c1_2 + gridValues.c1_3,
    yellow: gridValues.c2_1 + gridValues.c2_2 + gridValues.c2_3,
    green: gridValues.c0_1 + gridValues.c1_1 + gridValues.c2_1,
    blue: gridValues.c0_2 + gridValues.c1_2 + gridValues.c2_2,
    violet: gridValues.c0_3 + gridValues.c1_3 + gridValues.c2_3,
  };
}

function shuffleArray(diff) {
  var spliceObject = {
    snack0: ["c1_1", "c2_1", "c2_2"],
    snack1: ["c0_3", "c1_2", "c2_1"],
    snack2: ["c0_3", "c2_1"],
    snack3: ["c1_2"],
    snack4: [],
  };

  var index = 0;
  for (var val of spliceObject[diff]) {
    console.log("val == " + val);
    for (var i = 0; i < longArray.length; i++) {
      if (longArray[i] == gridValues[val]) {
        var splicedVal = longArray.splice(i, 1);
        console.log("spliced " + splicedVal);
        fixed[spliceObject[diff][index]] = true;
        console.log(
          "setting fixed[" + spliceObject[diff][index] + "] == " + true
        );
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
