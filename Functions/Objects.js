const diffObject = {
  easy: {
    text: "EASY",
    cost: "FREE!",
    reward_classic: "1x letter, 2x points",
    reward_snack: "1x point per puzzle",
    grid_size: "5x5",
    color: "red",
    errors: "unlimited",
  },
  not_so_easy: {
    text: "NOT SO EASY",
    cost: "FREE!",
    reward_classic: "2x letters, 4x points",
    reward_snack: "2x points per puzzle",
    grid_size: "5x5",
    color: "orange",
    errors: "unlimited",
  },
  slightly_stressful: {
    text: "SLIGHTLY STRESSFUL",
    cost: "1x credit",
    reward_classic: "3x letters, 6x points",
    reward_snack: "4x points per puzzle",
    grid_size: "5x5",
    color: "yellow",
    errors: "4",
  },
  kinda_hard: {
    text: "KINDA HARD",
    cost: "1x credit",
    reward_classic: "4x letters, 8x points",
    reward_snack: "8x points per puzzle",
    grid_size: "5x5",
    color: "green",
    errors: "3",
  },
  pretty_damn_tricky: {
    text: "PRETTY DAMN TRICKY",
    cost: "1x credit",
    reward_classic: "5x letters, 10x points",
    reward_snack: "9x points per puzzle",
    grid_size: "5x5",
    color: "blue",
    errors: "3",
  },
  break_my_brain: {
    text: "BREAK MY BRAIN",
    cost: "1x credit",
    reward_classic: "6x letters, 12x points",
    reward_snack: null,
    grid_size: "6x6",
    color: "violet",
    errors: "3",
  },
};

const gridInfo3 = {
  r0: [
    ["c0_0", "innerSum", "red", "red", null, null],
    ["c0_1", "game", "red", "green", null, null],
    ["c0_2", "game", "red", "blue", null, null],
    ["c0_3", "game", "red", "violet", null, null],
  ],
  r1: [
    ["c1_0", "innerSum", "orange", "orange", null, null],
    ["c1_1", "game", "orange", "green", null, null],
    ["c1_2", "game", "orange", "blue", null, null],
    ["c1_3", "game", "orange", "violet", null, null],
  ],
  r2: [
    ["c2_0", "innerSum", "yellow", "yellow", null, null],
    ["c2_1", "game", "yellow", "green", null, null],
    ["c2_2", "game", "yellow", "blue", null, null],
    ["c2_3", "game", "yellow", "violet", null, null],
  ],
  r3: [
    ["c3_0", "nothing", null, null, null, null],
    ["c3_1", "innerSum", "green", "green", null, null],
    ["c3_2", "innerSum", "blue", "blue", null, null],
    ["c3_3", "innerSum", "violet", "violet", null, null],
  ],
};

const gridInfo5 = {
  r0: [
    ["c0_0", "nothing", null, null, null, null],
    ["c0_1", "nothing", null, null, null, null],
    ["c0_2", "nothing", null, null, null, null],
    ["c0_3", "sum", "yellow", "yellow", null, null],
    ["c0_4", "sum", "green", "green", null, null],
    ["c0_5", "sum", "blue", "blue", null, null],
    ["c0_6", "nothing", null, null, null, null],
  ],
  r1: [
    ["c1_0", "nothing", null, null, null, null],
    ["c1_1", "inner", "red", "red", null, null],
    ["c1_2", "game", "red", "white", "c1_1", "c1_1"],
    ["c1_3", "game", "red", "yellow", "c1_1", "c3_3"],
    ["c1_4", "game", "red", "green", "c1_1", "c4_4"],
    ["c1_5", "game", "red", "blue", "c1_1", "c5_5"],
    ["c1_6", "sum", "red", "red", null],
  ],
  r2: [
    ["c2_0", "nothing", null, null, null, null],
    ["c2_1", "game", "white", "red", "c1_1", "c1_1"],
    ["c2_2", "inner", "orange", "orange", null, null],
    ["c2_3", "game", "orange", "yellow", "c2_2", "c3_3"],
    ["c2_4", "game", "orange", "green", "c2_2", "c4_4"],
    ["c2_5", "game", "orange", "blue", "c2_2", "c5_5"],
    ["c2_6", "sum", "orange", "orange", null, null],
  ],
  r3: [
    ["c3_0", "sum", "yellow", "yellow", null, null],
    ["c3_1", "game", "yellow", "red", "c3_3", "c1_1"],
    ["c3_2", "game", "yellow", "orange", "c3_3", "c2_2"],
    ["c3_3", "inner", "yellow", "yellow", null, null],
    ["c3_4", "game", "yellow", "green", "c3_3", "c4_4"],
    ["c3_5", "game", "yellow", "blue", "c3_3", "c5_5"],
    ["c3_6", "sum", "yellow", "yellow", null, null],
  ],
  r4: [
    ["c4_0", "sum", "green", "green", null, null],
    ["c4_1", "game", "green", "red", "c4_4", "c1_1"],
    ["c4_2", "game", "green", "orange", "c4_4", "c2_2"],
    ["c4_3", "game", "green", "yellow", "c4_4", "c3_3"],
    ["c4_4", "inner", "green", "green", null, null],
    ["c4_5", "game", "white", "blue", "c5_5", "c5_5"],
    ["c4_6", "nothing", null, null, null, null],
  ],
  r5: [
    ["c5_0", "sum", "blue", "blue", null, null],
    ["c5_1", "game", "blue", "red", "c5_5", "c1_1"],
    ["c5_2", "game", "blue", "orange", "c5_5", "c2_2"],
    ["c5_3", "game", "blue", "yellow", "c5_5", "c3_3"],
    ["c5_4", "game", "blue", "white", "c5_5", "c5_5"],
    ["c5_5", "inner", "blue", "blue", null, null],
    ["c5_6", "nothing", null, null, null, null],
  ],
  r6: [
    ["c6_0", "nothing", null, null, null, null],
    ["c6_1", "sum", "red", "red", null, null],
    ["c6_2", "sum", "orange", "orange", null, null],
    ["c6_3", "sum", "yellow", "yellow", null, null],
    ["c6_4", "nothing", null, null, null, null],
    ["c6_5", "nothing", null, null, null, null],
    ["c6_6", "nothing", null, null, null, null],
  ],
};

const gridInfo6 = {
  r0: [
    ["c0_0", "nothing", null, null, null, null],
    ["c0_1", "nothing", null, null, null, null],
    ["c0_2", "nothing", null, null, null, null],
    ["c0_3", "sum", "yellow", "yellow", null, null],
    ["c0_4", "sum", "green", "green", null, null],
    ["c0_5", "sum", "blue", "blue", null, null],
    ["c0_6", "sum", "violet", "violet", null, null],
    ["c0_7", "nothing", null, null, null, null],
  ],
  r1: [
    ["c1_0", "nothing", null, null, null, null],
    ["c1_1", "inner", "red", "red", null, null],
    ["c1_2", "game", "red", "red", "c1_1", "c1_1"],
    ["c1_3", "game", "red", "red", "c1_1", "c1_1"],
    ["c1_4", "game", "red", "green", "c1_1", "c4_4"],
    ["c1_5", "game", "red", "blue", "c1_1", "c5_5"],
    ["c1_6", "game", "red", "violet", "c1_1", "c6_6"],
    ["c1_7", "sum", "red", "red", null, null],
  ],
  r2: [
    ["c2_0", "nothing", null, null, null, null],
    ["c2_1", "game", "red", "red", "c1_1", "c1_1"],
    ["c2_2", "inner", "orange", "orange", null, null],
    ["c2_3", "game", "orange", "orange", "c2_2", "c2_2"],
    ["c2_4", "game", "orange", "green", "c2_2", "c4_4"],
    ["c2_5", "game", "orange", "blue", "c2_2", "c5_5"],
    ["c2_6", "game", "orange", "violet", "c2_2", "c6_6"],
    ["c2_7", "sum", "orange", "orange", null, null],
  ],
  r3: [
    ["c3_0", "sum", "yellow", "yellow", null, null],
    ["c3_1", "game", "red", "red", "c1_1", "c1_1"],
    ["c3_2", "game", "orange", "orange", "c2_2", "c2_2"],
    ["c3_3", "inner", "yellow", "yellow", null, null],
    ["c3_4", "game", "yellow", "green", "c3_3", "c4_4"],
    ["c3_5", "game", "yellow", "blue", "c3_3", "c5_5"],
    ["c3_6", "game", "yellow", "violet", "c3_3", "c6_6"],
    ["c3_7", "sum", "yellow", "yellow", null, null],
  ],
  r4: [
    ["c4_0", "sum", "green", "green", null, null],
    ["c4_1", "game", "green", "red", "c4_4", "c1_1"],
    ["c4_2", "game", "green", "orange", "c4_4", "c2_2"],
    ["c4_3", "game", "green", "yellow", "c4_4", "c3_3"],
    ["c4_4", "inner", "green", "green", null, null],
    ["c4_5", "game", "blue", "blue", "c5_5", "c5_5"],
    ["c4_6", "game", "violet", "violet", "c6_6", "c6_6"],
    ["c4_7", "sum", "green", "green", null, null],
  ],
  r5: [
    ["c5_0", "sum", "blue", "blue", null, null],
    ["c5_1", "game", "blue", "red", "c5_5", "c1_1"],
    ["c5_2", "game", "blue", "orange", "c5_5", "c2_2"],
    ["c5_3", "game", "blue", "yellow", "c5_5", "c3_3"],
    ["c5_4", "game", "blue", "blue", "c5_5", "c5_5"],
    ["c5_5", "inner", "blue", "blue", null, null],
    ["c5_6", "game", "violet", "violet", "c6_6", "c6_6"],
    ["c5_7", "nothing", null, null, null, null],
  ],
  r6: [
    ["c6_0", "sum", "violet", "violet", null, null],
    ["c6_1", "game", "violet", "red", "c6_6", "c1_1"],
    ["c6_2", "game", "violet", "orange", "c6_6", "c2_2"],
    ["c6_3", "game", "violet", "yellow", "c6_6", "c3_3"],
    ["c6_4", "game", "violet", "violet", "c6_6", "c6_6"],
    ["c6_5", "game", "violet", "violet", "c6_6", "c6_6"],
    ["c6_6", "inner", "violet", "violet", null, null],
    ["c6_7", "nothing", null, null, null, null],
  ],
  r7: [
    ["c7_0", "nothing", null, null, null, null],
    ["c7_1", "sum", "red", "red", null, null],
    ["c7_2", "sum", "orange", "orange", null, null],
    ["c7_3", "sum", "yellow", "yellow", null, null],
    ["c7_4", "sum", "green", "green", null, null],
    ["c7_5", "nothing", null, null, null, null],
    ["c7_6", "nothing", null, null, null, null],
    ["c7_7", "nothing", null, null, null, null],
  ],
};

const snackRef = {
  snack0: 1,
  snack1: 2,
  snack2: 4,
  snack3: 8,
  snack4: 9,
};

const cellRelationships = {
  five_x: {
    c2_3: ["c2_2", "c3_3", "c2_4"],
    c3_4: ["c4_4", "c3_3", "c2_4"],
    c4_3: ["c4_4", "c3_3", "c4_2"],
    c3_2: ["c2_2", "c3_3", "c4_2"],
  },
  six_x: {
    c2_5: {
      refX: "c2_2",
      refY: "c5_5",
      arrX: ["c2_4", "c2_6"],
      arrY: ["c1_5", "c3_5"],
    },
    c3_4: {
      refX: "c3_3",
      refY: "c4_4",
      arrX: ["c3_5"],
      arrY: ["c2_4"],
    },
    c4_3: {
      refX: "c4_4",
      refY: "c3_3",
      arrX: ["c4_2"],
      arrY: ["c5_3"],
    },
    c5_2: {
      refX: "c5_5",
      refY: "c2_2",
      arrX: ["c5_1", "c5_3"],
      arrY: ["c4_2", "c6_2"],
    },
  },
};

const boardSegments = {
  five_x: {
    left: {
      inner: [
        "c2_1",
        "c3_1",
        "c3_2",
        "c4_1",
        "c4_2",
        "c4_3",
        "c5_1",
        "c5_2",
        "c5_3",
        "c5_4",
      ],
      outer: ["c3_0", "c4_0", "c5_0", "c6_1", "c6_2", "c6_3"],
    },
    right: {
      inner: [
        "c1_2",
        "c1_3",
        "c1_4",
        "c1_5",
        "c2_3",
        "c2_4",
        "c2_5",
        "c3_4",
        "c3_5",
        "c4_5",
      ],
      outer: ["c0_3", "c0_4", "c0_5", "c1_6", "c2_6", "c3_6"],
    },
  },
  six_x: {
    left: {
      inner: [
        "c2_1",
        "c3_1",
        "c3_2",
        "c4_1",
        "c4_2",
        "c4_3",
        "c5_1",
        "c5_2",
        "c5_3",
        "c5_4",
        "c6_1",
        "c6_2",
        "c6_3",
        "c6_4",
        "c6_5",
      ],
      outer: [],
    },
    right: {
      inner: [
        "c1_2",
        "c1_3",
        "c1_4",
        "c1_5",
        "c1_6",
        "c2_3",
        "c2_4",
        "c2_5",
        "c2_6",
        "c3_4",
        "c3_5",
        "c3_6",
        "c4_5",
        "c4_6",
        "c5_6",
      ],
      outer: [],
    },
  },
};

const headerInfo = [
  ["S", "red"],
  ["U", "orange"],
  ["M", "yellow"],
  ["M", "green"],
  ["I", "blue"],
  ["E", "violet"],
];

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const fixedCells = {
  easy: ["c1_2", "c1_5", "c2_1", "c1_3", "c5_3", "c4_5", "c5_1", "c5_4"],
  not_so_easy: ["c1_2", "c1_5", "c2_1", "c2_4", "c4_2", "c4_5", "c5_1", "c5_4"],
  slightly_stressful: ["c1_5", "c2_4", "c4_2", "c5_1"],
  kinda_hard: ["c2_4", "c4_2"],
  pretty_damn_tricky: [
    "c1_5", //
    "c2_4", //
    "c2_6", //
    "c3_5", //
    "c4_2", //
    "c5_1", //
    "c5_3", //
    "c6_2", //
  ],
  break_my_brain: [
    "c1_5", //
    "c2_4", //
    "c2_6", //
    "c3_5", //
    "c4_2", //
    "c5_1", //
    "c5_3", //
    "c6_2",
  ],
  practice: [
    "c1_2",
    "c1_5",
    "c2_1",
    "c2_4",
    "c4_2",
    "c4_5",
    "c5_1",
    "c5_4",
    "c2_5",
    "c5_2",
  ],
  snack0: ["c1_1", "c2_1", "c2_2"],
  snack1: ["c0_3", "c1_2", "c2_1"],
  snack2: ["c0_3", "c2_1"],
  snack3: ["c1_2"],
  snack4: [],
};

const practiceSequence = [
  {
    text: "Welcome to Summie! This quick demo will explain how the game works.",
    fix: null,
    game: null,
    btm: null,
    odd_even: null,
    reveal: null,
  },
  {
    text: "The board consists of white tiles and coloured tiles. The white tiles form intersecting rows and columns that span between the coloured tiles, as demonstrated below.",
    fix: null,
    game: null,
    btm: null,
    odd_even: null,
    reveal: null,
  },
  {
    text: "To help you understand the logic of the puzzle, we'll focus on one segment at a time.",
    fix: null,
    game: null,
    btm: null,
    odd_even: null,
    reveal: null,
  },
  {
    text: "In this row we see three kinds of tiles: the inner yellow tile, the outer yellow tiles, and the white tiles.",
    fix: null,
    game: null,
    btm: null,
    odd_even: null,
    reveal: ["c3_0", "c3_1", "c3_2", "c3_3", "c3_4", "c3_5", "c3_6"],
  },
  {
    text: "The white tiles form rows on either side of the inner yellow tile. These rows must sum to the number displayed in the inner tile, which in this case is 9.",
    fix: null,
    game: ["c3_3"],
    btm: null,
    odd_even: null,
    reveal: null,
  },
  {
    text: "The current sum of each row is tracked by the yellow tile on the edge of the grid. When a number is placed on the board, these tiles update automatically.",
    fix: ["c3_2", "c3_4"],
    game: ["c3_2", "c3_4"],
    btm: null,
    odd_even: null,
    reveal: null,
  },
  {
    text: "Have a go at completing the rows. To place a number, simply tap the number below the grid and then tap the white tile that you want to fill. To remove a number, tap the white tile that you want to empty.",
    fix: ["c3_2", "c3_4"],
    game: ["c3_2", "c3_4"],
    btm: [1, 7],
    odd_even: null,
    reveal: null,
  },
  {
    text: "Well done! Now do the same for the yellow columns.",
    fix: ["c3_1", "c3_5", "c1_3", "c5_3"],
    game: ["c1_3", "c5_3"],
    btm: [6, 4],
    odd_even: null,
    reveal: ["c0_3", "c1_3", "c2_3", "c4_3", "c5_3", "c6_3"],
  },
  {
    text: "The yellow rows and columns will always contain a unique combination of numbers (i.e. 6/3, 2/7, 5/4 and 8/1). This rule will help you reason through the puzzle.",
    fix: ["c2_3", "c4_3"],
    game: null,
    btm: null,
    odd_even: null,
    reveal: null,
  },
  {
    text: "The grid will sometimes display a hint. Tiles containing an even number are marked with an 'E', and tiles containing an odd number are marked with an 'O'.",
    fix: ["c4_2"],
    game: null,
    btm: [7, 2, 3],
    odd_even: ["c2_5"],
    reveal: ["c2_2", "c2_4", "c2_5", "c2_6", "c4_2", "c5_2", "c6_2"],
  },
  {
    text: "Good work! Now solve the green segment ...",
    fix: ["c2_4", "c2_5", "c4_2", "c5_2"],
    game: null,
    btm: [5, 2],
    odd_even: ["c4_1"],
    reveal: ["c0_4", "c1_4", "c4_4", "c4_0", "c4_1"],
  },
  {
    text: "Another type of hint that you might encounter is the 'is-not' hint. These hints display a number which does NOT belong in the shaded tile. For example, if the tile displays '!9', you can be sure that the tile contains a number other than 9.\n\nYou can flip the 'is-not' hint into an 'odd-even' hint by tapping the shaded tile.",
    fix: ["c1_4", "c4_1"],
    btm: [7, 4, 7, 9, 2, 7],
    odd_even: ["c1_2", "c5_4"],
    reveal: [
      "c0_5",
      "c1_1",
      "c1_2",
      "c1_5",
      "c1_6",
      "c2_1",
      "c4_5",
      "c5_0",
      "c5_1",
      "c5_4",
      "c5_5",
      "c6_1",
    ],
  },
];

const practiceText = [];

const gameValsDefault = {
  c1_1: null,
  c1_2: null,
  c1_3: null,
  c1_4: null,
  c1_5: null,
  c2_1: null,
  c2_2: null,
  c2_3: null,
  c2_4: null,
  c2_5: null,
  c3_1: null,
  c3_2: null,
  c3_3: null,
  c3_4: null,
  c3_5: null,
  c4_1: null,
  c4_2: null,
  c4_3: null,
  c4_4: null,
  c4_5: null,
  c5_1: null,
  c5_2: null,
  c5_3: null,
  c5_4: null,
  c5_5: null,
};

const btmValsDefault = {
  b0: null,
  b1: null,
  b2: null,
  b3: null,
  b4: null,
  b5: null,
  b6: null,
  b7: null,
  b8: null,
  b9: null,
  b10: null,
  b11: null,
  b12: null,
  b13: null,
  b14: null,
  b15: null,
  b16: null,
  b17: null,
  b18: null,
  b19: null,
};

const solutionsPractice = {
  c0_3: 9,
  c0_4: 11,
  c0_5: 18,
  c1_1: 22,
  c1_2: 7,
  c1_3: 6,
  c1_4: 2,
  c1_5: 7,
  c1_6: 22,
  c2_1: 9,
  c2_2: 12,
  c2_3: 3,
  c2_4: 7,
  c2_5: 2,
  c2_6: 12,
  c3_0: 9,
  c3_1: 1,
  c3_2: 8,
  c3_3: 9,
  c3_4: 2,
  c3_5: 7,
  c3_6: 9,
  c4_0: 11,
  c4_1: 5,
  c4_2: 1,
  c4_3: 5,
  c4_4: 11,
  c4_5: 2,
  c5_0: 18,
  c5_1: 7,
  c5_2: 3,
  c5_3: 4,
  c5_4: 4,
  c5_5: 18,
  c6_1: 22,
  c6_2: 12,
  c6_3: 9,
};

export {
  diffObject,
  gridInfo3,
  gridInfo5,
  gridInfo6,
  headerInfo,
  fixedCells,
  gameValsDefault,
  btmValsDefault,
  solutionsPractice,
  alphabet,
  cellRelationships,
  boardSegments,
  practiceSequence,
  snackRef,
};
