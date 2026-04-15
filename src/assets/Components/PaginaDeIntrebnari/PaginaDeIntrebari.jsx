import React, { useContext } from "react";
import { QuizContext } from "../Context/Context";
function PaginaDeIntrebari() {
  const { stare, dispatch } = useContext(QuizContext);

  const intrebare = stare.intrebari ? stare.intrebari[stare.intrebareaCurenta] : null;

  if (!intrebare) {
    dispatch({ type: "finalizeaza" });
    return null;
  }

  function alegeRaspuns(optiune) {
    const esteCorect = (optiune === intrebare.raspunsCorect);

    dispatch({
      type: "alegeRaspuns",
      payload: {
        intrebare: intrebare.intrebare,
        raspunsAles: optiune,
        esteCorect
      }
    });
  }

  return (
    <div className="PaginaIntrebari">
      <h3>
        Intrebarea {stare.intrebareaCurenta + 1} din {stare.nrIntrebari}
      </h3>
      <div>Intrebare: {intrebare.intrebare}</div>
      <div>Categorie: {intrebare.categorie}</div>
      <div>Dificultate: {intrebare.dificultate}</div>
      <div>
        {intrebare.optiuni.map((optiune, index) => (
          <button key={index} onClick={() => alegeRaspuns(optiune)}>
            {optiune}
          </button>
        ))}
      </div>
      <div>Scor: {stare.scor}</div>
      <div>Raspunsuri corecte: {stare.nrCorecte}</div>
    </div>
  );
}

export default PaginaDeIntrebari;