import { PrepareRound } from "./PrepareRound";
import { PlayRound } from "./Playround";
import { HandleResult } from "./HandleResult";
import { RenderScoreboard } from "./RenderScoreboard";

export const StartRound = async (player) => {
  const question = await PrepareRound(player);
  const roundResult = await PlayRound(question);
  HandleResult(roundResult, player);

  const sessionData = JSON.parse(sessionStorage.scoreboard);
  RenderScoreboard(sessionData);
};
