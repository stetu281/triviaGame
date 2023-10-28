import { FetchScores } from "../../../js/functions/FetchScores";
const avatars = importAll(
  require.context("../../../assets/images/avatars", false, /\.(png)$/)
);

(async () => {
  const data = await FetchScores("all");
  sessionStorage.setItem("scoreboard", JSON.stringify(data));
  renderTopScores(data);
})();

document.querySelector(".home__info").addEventListener("click", (e) => {
  const overlay = document.querySelector(".info");
  overlay.classList.toggle("info--hide");
  if (overlay.classList.contains("info--hide")) {
    e.target.innerHTML = `<svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 27.2V20M20 12.8H20.018M38 20C38 29.9411 29.9411 38 20 38C10.0589 38 2 29.9411 2 20C2 10.0589 10.0589 2 20 2C29.9411 2 38 10.0589 38 20Z"
      stroke="white"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`;
  } else {
    e.target.innerHTML = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 38C29.9411 38 38 29.9411 38 20C38 10.0589 29.9411 2 20 2C10.0589 2 2 10.0589 2 20C2 29.9411 10.0589 38 20 38Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="12.8286" y="10" width="24.8581" height="4" rx="2" transform="rotate(45 12.8286 10)" fill="white"/>
    <rect x="10.5542" y="27.632" width="24.8581" height="4" rx="2" transform="rotate(-45 10.5542 27.632)" fill="white"/>
    </svg>`;
  }
});

function renderTopScores({ scores }) {
  const container = document.querySelector(".home__scoreContainer");

  for (let i = 0; i < 3; i++) {
    let div = document.createElement("div");
    div.className = "home__singleScore";
    div.innerHTML = `
            <img src="assets/avatar-${scores[i].avatar}.webp" class="home__singleScore--img" alt="Avatar" width="96px" height="96px" /><p class="home__singleScore--name">${scores[i].username}</p><p class="home__singleScore--score">${scores[i].score} Points</p>
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
