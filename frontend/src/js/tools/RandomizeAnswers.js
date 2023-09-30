export const RandomizeAnswers = (answers) => {
  let arr = [...answers.incorrectAnswers];
  arr.splice(RandomInt(0, 3), 0, answers.correctAnswer);

  return ShuffleArray(arr);
};

export const RandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const ShuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
};
