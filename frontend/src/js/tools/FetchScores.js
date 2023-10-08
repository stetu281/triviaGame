export const FetchScores = async (limit) => {
  console.log(limit);

  try {
    const response = await fetch(`http://localhost:8888/api/score/${limit}`);

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
