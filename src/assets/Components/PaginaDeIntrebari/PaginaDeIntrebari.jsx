import useTimer from "../../hooks/useTimer";
import { QuizContext } from "../Context/ContextQuiz";
import React, {
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useState,
} from "react";
import "./PaginaDeIntrebari.css";
function PaginaDeIntrebari() {
  const { stare, dispatch } = useContext(QuizContext);
  const { timp, resetTimp } = useTimer(stare.timp);
  const [blochez, setBlochez] = useState(false);
  const [raspunsAles, setRaspunsAles] = useState(null);
  const [statusRaspuns, setStatusRaspuns] = useState(null);

  const intrebare = useMemo(() => {
    return stare.intrebari ? stare.intrebari[stare.intrebareaCurenta] : null;
  }, [stare.intrebari, stare.intrebareaCurenta]);

  const alegeRaspuns = useCallback(
    (optiune) => {
      if (blochez || !intrebare) {
        return;
      }

      const esteCorect = optiune === intrebare.raspunsCorect;

      setRaspunsAles(optiune);
      setStatusRaspuns(esteCorect ? "corect" : "gresit");
      setBlochez(true);

      setTimeout(() => {
        dispatch({
          type: "alegeRaspuns",
          payload: {
            intrebare: intrebare.intrebare,
            raspunsAles: optiune || "Timp expirat",
            esteCorect: esteCorect,
            raspunsCorect: intrebare.raspunsCorect,
            categorie: intrebare.categorie,
            dificultate: intrebare.dificultate,
            timp: timp,
          },
        });

        setRaspunsAles(null);
        setStatusRaspuns(null);
        setBlochez(false);
        resetTimp();
      }, 1500);
    },

    [intrebare, dispatch, timp, resetTimp, blochez],
  );
  useEffect(() => {
    if (timp === 0 && intrebare && !blochez && stare.timp !== 0) {
      alegeRaspuns(null);
    }
  }, [timp, intrebare, alegeRaspuns, blochez, stare.timp]);

  if (!intrebare) {
    return <div>Se incarca...</div>;
  }

  const culoare = (optiune) => {
    if (raspunsAles === optiune && statusRaspuns === "corect") {
      return "btnCorect";
    }
    if (raspunsAles === optiune && statusRaspuns === "gresit") {
      return "btnGresit";
    }

    if (statusRaspuns === "gresit" && optiune === intrebare.raspunsCorect) {
      return "btnGresitArataRas";
    }

    return "btnNeapasat";
  };

  return (
    <div className="paginaIntrebari">
      <h3>
        Intrebarea {stare.intrebareaCurenta + 1} din {stare.nrIntrebari}
      </h3>
      {stare.streak >= 2 && <div>streak: {stare.streak} </div>}
      <div>
        {stare.timp === 0 ? <p>Nelimitat</p> : <p>TimpRamas: {timp}s</p>}
      </div>
      <div>Intrebare: {intrebare.intrebare}</div>
      <div>Categorie: {intrebare.categorie}</div>
      <div>Dificultate: {intrebare.dificultate}</div>
      <div className="butoane">
        {intrebare.optiuni.map((optiune, index) => (
          <button
            key={index}
            className={culoare(optiune)}
            onClick={() => alegeRaspuns(optiune)}
            disabled={blochez}
          >
            {optiune}
          </button>
        ))}
      </div>
      <div>
        Scor: {stare.scor}/{stare.nrIntrebari}
      </div>
      {statusRaspuns === "corect" && <div className="feedbCorect">Corect!</div>}
      {statusRaspuns === "gresit" && <div className="feedbGresit">Gresit!</div>}
    </div>
  );
}

export default React.memo(PaginaDeIntrebari);
