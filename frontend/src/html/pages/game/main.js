import { FetchQuestions } from "../../../js/tools/FetchQuestions";
import { RenderRound } from "../../../js/tools/RenderRound";
import { PostData } from "../../../js/tools/PostData";

const getQuestionsNum = 5;
const player = {
  round: 0,
  score: 1000,
  lives: 0,
  questions: null,
};

(async () => {
  start();
})();

async function start() {
  const question = await PrepareRound();
  const roundResult = await PlayRound(question);
  HandleResult(roundResult);

  const sessionData = JSON.parse(sessionStorage.scoreboard);
  generateScoreboard(sessionData);
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
      gameOver();
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
          break;
      }
      createNextButton();
    }
  }
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

function gameOver() {
  document.querySelector(".gameover").classList.add("gameover--open");
  document.querySelector("#result").innerText = player.score;

  let formData = {};

  document
    .querySelector("#submitScore")
    .addEventListener("click", async (e) => {
      e.preventDefault();

      document
        .querySelector(".submitScore__error")
        .classList.remove("submitScore__error--show");
      formData.username = document.querySelector('input[name="name"]').value;
      formData.score = player.score;
      formData.avatar = document.querySelector(
        'input[name="avatar"]:checked'
      ).value;
      console.log(formData);
      const scores = await PostData(formData);

      if (scores) {
        calculateRank(scores, formData);
        generateScoreboard(scores);
      }
    });

  document.querySelector(".gameover__next").addEventListener("click", (e) => {
    if (e.target && e.target.matches("button")) {
      console.log(e.target);
      if (e.target.id === "openScoreboard") {
        document.querySelector(".sb").classList.add("sb--open");
      } else {
        window.location.replace("http://localhost:8080/game/");
      }
    }
  });

  document.querySelector(".sb__close").addEventListener("click", () => {
    document.querySelector(".sb").classList.remove("sb--open");
  });
}

function calculateRank({ scores }, data) {
  const rank = scores.findIndex((score) => score.username === data.username);

  document.querySelector(".submitScore").innerHTML = `
  <img src="../assets/avatar-${
    data.avatar
  }-1x.png" class="submitScore__avatar" alt="" />
  
  <p class="submitScore__thanks">Thanks ${data.username}</p>
  ${
    rank < 4
      ? "<p class='submitScore__congrats'>Congratulation, you made the top 3</p>"
      : ""
  }
  <p class="submitScore__rank">You ranked<br /><span>#${
    rank + 1
  }</span><br />of ${scores.length} players</p>
`;
}

function generateScoreboard({ scores }) {
  const top = document.querySelector(".sb__top");
  const list = document.querySelector(".sb__list");

  top.innerHTML = "";
  list.innerHTML = "";

  if (scores.length < 1) {
    top.innerText = "Scoreboard empty";
  } else {
    for (const [index, item] of scores.entries()) {
      const container = document.createElement("div");

      if (index >= 0 && index <= 2) {
        container.classList.add("sb__top3", `sb__top3--${index}`);
        container.innerHTML = `
          <img src="../assets/avatar-${item.avatar}-2x.png" alt="" />
          <p class="sb__top--rank">${index + 1}</p>
          <p class="sb__top--name">${item.username}</p>
          <p class="sb__top--points">${item.score}</p>
        `;
        top.appendChild(container);
      } else {
        container.classList.add("sb__item");
        container.innerHTML = `
          <p class="sb__item--rank">${index + 1}</p>
          <div class="sb__item--container">
            <img src="../assets/avatar-${item.avatar}-2x.png" />
            <p class="sb__item--name">${item.username}</p>
            <p class="sb__item--points">${item.score} P</p>
          </div>
        `;
        list.appendChild(container);
      }
    }
  }
}
