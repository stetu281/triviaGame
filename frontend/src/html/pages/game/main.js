import { FetchQuestions } from "../../../js/tools/FetchQuestions";
import { RenderRound } from "../../../js/tools/RenderRound";

const getQuestionsNum = 5;
const player = {
  round: 0,
  score: 0,
  lives: 3,
  questions: null,
};

(async () => {
  const question = await PrepareRound();
  const roundResult = await PlayRound(question);
  HandleResult(roundResult);
})();

//******Function -- prepare game round******
async function PrepareRound() {
  //get new questions from API if no questions in player object or all played
  if (player.questions === null || player.round % getQuestionsNum === 0) {
    const questions = await FetchQuestions(getQuestionsNum);
    player.questions = questions;
  }

  RenderRound(player);
  return player.questions[player.round];
}

//******Function -- wait for player answer or timer end******
async function PlayRound(question) {
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
              resolve(true);
            } else {
              resolve(false);
            }
          }
        },
        { once: true }
      );

      if (counter < 0) {
        clearInterval(interval);
        resolve(false);
      }
    }, 1000);
  });
}

function HandleResult(result) {
  const resultContainer = document.querySelector(".question__resultContainer");

  player.round++;
}
