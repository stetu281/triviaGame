export const RenderRank = ({ scores }, data) => {
  const rank = scores.findIndex((score) => score.username === data.username);

  document.querySelector(".submitScore").innerHTML = `
    <img src="../assets/avatar-${
      data.avatar
    }.webp" class="submitScore__avatar" alt="" />
    
    <p class="submitScore__thanks">Thanks ${data.username}</p>
    ${
      rank < 4
        ? "<p class='submitScore__congrats'>Congratulation, you made the top 3</p>"
        : ""
    }
    <p class="submitScore__rank">You ranked<br /><span>#${
      rank + 1
    }</span><br />of ${scores.length} players</p>
  `;
};
