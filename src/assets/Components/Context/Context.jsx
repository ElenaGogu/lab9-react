import { createContext, useReducer } from "react";

const stareInitiala = {
  pagina: "start",
  utilizator: "",
  categorie: "",
  nrIntrebari: 0,
  timp: 0,
  intrebareaCurenta: 0,
  intrebari: [],
  raspunsuri: [],
  scor: 0,
  nrCorecte: 0,
};

export const QuizContext = createContext(); 

function quizReducer(stare, actiune) {
  switch (actiune.type) {
    
    case "start":
      return {
        ...stare,
        pagina: "quiz",
        utilizator: actiune.payload.utilizator,
        categorie: actiune.payload.categorie,
        nrIntrebari: actiune.payload.nrIntrebari,
        timp: actiune.payload.timp,
      };

    case "alegeRaspuns":{ 
    const corect = actiune.payload.esteCorect;
      return {
        ...stare,
        scor: corect ? stare.scor + 1 : stare.scor,
        nrCorecte: corect ? stare.nrCorecte+1 : stare.nrCorecte,
        raspunsuri: [...stare.raspunsuri, actiune.payload],
        intrebareaCurenta: stare.intrebareCurenta + 1,
    };
  }

    case "finalizeaza":
      return { ...stare, pagina: "rezultate" };

    case "reseteaza":
      return stareInitiala;

    default:
      return stare;
  }
}

function QuizProvider({ children }) {
  const [stare, dispatch] = useReducer(quizReducer, stareInitiala);

  return (
    <QuizContext.Provider value={{ stare, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}
export default QuizProvider