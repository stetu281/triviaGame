import { StartRound } from "./StartRound";
import { HandleGameOver } from "./HandleGameOver";

export const HandleResult = (result, player) => {
  /**
   * Handles scorecount
   * Handles lives
   * Generates button for next question
   */

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

    createNextButton(player);
  } else {
    if (player.lives <= 1) {
      HandleGameOver(player);
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
      createNextButton(player);
    }
  }
};

function createNextButton(player) {
  const btn = document.createElement("button");
  btn.classList.add("question__next");
  btn.innerText = "Next Question";
  document.querySelector(".question__resultContainer").appendChild(btn);

  btn.addEventListener(
    "click",
    () => {
      document.querySelector(".question__answersContainer").innerHTML = "";
      document.querySelector(".question__resultContainer").innerHTML = "";
      StartRound(player);
    },
    { once: true }
  );
}
