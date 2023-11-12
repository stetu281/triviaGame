import { HandleErrors } from "./HandleErrors";

/**
 * returns highscores from database
 */

export const FetchScores = async (limit) => {
  try {
    const response = await fetch(`${process.env.URL}/score/${limit}`);

    if (!response.ok) {
      throw new Error(`Sorry, could not load scores.`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    HandleErrors(err);
  }
};
