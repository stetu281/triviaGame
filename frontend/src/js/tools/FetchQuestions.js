export const FetchQuestions = async (num) => {
  const data = [
    {
      category: "Music",
      id: "622a1c397cc59eab6f950ce6",
      correctAnswer: "Queen",
      incorrectAnswers: ["Deep Purple", "Feeder", "Led Zeppelin"],
      question: "Which British rock band released the album 'Innuendo'?",
      tags: ["music"],
      type: "Multiple Choice",
      difficulty: "hard",
      regions: [],
      isNiche: false,
    },
    {
      category: "Geography",
      id: "623374c5460f87b3e0e71850",
      correctAnswer: "Sheltered harbor",
      incorrectAnswers: ["Bright Sun", "Golden Shores", "Trading Post"],
      question: 'What is the meaning of "Honolulu"?',
      tags: ["words", "language", "usa", "geography"],
      type: "Multiple Choice",
      difficulty: "hard",
      regions: [],
      isNiche: false,
    },
    {
      category: "Society & Culture",
      id: "645fcc89541c4d4fc8cf308b",
      correctAnswer: "Disbar",
      incorrectAnswers: ["Debrief", "Devalue", "Disown"],
      question:
        "What is the term meaning to take away someone's license to practice law?",
      tags: ["law", "words", "society_and_culture"],
      type: "Multiple Choice",
      difficulty: "medium",
      regions: [],
      isNiche: false,
    },
    {
      category: "Geography",
      id: "622a1c357cc59eab6f94fdf6",
      correctAnswer: "Tasman",
      incorrectAnswers: ["Zeelandic", "Coral", "Solomon"],
      question: "Which sea is located between Australia and New Zealand?",
      tags: ["bodies_of_water", "geography"],
      type: "Multiple Choice",
      difficulty: "hard",
      regions: [],
      isNiche: false,
    },
    {
      category: "Food & Drink",
      id: "624ab09d348a461bfc670688",
      correctAnswer: "Africa",
      incorrectAnswers: ["North America", "Central America", "Europe"],
      question: "Where in the world are artichokes originally from?",
      tags: ["food_and_drink"],
      type: "Multiple Choice",
      difficulty: "hard",
      regions: [],
      isNiche: false,
    },
  ];

  return data;
  /* const response = await fetch(
    `https://the-trivia-api.com/api/questions?limit=${num}`
  );

  const questions = await response.json();
  return questions; */
};
