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
  start();
})();

async function start() {
  const question = await PrepareRound();
  const roundResult = await PlayRound(question);
  HandleResult(roundResult);
}

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
}

function HandleResult(result) {
  const resultContainer = document.querySelector(".question__resultContainer");
  player.round++;
  const msg = document.createElement("p");
  msg.classList.add("question__resultMessage");
  msg.innerText = result[1];
  resultContainer.appendChild(msg);

  if (result[0]) {
    switch (player.lives) {
      case 3:
        player.score += 10;
        break;
      case 2:
        player.score += 8;
        break;
      case 1:
        player.score += 6;
        break;
    }

    createNextButton();
  } else {
    if (player.lives <= 1) {
      console.log("game over");
    } else {
      player.lives--;
      switch (player.lives) {
        case 2:
          document
            .querySelector(".header__lifesContainer svg:nth-child(1)")
            .classList.add("hide");
          break;
        case 1:
          document
            .querySelector(".header__lifesContainer svg:nth-child(2)")
            .classList.add("hide");
      }
      createNextButton();
    }
  }

  console.log(player);
}

function createNextButton() {
  const btn = document.createElement("button");
  btn.classList.add("question__next");
  btn.innerText = "Next Question";
  document.querySelector(".question__resultContainer").appendChild(btn);

  btn.addEventListener(
    "click",
    () => {
      document.querySelector(".question__answersContainer").innerHTML = "";
      document.querySelector(".question__resultContainer").innerHTML = "";
      start();
    },
    { once: true }
  );
}
