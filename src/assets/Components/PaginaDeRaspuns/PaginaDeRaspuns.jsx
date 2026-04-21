import { useContext, useState, useMemo } from "react";
import { QuizContext } from "../Context/ContextQuiz";
import "./PaginaDeRaspuns.css";
function calculeazaProcent(scor, total) {
  if (total === 0) return 0;
  return Math.round((scor / total) * 100);
}
function PaginaDeRaspuns() {
  const { stare, dispatch } = useContext(QuizContext);
  const [afisare, setAfisare] = useState("toate");
  const [categorieFiltrate, setCategorieFiltrate] = useState("toate");

  const istoric = useMemo(() => {
    return JSON.parse(localStorage.getItem("istoric")) || [];
  }, []);

  const procent = useMemo(() => {
    return calculeazaProcent(stare.scor, stare.nrIntrebari);
  }, [stare.scor, stare.nrIntrebari]);

  const raspunsuriPeCategorie = useMemo(() => {
    const stats = {};

    stare.raspunsuri.forEach((raspuns) => {
      const categorie = raspuns.categorie;

      if (!stats[categorie]) {
        stats[categorie] = { corecte: 0, total: 0 };
      }

      stats[categorie].total++;
      if (raspuns.esteCorect) {
        stats[categorie].corecte++;
      }
    });

    return stats;
  }, [stare.raspunsuri]);

  const categorii = Object.keys(raspunsuriPeCategorie);

  const raspunsuriAfisate = useMemo(() => {
    let raspunsuri = [...stare.raspunsuri];

    if (afisare === "corecte") {
      raspunsuri = raspunsuri.filter((r) => r.esteCorect === true);
    }
    if (afisare === "gresite") {
      raspunsuri = raspunsuri.filter((r) => r.esteCorect === false);
    }

    if (categorieFiltrate !== "toate") {
      raspunsuri = raspunsuri.filter((r) => r.categorie === categorieFiltrate);
    }

    return raspunsuri;
  }, [stare.raspunsuri, afisare, categorieFiltrate]);

  const reseteaza = () => {
    dispatch({ type: "reseteaza" });
  };

  return (
    <div className="rezultate">
      <h1>Rezultate</h1>

      <div className="scor">
        <h2>
          {stare.scor} / {stare.nrIntrebari} ({procent}%)
        </h2>
        <p>{stare.utilizator}</p>
        <p>streak{stare.streakMaxim}</p>
      </div>

      <div className="afisareBtn">
        <button
          className={afisare === "toate" ? "activ" : ""}
          onClick={() => setAfisare("toate")}
        >
          Toate
        </button>
        <button
          className={afisare === "corecte" ? "activ" : ""}
          onClick={() => setAfisare("corecte")}
        >
          Corecte
        </button>
        <button
          className={afisare === "gresite" ? "activ" : ""}
          onClick={() => setAfisare("gresite")}
        >
          Gresite
        </button>
      </div>

      <div className="breakdown">
        <h2>Scor per categorie:</h2>
        {categorii.map((categorie) => {
          const rezultate = raspunsuriPeCategorie[categorie];
          const procentCategorie = calculeazaProcent(
            rezultate.corecte,
            rezultate.total,
          );
          return (
            <div key={categorie}>
              <span>{categorie}: </span>
              <span>
                {rezultate.corecte}/{rezultate.total}
              </span>
              <span>({procentCategorie}%)</span>
            </div>
          );
        })}
      </div>

      <div>
        <select
          value={categorieFiltrate}
          onChange={(e) => setCategorieFiltrate(e.target.value)}
        >
          <option value="toate">Toate categoriile</option>
          {categorii.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="raspunsuri">
        {raspunsuriAfisate.map((raspuns, index) => (
          <div
            key={index}
            className={raspuns.esteCorect ? "card corect" : "card gresit"}
          >
            <p>
              <strong>Intrebarea:</strong> {raspuns.intrebare}
            </p>
            <p>
              <strong>Raspunsul ales:</strong> {raspuns.raspunsAles}
            </p>
            {!raspuns.esteCorect && (
              <p>
                <strong>Corect:</strong> {raspuns.raspunsCorect}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="istoric">
        <h3>Scoruri</h3>
        <table className="tabelIstoric">
          <thead>
            <tr>
              <th>Utilizator</th>
              <th>Scor</th>
              <th>Procent</th>
              <th>Streak</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {istoric.slice(0, 10).map((s, i) => (
              <tr key={i}>
                <td>{s.utilizator}</td>
                <td>
                  {s.scor}/{s.total}
                </td>
                <td className="procent">{s.procent}%</td>
                <td>{s.streak}</td>
                <td>{s.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={reseteaza} className="reseteazaBtn">
        Reseteaza
      </button>
    </div>
  );
}

export default PaginaDeRaspuns;
