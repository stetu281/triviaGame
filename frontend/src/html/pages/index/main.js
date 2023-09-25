import { FetchScores } from "../../../js/tools/FetchScores";
const avatars = importAll(
  require.context("../../../assets/images/avatars", false, /\.(png)$/)
);

(async () => {
  const data = await getTopScores();
  renderTopScores(data);
})();

async function getTopScores() {
  const data = await FetchScores(3);
  return data;
}

function renderTopScores({ scores }) {
  const container = document.querySelector(".home__scoreContainer");

  for (let i = 0; i < scores.length; i++) {
    let div = document.createElement("div");
    div.className = "home__singleScore";
    div.innerHTML = `
            <img src="assets/avatar-${scores[i].avatar}-1x.png" /><p>${scores[i].username}</p><p>${scores[i].score}</p>
        `;
    container.appendChild(div);
  }
}

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
