import { HandleErrors } from "./HandleErrors";

export const PostData = async (formData) => {
  const loader = document.querySelector(".loader");

  loader.classList.remove("loader--hide");

  try {
    const response = await fetch("http://localhost:8888/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.status === 500) {
      throw new Error("Sorry, something went wrong, please try again");
    } else if (response.status === 400 || response.status === 422) {
      HandleErrors(await data.errors);
    }

    loader.classList.add("loader--hide");
  } catch (error) {
    loader.classList.add("loader--hide");
    console.log(error);
  }
};
