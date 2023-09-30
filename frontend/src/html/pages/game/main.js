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
  PrepareRound();
})();

async function PrepareRound() {
  //get new questions from API if no questions in player object or all played
  if (player.questions === null || player.round % getQuestionsNum === 0) {
    const questions = await FetchQuestions(getQuestionsNum);
    player.questions = questions;
    console.log("newwwwww");
  }

  RenderRound(player);

  //hide get ready overlay and start timeranimation
  setTimeout(() => {
    document.querySelector(".prep").classList.add("prep--hide");
    document
      .querySelector(".timer__progress")
      .classList.add("timer__progress--play");
  }, 3000);
}
