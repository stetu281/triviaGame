import { RenderRound } from "./RenderRound";
import { FetchQuestions } from "./FetchQuestions";

/**
 * Get question from player object or api
 * returns single question
 */

export const PrepareRound = async (player) => {
  const getQuestionsNum = 5;

  if (player.questions === null || player.round % getQuestionsNum === 0) {
    const questions = await FetchQuestions(getQuestionsNum);
    player.questions = questions;
  }

  RenderRound(player);
  return player.questions[player.round];
};
