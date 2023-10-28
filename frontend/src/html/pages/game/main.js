import { StartRound } from "../../../js/functions/StartRound";

const player = {
  round: 0,
  score: 0,
  lives: 100,
  num: 0,
  questions: null,
};

(async () => {
  StartRound(player);
})();
