import { StartRound } from "../../../js/functions/StartRound";

const player = {
  round: 0,
  score: 0,
  lives: 3,
  questions: null,
};

(async () => {
  StartRound(player);
})();
