import { StartRound } from "../../../js/functions/StartRound";

(async () => {
  const player = {
    round: 0,
    score: 0,
    lives: 3,
    num: 0,
    questions: null,
  };

  StartRound(player);
})();
