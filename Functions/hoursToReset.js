export default function hoursToReset(deadline) {
  return new Promise((resolve, reject) => {
    const currentTime = Math.round(Date.now());
    const timeDiff = deadline - currentTime;
    resolve(Math.round(timeDiff / 60000 / 60));
  });
}
