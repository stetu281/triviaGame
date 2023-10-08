import { HandleErrors } from "./HandleErrors";

export const PostData = async (formData) => {
  try {
    const response = await fetch("http://localhost:8888/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.status === 500) {
      throw new Error("Sorry, something went wrong, please try again");
    } else if (response.status === 400) {
      HandleErrors(await data.errors);
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
