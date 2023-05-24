import { solutionsPractice } from "./Objects";

export default async function checkSolved(diff, sums, solutions) {
  return new Promise((resolve, reject) => {
    try {
      if (
        diff === "easy" ||
        diff === "not_so_easy" ||
        diff === "slightly_stressful" ||
        diff === "kinda_hard" ||
        diff === "pretty_damn_tricky"
      ) {
        if (
          sums.c1_6 === sums.c6_1 &&
          sums.c1_6 === solutions.c1_1 &&
          sums.c1_6 !== 0 &&
          sums.c1_6 !== null
        ) {
          if (
            sums.c2_6 === sums.c6_2 &&
            sums.c2_6 === solutions.c2_2 &&
            sums.c2_6 !== 0 &&
            sums.c2_6 !== null
          ) {
            if (
              sums.c4_0 === sums.c0_4 &&
              sums.c4_0 === solutions.c4_4 &&
              sums.c4_0 !== 0 &&
              sums.c4_0 !== null
            ) {
              if (
                sums.c5_0 === sums.c0_5 &&
                sums.c5_0 === solutions.c5_5 &&
                sums.c5_0 !== 0 &&
                sums.c5_0 !== null
              ) {
                resolve(true);
                return;
              }
            }
          }
        }
        resolve(false);
      } else if (diff === "break_my_brain") {
        if (
          sums.c1_7 === sums.c7_1 &&
          sums.c1_7 === solutions.c1_1 &&
          sums.c1_7 !== 0 &&
          sums.c1_7 !== null
        ) {
          if (
            sums.c2_7 === sums.c7_2 &&
            sums.c2_7 === solutions.c2_2 &&
            sums.c2_7 !== 0 &&
            sums.c2_7 !== null
          ) {
            if (
              sums.c3_7 === sums.c7_3 &&
              sums.c3_7 === solutions.c3_3 &&
              sums.c3_7 !== 0 &&
              sums.c3_7 !== null
            ) {
              if (
                sums.c4_0 === sums.c0_4 &&
                sums.c4_0 === solutions.c4_4 &&
                sums.c4_0 !== 0 &&
                sums.c4_0 !== null
              ) {
                if (
                  sums.c5_0 === sums.c0_5 &&
                  sums.c5_0 === solutions.c5_5 &&
                  sums.c5_0 !== 0 &&
                  sums.c5_0 !== null
                ) {
                  if (
                    sums.c6_0 === sums.c0_6 &&
                    sums.c6_0 === solutions.c6_6 &&
                    sums.c6_0 !== 0 &&
                    sums.c6_0 !== null
                  ) {
                    resolve(true);
                    return;
                  }
                }
              }
            }
          }
        }
        resolve(false);
      } else if (
        diff === "snack0" ||
        diff === "snack1" ||
        diff === "snack2" ||
        diff === "snack3"
      ) {
        if (
          sums.c0_0 === solutions.c0_0 &&
          sums.c1_0 === solutions.c1_0 &&
          sums.c2_0 === solutions.c2_0 &&
          sums.c3_1 === solutions.c3_1 &&
          sums.c3_2 === solutions.c3_2 &&
          sums.c3_3 === solutions.c3_3
        ) {
          resolve(true);
          return;
        } else {
          resolve(false);
        }
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}
