import { FetchQuestions } from "../../../js/tools/FetchQuestions";

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
}
