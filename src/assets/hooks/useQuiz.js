import { useContext } from "react";

import { QuizContext } from "../Components/Context/ContextQuiz";

export function useQuiz() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuiz trebuie utilizat in interiorul QuizProvider");
  }

  return context;
}
