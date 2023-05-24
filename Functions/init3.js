import puzzleGen3 from "./puzzleGen3";

function getPuzzle(diff) {
  return new Promise((resolve, reject) => {
    try {
      const puzzle = puzzleGen3(diff);
      resolve(puzzle);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

export default async function init3(diff) {
  const puzzle = await getPuzzle(diff);
  console.log(puzzle);

  return new Promise((resolve, reject) => {
    try {
      const gameVals = {
        c0_1: puzzle[3].c0_1 === true ? puzzle[0].c0_1 : null,
        c0_2: puzzle[3].c0_2 === true ? puzzle[0].c0_2 : null,
        c0_3: puzzle[3].c0_3 === true ? puzzle[0].c0_3 : null,
        c1_1: puzzle[3].c1_1 === true ? puzzle[0].c1_1 : null,
        c1_2: puzzle[3].c1_2 === true ? puzzle[0].c1_2 : null,
        c1_3: puzzle[3].c1_3 === true ? puzzle[0].c1_3 : null,
        c2_1: puzzle[3].c2_1 === true ? puzzle[0].c2_1 : null,
        c2_2: puzzle[3].c2_2 === true ? puzzle[0].c2_2 : null,
        c2_3: puzzle[3].c2_3 === true ? puzzle[0].c2_3 : null,
        c0_0: puzzle[2].red,
        c1_0: puzzle[2].orange,
        c2_0: puzzle[2].yellow,
        c3_1: puzzle[2].green,
        c3_2: puzzle[2].blue,
        c3_3: puzzle[2].violet,
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
      };

      const solutions = {
        c0_0: puzzle[2].red,
        c0_1: puzzle[0].c0_1,
        c0_2: puzzle[0].c0_2,
        c0_3: puzzle[0].c0_3,
        c1_0: puzzle[2].orange,
        c1_1: puzzle[0].c1_1,
        c1_2: puzzle[0].c1_2,
        c1_3: puzzle[0].c1_3,
        c2_0: puzzle[2].yellow,
        c2_1: puzzle[0].c2_1,
        c2_2: puzzle[0].c2_2,
        c2_3: puzzle[0].c2_3,
        c3_1: puzzle[2].green,
        c3_2: puzzle[2].blue,
        c3_3: puzzle[2].violet,
      };

      resolve([gameVals, btmVals, solutions]);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}
