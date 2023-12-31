import { PostData } from "./PostData";
import { RenderRank } from "./RenderRank";
import { RenderScoreboard } from "./RenderScoreboard";

export const HandleGameOver = (player) => {
  /**
   * Creates object to post to database
   * Adds eventlistener to buttons on gameover overlay
   */

  document.querySelector(".gameover").classList.add("gameover--open");
  document.querySelector("#result").innerText = player.score;

  if (player.score === 0) {
    document.querySelector(".submitScore").innerHTML =
      "<p>Thank for playing.<br />Try again and score some points to add your name to the scoreboard.</p>";
  } else {
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
        const scores = await PostData(formData);

        if (scores) {
          RenderRank(scores, formData);
          RenderScoreboard(scores);
        }
      });
  }

  document.querySelector(".gameover__next").addEventListener("click", (e) => {
    if (e.target && e.target.matches("button")) {
      if (e.target.id === "openScoreboard") {
        document.querySelector(".sb").classList.add("sb--open");
      } else {
        window.location.replace("https://stefanturner.ch/projects/trivia/");
      }
    }
  });

  document.querySelector(".sb__close").addEventListener("click", () => {
    document.querySelector(".sb").classList.remove("sb--open");
  });
};
