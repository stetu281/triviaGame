export const PlayRound = async (question) => {
  /**
   * Waits for player answer or time up
   * Handles timer animation and interval
   * returns boolean with message
   */

  document.querySelector(".prep").classList.add("prep--hide");
  const timerAnimation = document.querySelector(".timer__progress");
  return new Promise((resolve, reject) => {
    timerAnimation.classList.add("timer__progress--play");

    let counter = 19;
    const interval = setInterval(() => {
      document.querySelector(".timer__time").textContent = counter;
      counter--;

      document.querySelector(".question__answersContainer").addEventListener(
        "click",
        (e) => {
          if (e.target && e.target.matches("button")) {
            clearInterval(interval);
            timerAnimation.classList.remove("timer__progress--play");

            if (e.target.innerText === question.correctAnswer) {
              resolve([true, "Perfect, thats correct!"]);
            } else {
              resolve([false, "Wrong answer. You lost a life!"]);
            }
          }
        },
        { once: true }
      );

      if (counter < 0) {
        clearInterval(interval);
        resolve([false, "You ran out of Time"]);
      }
    }, 1000);
  });
};
