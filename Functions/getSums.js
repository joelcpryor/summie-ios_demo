export default function getSums(gameVals, diff) {
  return new Promise((resolve, reject) => {
    try {
      if (
        diff === "easy" ||
        diff === "not_so_easy" ||
        diff === "slightly_stressful" ||
        diff === "kinda_hard" ||
        diff === "pretty_damn_tricky" ||
        diff === "practice"
      ) {
        const responseObj = {
          c1_6:
            gameVals["c1_2"] +
            gameVals["c1_3"] +
            gameVals["c1_4"] +
            gameVals["c1_5"],
          c6_1:
            gameVals["c2_1"] +
            gameVals["c3_1"] +
            gameVals["c4_1"] +
            gameVals["c5_1"],
          c2_6: gameVals["c2_3"] + gameVals["c2_4"] + gameVals["c2_5"],
          c6_2: gameVals["c3_2"] + gameVals["c4_2"] + gameVals["c5_2"],
          c4_0: gameVals["c4_1"] + gameVals["c4_2"] + gameVals["c4_3"],
          c0_4: gameVals["c1_4"] + gameVals["c2_4"] + gameVals["c3_4"],
          c5_0:
            gameVals["c5_1"] +
            gameVals["c5_2"] +
            gameVals["c5_3"] +
            gameVals["c5_4"],
          c0_5:
            gameVals["c1_5"] +
            gameVals["c2_5"] +
            gameVals["c3_5"] +
            gameVals["c4_5"],
          c0_3: gameVals["c1_3"] + gameVals["c2_3"],
          c3_6: gameVals["c3_4"] + gameVals["c3_5"],
          c6_3: gameVals["c4_3"] + gameVals["c5_3"],
          c3_0: gameVals["c3_1"] + gameVals["c3_2"],
        };
        resolve(responseObj);
      } else if (diff === "break_my_brain") {
        const responseObj = {
          c0_6:
            gameVals["c1_6"] +
            gameVals["c2_6"] +
            gameVals["c3_6"] +
            gameVals["c4_6"] +
            gameVals["c5_6"],
          c6_0:
            gameVals["c6_1"] +
            gameVals["c6_2"] +
            gameVals["c6_3"] +
            gameVals["c6_4"] +
            gameVals["c6_5"],
          c1_7:
            gameVals["c1_2"] +
            gameVals["c1_3"] +
            gameVals["c1_4"] +
            gameVals["c1_5"] +
            gameVals["c1_6"],
          c7_1:
            gameVals["c2_1"] +
            gameVals["c3_1"] +
            gameVals["c4_1"] +
            gameVals["c5_1"] +
            gameVals["c6_1"],
          c2_7:
            gameVals["c2_3"] +
            gameVals["c2_4"] +
            gameVals["c2_5"] +
            gameVals["c2_6"],
          c7_2:
            gameVals["c3_2"] +
            gameVals["c4_2"] +
            gameVals["c5_2"] +
            gameVals["c6_2"],
          c4_0: gameVals["c4_1"] + gameVals["c4_2"] + gameVals["c4_3"],
          c0_4: gameVals["c1_4"] + gameVals["c2_4"] + gameVals["c3_4"],
          c5_0:
            gameVals["c5_1"] +
            gameVals["c5_2"] +
            gameVals["c5_3"] +
            gameVals["c5_4"],
          c0_5:
            gameVals["c1_5"] +
            gameVals["c2_5"] +
            gameVals["c3_5"] +
            gameVals["c4_5"],
          c3_7: gameVals["c3_4"] + gameVals["c3_5"] + gameVals["c3_6"],
          c7_3: gameVals["c4_3"] + gameVals["c5_3"] + gameVals["c6_3"],
          c0_3: gameVals["c1_3"] + gameVals["c2_3"],
          c3_0: gameVals["c3_1"] + gameVals["c3_2"],
          c4_7: gameVals["c4_5"] + gameVals["c4_6"],
          c7_4: gameVals["c5_4"] + gameVals["c6_4"],
        };
        resolve(responseObj);
      } else if (
        diff === "snack0" ||
        diff === "snack1" ||
        diff === "snack2" ||
        diff === "snack3"
      ) {
        const responseObj = {
          c0_0: gameVals.c0_1 + gameVals.c0_2 + gameVals.c0_3,
          c1_0: gameVals.c1_1 + gameVals.c1_2 + gameVals.c1_3,
          c2_0: gameVals.c2_1 + gameVals.c2_2 + gameVals.c2_3,
          c3_1: gameVals.c0_1 + gameVals.c1_1 + gameVals.c2_1,
          c3_2: gameVals.c0_2 + gameVals.c1_2 + gameVals.c2_2,
          c3_3: gameVals.c0_3 + gameVals.c1_3 + gameVals.c2_3,
        };
        resolve(responseObj);
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}
