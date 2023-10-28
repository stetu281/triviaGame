import { HandleErrors } from "./HandleErrors";

export const FetchQuestions = async (num) => {
  try {
    const response = await fetch(
      `https://the-trivia-api.com/api/questions?limit=${num}`
    );

    if (!response.ok) {
      throw new Error("Sorry, could not load questions. Please reload.");
    }

    const questions = await response.json();
    return questions;
  } catch (error) {
    HandleErrors(error);
  }
};
