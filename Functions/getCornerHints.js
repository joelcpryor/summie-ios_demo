function doTheWork(solution) {
  return new Promise((resolve, reject) => {
    try {
      console.log("running doTheWork(" + solution + ")");
      let o_e;
      let i_n;

      if (solution % 2 === 0) {
        o_e = "even";
      } else {
        o_e = "odd";
      }

      var proceed = false;
      while (proceed == false) {
        var rand = Math.ceil(Math.random() * 10);
        if (solution !== rand) {
          if (o_e === "even" && rand % 2 === 0) {
            proceed = true;
            console.log("setting i_n == " + rand);
            i_n = rand;
          } else if (o_e === "odd" && rand % 2 !== 0) {
            proceed = true;
            console.log("setting i_n == " + rand);
            i_n = rand;
          }
        }
      }

      console.log("resolving " + i_n);
      resolve(`! ${i_n}`);
    } catch (err) {
      console.log("error in doTheWork()");
      console.log(err);
      reject(err);
    }
  });
}

export default async function getCornerHints(solution) {
  try {
    console.log("running getCornerHints(" + solution + ")");
    const result = await doTheWork(solution);
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  } catch (err) {
    console.log("error in getCornerHints()");
    console.log(err);
  }
}
