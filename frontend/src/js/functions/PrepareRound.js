import { RenderRound } from "./RenderRound";
import { FetchQuestions } from "./FetchQuestions";

/**
 * Get question from player object or api
 * returns single question
 */

export const PrepareRound = async (player) => {
  const getQuestionsNum = 5;
  console.log(player);

  if (player.questions === null || player.num % 5 === 0) {
    const questions = await FetchQuestions(getQuestionsNum);
    player.questions = questions;

    if (player.num === 5) {
      player.num = 0;
    }
  }

  RenderRound(player);
  return player.questions[player.num];
};
