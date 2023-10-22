export const HandleErrors = (errors) => {
  const ul = document.querySelector(".submitScore__errorList");

  ul.innerHTML = "";

  document
    .querySelector(".submitScore__error")
    .classList.add("submitScore__error--show");

  if (typeof errors === "object") {
    errors.forEach((error) => {
      const li = document.createElement("li");
      li.textContent = error.msg;
      ul.appendChild(li);
    });
  } else if (typeof errors === "string") {
    const li = document.createElement("li");
    li.textContent = errors;
    ul.appendChild(li);
  }
};
