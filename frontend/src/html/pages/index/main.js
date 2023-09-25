import { FetchScores } from "../../../js/tools/FetchScores";
const avatars = importAll(
  require.context("../../../assets/images/avatars", false, /\.(png)$/)
);

(async () => {
  const data = await FetchScores(3);
  renderTopScores(data);
})();

function renderTopScores({ scores }) {
  const container = document.querySelector(".home__scoreContainer");

  for (let i = 0; i < scores.length; i++) {
    let div = document.createElement("div");
    div.className = "home__singleScore";
    div.innerHTML = `
            <img src="assets/avatar-${scores[i].avatar}-1x.png" class="home__singleScore--img" /><p class="home__singleScore--name">${scores[i].username}</p><p class="home__singleScore--score">${scores[i].score} Points</p>
        `;
    container.appendChild(div);
    document.querySelector("#loader").classList.add("loader--hide");
  }
}

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
