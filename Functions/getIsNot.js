export default function getIsNot(arr, solutions, id, capArr, diff) {
  return new Promise((resolve, reject) => {
    try {
      let options = [];
      const val = solutions[id];
      const cap = solutions[capArr[1]];
      const ref = solutions[capArr[0]];
      const sub = solutions[capArr[2]];
      for (var i = 0; i < cap; i++) {
        if (val % 2 === 0) {
          if (
            i % 2 === 0 &&
            arr.indexOf(i) !== -1 &&
            i !== val &&
            i < ref - sub
          ) {
            options.push(i);
          }
        } else {
          if (
            i % 2 !== 0 &&
            arr.indexOf(i) !== -1 &&
            i !== val &&
            i < ref - sub
          ) {
            options.push(i);
          }
        }
      }

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
        for (var z in options) {
          if (arr.indexOf(ref - (sub + options[z])) !== -1) {
            if (arr.indexOf(cap - options[z]) !== -1) {
              resolve(`! ${options[z]}`);
              return;
            }
          }
        }
        for (var z in options) {
          if (arr.indexOf(ref - (sub + options[z])) !== -1) {
            resolve(`! ${options[z]}`);
            return;
          }
        }
        resolve(`! ${options[z]}`);
      }
    } catch (err) {
      console.log(err);
      reject();
    }
  });
}
