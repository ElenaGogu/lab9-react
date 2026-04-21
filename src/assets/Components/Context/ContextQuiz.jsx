import { createContext, useReducer } from "react";

const stareInitiala = {
  pagina: "start",
  utilizator: "",
  categorie: "",
  nrIntrebari: 0,
  intrebareaCurenta: 0,
  intrebari: [],
  raspunsuri: [],
  scor: 0,
  streak: 0,
  streakMaxim: 0,
  timpRamas: 0,
  timp: 0,
};

export const QuizContext = createContext();

function quizReducer(stare, actiune) {
  switch (actiune.type) {
    case "start": {
      const nouaStare = {
        ...stare,
        pagina: "quiz",
        utilizator: actiune.payload.utilizator,
        categorie: actiune.payload.categorie,
        nrIntrebari: actiune.payload.nrIntrebari,
        timp: actiune.payload.timp,
        timpRamas: actiune.payload.timp,
        intrebari: actiune.payload.intrebari,
        intrebareaCurenta: 0,
        raspunsuri: [],
        scor: 0,
        streak: 0,
        streakMaxim: 0,
      };
      localStorage.setItem("stareQuiz", JSON.stringify(nouaStare));
      return nouaStare;
    }

    case "alegeRaspuns": {
      const corect = actiune.payload.esteCorect;
      const nouStreak = corect ? stare.streak + 1 : 0;
      const intrebNoua = stare.intrebareaCurenta + 1;
      const streakMaxim = Math.max(stare.streakMaxim, nouStreak);
      const nouScor = corect ? stare.scor + 1 : stare.scor;
      const sfirsit = intrebNoua >= stare.nrIntrebari;

      const nouaStare = {
        ...stare,
        scor: nouScor,
        streak: nouStreak,
        streakMaxim: streakMaxim,
        raspunsuri: [...stare.raspunsuri, actiune.payload],
        intrebareaCurenta: intrebNoua,
        pagina: sfirsit ? "rezultate" : "quiz",
        timpRamas: actiune.payload.timp,
      };

      localStorage.setItem("stareQuiz", JSON.stringify(nouaStare));

      if (sfirsit) {
        const istoric = JSON.parse(localStorage.getItem("istoric")) || [];
        const rezultatFinal = {
          utilizator: stare.utilizator,
          scor: nouScor,
          total: stare.nrIntrebari,
          procent: Math.round((nouScor / stare.nrIntrebari) * 100),
          data: new Date().toLocaleDateString(),
          streak: streakMaxim,
        };
        istoric.push(rezultatFinal);
        istoric.sort((a, b) => b.procent - a.procent);
        localStorage.setItem("istoric", JSON.stringify(istoric));
      }

      return nouaStare;
    }

    case "reseteaza":
      localStorage.removeItem("stareQuiz");
      return stareInitiala;

    default:
      return stare;
  }
}

function QuizProvider({ children }) {
  const citesteLocalStorageStart = () => {
    const salveaza = localStorage.getItem("stareQuiz");
    if (salveaza) {
      return JSON.parse(salveaza);
    }
    return stareInitiala;
  };

  const [stare, dispatch] = useReducer(quizReducer, citesteLocalStorageStart());

  return (
    <QuizContext.Provider value={{ stare, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}
export default QuizProvider;
