export default function getIsNot6(arr, solutions, id, capObj, diff) {
  console.log("running getIsNot6() for cell " + id);
  return new Promise((resolve, reject) => {
    try {
      let options = [];
      const val = solutions[id];
      console.log("val == " + val);
      let subX = 0;
      let subY = 0;
      let cap = 0;
      for (var elX of capObj.arrX) {
        console.log(elX);
        subX += solutions[elX];
      }
      for (var elY of capObj.arrY) {
        console.log(elY);
        subY += solutions[elY];
      }
      const refX = solutions[capObj.refX];
      const refY = solutions[capObj.refY];
      if (refX >= refY) {
        cap = refY;
      } else {
        cap = refX;
      }

      for (var i = 0; i < cap; i++) {
        console.log("checking " + i);
        if (val % 2 === 0) {
          if (
            i % 2 === 0 &&
            arr.indexOf(i) !== -1 &&
            i !== val &&
            i < refX - subX &&
            i < refY - subY
          ) {
            options.push(i);
          }
        } else {
          if (
            i % 2 !== 0 &&
            arr.indexOf(i) !== -1 &&
            i !== val &&
            i < refX - subX &&
            i < refY - subY
          ) {
            options.push(i);
          }
        }
      }
      console.log("options == " + options);

      if (options.length === 0) {
        resolve("?");
      } else if (options.length === 1) {
        resolve(`! ${options[0]}`);
      } else {
        var rand = Math.round(Math.random());
        if (rand === 0) {
          for (var x = 0; x < options.length; x++) {
            for (var y = x + 1; y < options.length; y++) {
              if (options[y] > options[x]) {
                var holder = options[x];
                options[x] = options[y];
                options[y] = holder;
              }
            }
          }
        }
        console.log("options == " + options);
        for (var z in options) {
          console.log(
            refX +
              " - (" +
              subX +
              " + " +
              options[z] +
              " == " +
              (subX + options[z]) +
              ")"
          );
          if (arr.indexOf(refX - (subX + options[z])) !== -1) {
            console.log(refX - (subX + options[z]) + "exists");
            console.log(
              refY +
                " - (" +
                subY +
                " + " +
                options[z] +
                " == " +
                (subY + options[z]) +
                ")"
            );
            if (arr.indexOf(refY - (subY + options[z])) !== -1) {
              console.log(refY - (subY + options[z]) + "exists");
              console.log("RESOVLING " + options[z]);
              resolve(`! ${options[z]}`);
              return;
            }
          }
        }
        console.log("No hints found, resolving [0] by default");
        resolve(`! ${options[0]}`);
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}
