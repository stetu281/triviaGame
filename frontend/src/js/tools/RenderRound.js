import { RandomizeAnswers } from "./RandomizeAnswers";

export const RenderRound = (player) => {
  const question = player.questions[player.round];

  document.querySelector("#question").innerText = player.round + 1;
  document.querySelector("#points").innerText = player.score;
  document.querySelector(".question__category").innerText = question.category;
  document.querySelector(".question__question").innerText = question.question;

  const options = RandomizeAnswers(question);

  options.forEach((answer) => {
    const btn = document.createElement("button");
    btn.classList.add("question__answer");
    btn.textContent = answer;
    document.querySelector(".question__answersContainer").appendChild(btn);
  });
};
