import { FetchQuestions } from "../../../js/tools/FetchQuestions";
import { RenderRound } from "../../../js/tools/RenderRound";

const player = {
  round: 0,
  score: 0,
  lives: 3,
  questions: null,
};

(async () => {
  PrepareRound();

  setTimeout(() => {
    document.querySelector(".prep").classList.add("prep--hide");
    document
      .querySelector(".timer__progress")
      .classList.add("timer__progress--play");
  }, 3000);
})();

async function PrepareRound() {
  const questions = await FetchQuestions(5);
  player.questions = questions;

  RenderRound(player);
}
