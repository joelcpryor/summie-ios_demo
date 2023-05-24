import puzzleGen6 from "./puzzleGen6";

function getPuzzle(diff) {
  return new Promise((resolve, reject) => {
    try {
      const puzzle = puzzleGen6(diff);
      console.log(puzzle[0]);
      resolve(puzzle);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

export default async function init6(diff) {
  const puzzle = await getPuzzle(diff);

  return new Promise((resolve, reject) => {
    try {
      const gameVals = {
        c1_1: puzzle[2].red,
        c1_2: puzzle[3]["c1_2"] === true ? puzzle[0].red.east[0] : null,
        c1_3: puzzle[3]["c1_3"] === true ? puzzle[0].red.east[1] : null,
        c1_4: puzzle[3]["c1_4"] === true ? puzzle[0].red.east[2] : null,
        c1_5: puzzle[3]["c1_5"] === true ? puzzle[0].red.east[3] : null,
        c1_6: puzzle[3]["c1_6"] === true ? puzzle[0].red.east[4] : null,
        c2_1: puzzle[3]["c2_1"] === true ? puzzle[0].red.south[0] : null,
        c2_2: puzzle[2].orange,
        c2_3: puzzle[3]["c2_3"] === true ? puzzle[0].orange.east[0] : null,
        c2_4: puzzle[3]["c2_4"] === true ? puzzle[0].orange.east[1] : null,
        c2_5: puzzle[3]["c2_5"] === true ? puzzle[0].orange.east[2] : null,
        c2_6: puzzle[3]["c2_6"] === true ? puzzle[0].orange.east[3] : null,
        c3_1: puzzle[3]["c3_1"] === true ? puzzle[0].red.south[1] : null,
        c3_2: puzzle[3]["c3_2"] === true ? puzzle[0].orange.south[0] : null,
        c3_3: puzzle[2].yellow,
        c3_4: puzzle[3]["c3_4"] === true ? puzzle[0].yellow.east[0] : null,
        c3_5: puzzle[3]["c3_5"] === true ? puzzle[0].yellow.east[1] : null,
        c3_6: puzzle[3]["c3_6"] === true ? puzzle[0].yellow.east[2] : null,
        c4_1: puzzle[3]["c4_1"] === true ? puzzle[0].green.west[2] : null,
        c4_2: puzzle[3]["c4_2"] === true ? puzzle[0].green.west[1] : null,
        c4_3: puzzle[3]["c4_3"] === true ? puzzle[0].green.west[0] : null,
        c4_4: puzzle[2].green,
        c4_5: puzzle[3]["c4_5"] === true ? puzzle[0].blue.north[0] : null,
        c4_6: puzzle[3]["c4_6"] === true ? puzzle[0].violet.north[1] : null,
        c5_1: puzzle[3]["c5_1"] === true ? puzzle[0].blue.west[3] : null,
        c5_2: puzzle[3]["c5_2"] === true ? puzzle[0].blue.west[2] : null,
        c5_3: puzzle[3]["c5_3"] === true ? puzzle[0].blue.west[1] : null,
        c5_4: puzzle[3]["c5_4"] === true ? puzzle[0].blue.west[0] : null,
        c5_5: puzzle[2].blue,
        c5_6: puzzle[3]["c5_6"] === true ? puzzle[0].violet.north[0] : null,
        c6_1: puzzle[3]["c6_1"] === true ? puzzle[0].violet.west[4] : null,
        c6_2: puzzle[3]["c6_2"] === true ? puzzle[0].violet.west[3] : null,
        c6_3: puzzle[3]["c6_3"] === true ? puzzle[0].violet.west[2] : null,
        c6_4: puzzle[3]["c6_4"] === true ? puzzle[0].violet.west[1] : null,
        c6_5: puzzle[3]["c6_5"] === true ? puzzle[0].violet.west[0] : null,
        c6_6: puzzle[2].violet,
      };

      const btmVals = {
        b0: puzzle[1][0],
        b1: puzzle[1][1],
        b2: puzzle[1][2],
        b3: puzzle[1][3],
        b4: puzzle[1][4],
        b5: puzzle[1][5],
        b6: puzzle[1][6],
        b7: puzzle[1][7],
        b8: puzzle[1][8],
        b9: puzzle[1][9],
        b10: puzzle[1][10],
        b11: puzzle[1][11],
        b12: puzzle[1][12],
        b13: puzzle[1][13],
        b14: puzzle[1][14],
        b15: puzzle[1][15],
        b16: puzzle[1][16],
        b17: puzzle[1][17],
        b18: puzzle[1][18],
        b19: puzzle[1][19],
        b20: puzzle[1][20],
        b21: puzzle[1][21],
        b22: puzzle[1][22],
        b23: puzzle[1][23],
        b24: puzzle[1][24],
        b25: puzzle[1][25],
      };

      const solutions = {
        c0_3: puzzle[2].yellow,
        c0_4: puzzle[2].green,
        c0_5: puzzle[2].blue,
        c0_6: puzzle[2].violet,
        c1_1: puzzle[2].red,
        c1_2: puzzle[0].red.east[0],
        c1_3: puzzle[0].red.east[1],
        c1_4: puzzle[0].red.east[2],
        c1_5: puzzle[0].red.east[3],
        c1_6: puzzle[0].red.east[4],
        c1_7: puzzle[2].red,
        c2_1: puzzle[0].red.south[0],
        c2_2: puzzle[2].orange,
        c2_3: puzzle[0].orange.east[0],
        c2_4: puzzle[0].orange.east[1],
        c2_5: puzzle[0].orange.east[2],
        c2_6: puzzle[0].orange.east[3],
        c2_7: puzzle[2].orange,
        c3_0: puzzle[2].yellow,
        c3_1: puzzle[0].red.south[1],
        c3_2: puzzle[0].orange.south[0],
        c3_3: puzzle[2].yellow,
        c3_4: puzzle[0].yellow.east[0],
        c3_5: puzzle[0].yellow.east[1],
        c3_6: puzzle[0].yellow.east[2],
        c3_7: puzzle[2].yellow,
        c4_0: puzzle[2].green,
        c4_1: puzzle[0].green.west[2],
        c4_2: puzzle[0].green.west[1],
        c4_3: puzzle[0].green.west[0],
        c4_4: puzzle[2].green,
        c4_5: puzzle[0].blue.north[0],
        c4_6: puzzle[0].violet.north[1],
        c4_7: puzzle[2].green,
        c5_0: puzzle[2].blue,
        c5_1: puzzle[0].blue.west[3],
        c5_2: puzzle[0].blue.west[2],
        c5_3: puzzle[0].blue.west[1],
        c5_4: puzzle[0].blue.west[0],
        c5_5: puzzle[2].blue,
        c5_6: puzzle[0].violet.north[0],
        c6_0: puzzle[2].violet,
        c6_1: puzzle[0].violet.west[4],
        c6_2: puzzle[0].violet.west[3],
        c6_3: puzzle[0].violet.west[2],
        c6_4: puzzle[0].violet.west[1],
        c6_5: puzzle[0].violet.west[0],
        c6_6: puzzle[2].violet,
        c7_1: puzzle[2].red,
        c7_2: puzzle[2].orange,
        c7_3: puzzle[2].yellow,
        c7_4: puzzle[2].green,
      };

      const initialGame = {
        c1_1: puzzle[2].red,
        c1_2: puzzle[3]["c1_2"] === true ? puzzle[0].red.east[0] : null,
        c1_3: puzzle[3]["c1_3"] === true ? puzzle[0].red.east[1] : null,
        c1_4: puzzle[3]["c1_4"] === true ? puzzle[0].red.east[2] : null,
        c1_5: puzzle[3]["c1_5"] === true ? puzzle[0].red.east[3] : null,
        c1_6: puzzle[3]["c1_6"] === true ? puzzle[0].red.east[4] : null,
        c2_1: puzzle[3]["c2_1"] === true ? puzzle[0].red.south[0] : null,
        c2_2: puzzle[2].orange,
        c2_3: puzzle[3]["c2_3"] === true ? puzzle[0].orange.east[0] : null,
        c2_4: puzzle[3]["c2_4"] === true ? puzzle[0].orange.east[1] : null,
        c2_5: puzzle[3]["c2_5"] === true ? puzzle[0].orange.east[2] : null,
        c2_6: puzzle[3]["c2_6"] === true ? puzzle[0].orange.east[3] : null,
        c3_1: puzzle[3]["c3_1"] === true ? puzzle[0].red.south[1] : null,
        c3_2: puzzle[3]["c3_2"] === true ? puzzle[0].orange.south[0] : null,
        c3_3: puzzle[2].yellow,
        c3_4: puzzle[3]["c3_4"] === true ? puzzle[0].yellow.east[0] : null,
        c3_5: puzzle[3]["c3_5"] === true ? puzzle[0].yellow.east[1] : null,
        c3_6: puzzle[3]["c3_6"] === true ? puzzle[0].yellow.east[2] : null,
        c4_1: puzzle[3]["c4_1"] === true ? puzzle[0].green.west[2] : null,
        c4_2: puzzle[3]["c4_2"] === true ? puzzle[0].green.west[1] : null,
        c4_3: puzzle[3]["c4_3"] === true ? puzzle[0].green.west[0] : null,
        c4_4: puzzle[2].green,
        c4_5: puzzle[3]["c4_5"] === true ? puzzle[0].blue.north[0] : null,
        c4_6: puzzle[3]["c4_6"] === true ? puzzle[0].violet.north[1] : null,
        c5_1: puzzle[3]["c5_1"] === true ? puzzle[0].blue.west[3] : null,
        c5_2: puzzle[3]["c5_2"] === true ? puzzle[0].blue.west[2] : null,
        c5_3: puzzle[3]["c5_3"] === true ? puzzle[0].blue.west[1] : null,
        c5_4: puzzle[3]["c5_4"] === true ? puzzle[0].blue.west[0] : null,
        c5_5: puzzle[2].blue,
        c5_6: puzzle[3]["c5_6"] === true ? puzzle[0].violet.north[0] : null,
        c6_1: puzzle[3]["c6_1"] === true ? puzzle[0].violet.west[4] : null,
        c6_2: puzzle[3]["c6_2"] === true ? puzzle[0].violet.west[3] : null,
        c6_3: puzzle[3]["c6_3"] === true ? puzzle[0].violet.west[2] : null,
        c6_4: puzzle[3]["c6_4"] === true ? puzzle[0].violet.west[1] : null,
        c6_5: puzzle[3]["c6_5"] === true ? puzzle[0].violet.west[0] : null,
        c6_6: puzzle[2].violet,
      };

      const initialBtm = {
        b0: puzzle[1][0],
        b1: puzzle[1][1],
        b2: puzzle[1][2],
        b3: puzzle[1][3],
        b4: puzzle[1][4],
        b5: puzzle[1][5],
        b6: puzzle[1][6],
        b7: puzzle[1][7],
        b8: puzzle[1][8],
        b9: puzzle[1][9],
        b10: puzzle[1][10],
        b11: puzzle[1][11],
        b12: puzzle[1][12],
        b13: puzzle[1][13],
        b14: puzzle[1][14],
        b15: puzzle[1][15],
        b16: puzzle[1][16],
        b17: puzzle[1][17],
        b18: puzzle[1][18],
        b19: puzzle[1][19],
        b20: puzzle[1][20],
        b21: puzzle[1][21],
        b22: puzzle[1][22],
        b23: puzzle[1][23],
        b24: puzzle[1][24],
        b25: puzzle[1][25],
      };

      resolve([
        gameVals,
        btmVals,
        solutions,
        initialGame,
        initialBtm,
        puzzle[1],
      ]);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}
