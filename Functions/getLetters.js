export default function getLetters(bonus, mode) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const vowels = "AEIOU";
  const modeRef = {
    easy: 1,
    not_so_easy: 2,
    slightly_stressful: 3,
    kinda_hard: 4,
    pretty_damn_tricky: 5,
    break_my_brain: 6,
  };
  let lettersToReturn = [];

  return new Promise((resolve, reject) => {
    for (var i = 0; i < modeRef[mode]; i++) {
      if (i === modeRef[mode] - 1 && bonus === true) {
        let rand = Math.floor(Math.random() * vowels.length);
        let randLetter = vowels.charAt(rand);
        lettersToReturn.push(randLetter);
      } else {
        let rand = Math.floor(Math.random() * alphabet.length);
        let randLetter = alphabet.charAt(rand);
        lettersToReturn.push(randLetter);
      }
    }

    resolve(lettersToReturn);
  });
}
