import { Audio } from "expo-av";

const soundObject = new Audio.Sound();

export default async function playSound(prompt, muted) {
  try {
    const status = await soundObject.getStatusAsync();
    if (status.isLoaded) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
    }

    if (muted !== true) {
      if (prompt === "lift" || prompt === "letter-select") {
        await soundObject.loadAsync(
          require("../Sounds/zapsplat_btn_click_edited_2.mp3")
        );
      } else if (prompt === "drop" || prompt === "reset") {
        await soundObject.loadAsync(
          require("../Sounds/zapsplat_btn_click_edited_1.mp3")
        );
      } else if (prompt === "puzzle-solved") {
        await soundObject.loadAsync(
          require("../Sounds/zapsplat_puzzle_solve_1.mp3")
        );
      } else if (prompt === "wotw-solved") {
        await soundObject.loadAsync(
          require("../Sounds/zapsplat_wotw_success_1.mp3")
        );
      } else if (prompt === "word-submitted" || prompt === "snack-solved") {
        await soundObject.loadAsync(
          require("../Sounds/zapsplat_word_submitted_1.mp3")
        );
      } else if (prompt === "bonus-received") {
        await soundObject.loadAsync(
          require("../Sounds/zapsplat_receive_bonus1.mp3")
        );
      } else if (prompt === "time-expired") {
        await soundObject.loadAsync(require("../Sounds/zapsplat_times_up.mp3"));
      }
      await soundObject.playAsync();
    }
  } catch (err) {
    console.log(err);
  }
}
