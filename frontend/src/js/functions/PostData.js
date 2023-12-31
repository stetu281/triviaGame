import { HandleErrors } from "./HandleErrors";
import { FetchScores } from "./FetchScores";

/**
 * Post player name, avatar and score to database
 * Handle loader animation on submitscore button
 * returns highscores from database
 */

export const PostData = async (formData) => {
  const loader = document.querySelector(".loader");

  loader.classList.remove("loader--hide");

  try {
    const response = await fetch(`${process.env.URL}/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.status === 500) {
      throw new Error("Sorry, something went wrong, please try again");
    } else if (response.status >= 400 && response.status <= 499) {
      throw data.errors;
    } else {
      loader.classList.add("loader--hide");

      document.querySelector(".submitScore").innerHTML = `
      <p class="submitScore__added">Score added<br />
      loading result</p>
      <svg
          class="loader"
          id="loader"
          width="152"
          height="152"
          viewBox="0 0 152 152"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="76" cy="12" r="12" fill="white" />
          <circle cx="123" cy="33" r="12" fill="white" />
          <circle cx="140" cy="76" r="12" fill="white" />
          <circle cx="123" cy="119" r="12" fill="white" />
          <circle cx="76" cy="140" r="12" fill="white" />
          <circle cx="29" cy="119" r="12" fill="white" />
          <circle cx="12" cy="76" r="12" fill="white" />
          <circle cx="29" cy="33" r="12" fill="white" />
        </svg>
    `;

      const scores = await FetchScores("all");
      return scores;
    }
  } catch (error) {
    loader.classList.add("loader--hide");
    HandleErrors(error);
  }
};
