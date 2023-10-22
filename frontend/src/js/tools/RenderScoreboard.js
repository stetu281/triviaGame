export const RenderScoreboard = ({ scores }) => {
  /**
   * Populates scoreboard on overlay div
   */

  const top = document.querySelector(".sb__top");
  const list = document.querySelector(".sb__list");

  top.innerHTML = "";
  list.innerHTML = "";

  if (scores.length < 1) {
    top.innerText = "Scoreboard empty";
  } else {
    for (const [index, item] of scores.entries()) {
      const container = document.createElement("div");

      if (index >= 0 && index <= 2) {
        container.classList.add("sb__top3", `sb__top3--${index}`);
        container.innerHTML = `
            <img src="../assets/avatar-${item.avatar}.webp" alt="" />
            <p class="sb__top--rank">${index + 1}</p>
            <p class="sb__top--name">${item.username}</p>
            <p class="sb__top--points">${item.score} Points</p>
          `;
        top.appendChild(container);
      } else {
        container.classList.add("sb__item");
        container.innerHTML = `
            <p class="sb__item--rank">${index + 1}</p>
            <div class="sb__item--container">
              <img src="../assets/avatar-${item.avatar}.webp" />
              <p class="sb__item--name">${item.username}</p>
              <p class="sb__item--points">${item.score} P</p>
            </div>
          `;
        list.appendChild(container);
      }
    }
  }
};
