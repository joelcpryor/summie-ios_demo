import puzzleGen5 from "./puzzleGen5-1";

function getPuzzle(diff) {
  return new Promise((resolve, reject) => {
    try {
      const puzzle = puzzleGen5(diff);
      resolve(puzzle);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

export default async function init5(diff) {
  const puzzle = await getPuzzle(diff);

  return new Promise((resolve, reject) => {
    try {
      const gameVals = {
        c1_1: puzzle[2].red,
        c1_2: puzzle[3]["c1_2"] === true ? puzzle[0].red.east[0] : null,
        c1_3: puzzle[3]["c1_3"] === true ? puzzle[0].red.east[1] : null,
        c1_4: puzzle[3]["c1_4"] === true ? puzzle[0].red.east[2] : null,
        c1_5: puzzle[3]["c1_5"] === true ? puzzle[0].red.east[3] : null,
        c2_1: puzzle[3]["c2_1"] === true ? puzzle[0].red.south[0] : null,
        c2_2: puzzle[2].orange,
        c2_3: puzzle[3]["c2_3"] === true ? puzzle[0].orange.east[0] : null,
        c2_4: puzzle[3]["c2_4"] === true ? puzzle[0].orange.east[1] : null,
        c2_5: puzzle[3]["c2_5"] === true ? puzzle[0].orange.east[2] : null,
        c3_1: puzzle[3]["c3_1"] === true ? puzzle[0].red.south[1] : null,
        c3_2: puzzle[3]["c3_2"] === true ? puzzle[0].orange.south[0] : null,
        c3_3: puzzle[2].yellow,
        c3_4: puzzle[3]["c3_4"] === true ? puzzle[0].green.north[0] : null,
        c3_5: puzzle[3]["c3_5"] === true ? puzzle[0].blue.north[1] : null,
        c4_1: puzzle[3]["c4_1"] === true ? puzzle[0].red.south[2] : null,
        c4_2: puzzle[3]["c4_2"] === true ? puzzle[0].orange.south[1] : null,
        c4_3: puzzle[3]["c4_3"] === true ? puzzle[0].yellow.south[0] : null,
        c4_4: puzzle[2].green,
        c4_5: puzzle[3]["c4_5"] === true ? puzzle[0].blue.north[0] : null,
        c5_1: puzzle[3]["c5_1"] === true ? puzzle[0].red.south[3] : null,
        c5_2: puzzle[3]["c5_2"] === true ? puzzle[0].orange.south[2] : null,
        c5_3: puzzle[3]["c5_3"] === true ? puzzle[0].yellow.south[1] : null,
        c5_4: puzzle[3]["c5_4"] === true ? puzzle[0].blue.west[0] : null,
        c5_5: puzzle[2].blue,
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
      };

      const solutions = {
        c0_3: puzzle[2].yellow,
        c0_4: puzzle[2].green,
        c0_5: puzzle[2].blue,
        c1_1: puzzle[2].red,
        c1_2: puzzle[0].red.east[0],
        c1_3: puzzle[0].red.east[1],
        c1_4: puzzle[0].red.east[2],
        c1_5: puzzle[0].red.east[3],
        c1_6: puzzle[2].red,
        c2_1: puzzle[0].red.south[0],
        c2_2: puzzle[2].orange,
        c2_3: puzzle[0].orange.east[0],
        c2_4: puzzle[0].orange.east[1],
        c2_5: puzzle[0].orange.east[2],
        c2_6: puzzle[2].orange,
        c3_0: puzzle[2].yellow,
        c3_1: puzzle[0].yellow.west[1],
        c3_2: puzzle[0].yellow.west[0],
        c3_3: puzzle[2].yellow,
        c3_4: puzzle[0].yellow.east[0],
        c3_5: puzzle[0].yellow.east[1],
        c3_6: puzzle[2].yellow,
        c4_0: puzzle[2].green,
        c4_1: puzzle[0].green.west[2],
        c4_2: puzzle[0].green.west[1],
        c4_3: puzzle[0].green.west[0],
        c4_4: puzzle[2].green,
        c4_5: puzzle[0].blue.north[0],
        c5_0: puzzle[2].blue,
        c5_1: puzzle[0].blue.west[3],
        c5_2: puzzle[0].blue.west[2],
        c5_3: puzzle[0].blue.west[1],
        c5_4: puzzle[0].blue.west[0],
        c5_5: puzzle[2].blue,
        c6_1: puzzle[2].red,
        c6_2: puzzle[2].orange,
        c6_3: puzzle[2].yellow,
      };

      const initialGame = {
        c1_1: puzzle[2].red,
        c1_2: puzzle[3]["c1_2"] === true ? puzzle[0].red.east[0] : null,
        c1_3: puzzle[3]["c1_3"] === true ? puzzle[0].red.east[1] : null,
        c1_4: puzzle[3]["c1_4"] === true ? puzzle[0].red.east[2] : null,
        c1_5: puzzle[3]["c1_5"] === true ? puzzle[0].red.east[3] : null,
        c2_1: puzzle[3]["c2_1"] === true ? puzzle[0].red.south[0] : null,
        c2_2: puzzle[2].orange,
        c2_3: puzzle[3]["c2_3"] === true ? puzzle[0].orange.east[0] : null,
        c2_4: puzzle[3]["c2_4"] === true ? puzzle[0].orange.east[1] : null,
        c2_5: puzzle[3]["c2_5"] === true ? puzzle[0].orange.east[2] : null,
        c3_1: puzzle[3]["c3_1"] === true ? puzzle[0].red.south[1] : null,
        c3_2: puzzle[3]["c3_2"] === true ? puzzle[0].orange.south[0] : null,
        c3_3: puzzle[2].yellow,
        c3_4: puzzle[3]["c3_4"] === true ? puzzle[0].green.north[0] : null,
        c3_5: puzzle[3]["c3_5"] === true ? puzzle[0].blue.north[1] : null,
        c4_1: puzzle[3]["c4_1"] === true ? puzzle[0].red.south[2] : null,
        c4_2: puzzle[3]["c4_2"] === true ? puzzle[0].orange.south[1] : null,
        c4_3: puzzle[3]["c4_3"] === true ? puzzle[0].yellow.south[0] : null,
        c4_4: puzzle[2].green,
        c4_5: puzzle[3]["c4_5"] === true ? puzzle[0].blue.north[0] : null,
        c5_1: puzzle[3]["c5_1"] === true ? puzzle[0].red.south[3] : null,
        c5_2: puzzle[3]["c5_2"] === true ? puzzle[0].orange.south[2] : null,
        c5_3: puzzle[3]["c5_3"] === true ? puzzle[0].yellow.south[1] : null,
        c5_4: puzzle[3]["c5_4"] === true ? puzzle[0].blue.west[0] : null,
        c5_5: puzzle[2].blue,
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
      };

      const cellsToFix = [puzzle[6][diff][1]];

      resolve([
        gameVals,
        btmVals,
        solutions,
        initialGame,
        initialBtm,
        puzzle[1],
        puzzle[5],
        cellsToFix,
      ]);
    } catch (err) {
      reject(err);
      console.log("error in init5");
      console.log(err);
    }
  });
}
