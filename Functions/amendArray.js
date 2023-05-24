function amendArray(submittedWord, letters) {
  return new Promise((resolve, reject) => {
    try {
      //  Split the submitted word into an array of characters.
      const wTSArray = submittedWord.split("");
      //  Clone metaContext.letters.
      var newArray = letters;

      //  For each character in the submitted word, scan the letters array for a match. When found, splice the matching character and break the inner loop.
      for (var i in wTSArray) {
        for (var j in newArray) {
          if (newArray[j] == wTSArray[i]) {
            const spliced = newArray.splice(j, 1);
            break;
          }
        }
      }
      //  Once this has completed, send back to amended array.
      resolve(newArray);
    } catch (err) {
      console.log(err);
    }
  });
}

export default amendArray;
