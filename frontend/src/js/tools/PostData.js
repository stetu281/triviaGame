export const PostData = async (formData) => {
  try {
    const response = await fetch("http://localhost:8888/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
