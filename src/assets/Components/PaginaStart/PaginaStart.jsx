import "./PaginaStart.css";
import intrebari from "../../../assets/data/intrebari.json";
import { useState, useContext, useMemo } from "react";
import { TemaContext } from "../Context/ContextTema";
import { useQuiz } from "../../hooks/useQuiz";

const selecteazaIntrebari = (categoria, nrIntrebari) => {
  let intrebariSelectate = intrebari;
  if (categoria !== "Toate") {
    intrebariSelectate = intrebari.filter((q) => q.categorie === categoria);
  }
  return intrebariSelectate
    .sort(() => Math.random() - 0.5)
    .slice(0, parseInt(nrIntrebari));
};

function PaginaStart() {
  const { schimbaTema, tema } = useContext(TemaContext);
  const { dispatch } = useQuiz();
  const [numele, setNumele] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nrIntrebari, setNrIntrebari] = useState("");
  const [timp, setTimp] = useState("");
  const [erori, setEroare] = useState({
    nume: "",
    categorie: "",
    nrIntrebari: "",
    timp: "",
  });

  const nrMaxIntrebari = useMemo(() => {
    if (categoria === "Toate") return intrebari.length;
    if (categoria)
      return intrebari.filter((q) => q.categorie === categoria).length;
    return 0;
  }, [categoria]);

  const optiuniIntrebari = useMemo(() => {
    const numere = [];
    if (nrMaxIntrebari >= 5) numere.push("5");
    if (nrMaxIntrebari >= 10) numere.push("10");
    if (nrMaxIntrebari >= 15) numere.push("15");
    if (nrMaxIntrebari >= 20) numere.push("20");
    if (nrMaxIntrebari > 0) numere.push("Toate");
    return numere;
  }, [nrMaxIntrebari]);

  const trimitere = (e) => {
    e.preventDefault();

    if (numele.trim() === "") {
      setEroare({ ...erori, nume: "Numele nu este introdus" });
      return;
    }
    if (numele.trim().length < 3) {
      setEroare({ ...erori, nume: "Numele nu are 3 caractere" });
      return;
    }
    if (!/^[a-zA-ZăâîșțĂÂÎȘȚ\s]+$/.test(numele)) {
      setEroare({ ...erori, nume: "Numele poate contine doar litere!" });
      return;
    }

    if (!categoria) {
      setEroare({ ...erori, categorie: "Selecteaza o categorie!" });
      return;
    }

    if (!nrIntrebari) {
      setEroare({ ...erori, nrIntrebari: "Selecteaza nr de intrebari!" });
      return;
    }

    if (!timp) {
      setEroare({ ...erori, timp: "Selecteaza timpul!" });
      return;
    }

    setEroare({ nume: "", categorie: "", nrIntrebari: "", timp: "" });

    const intrebariSelectate = selecteazaIntrebari(categoria, nrIntrebari);

    dispatch({
      type: "start",
      payload: {
        utilizator: numele,
        categorie: categoria,
        nrIntrebari:
          nrIntrebari === "Toate" ? nrMaxIntrebari : parseInt(nrIntrebari),

        timp: parseInt(timp),
        intrebari: intrebariSelectate,
      },
    });
  };

  return (
    <>
      <h1 className="denumire">Quiz</h1>
      <form onSubmit={trimitere}>
        <div className="numeleUtiliz">
          <label>Numele:</label>
          <input
            type="text"
            placeholder="ex: Gogu Elena"
            value={numele}
            onChange={(e) => setNumele(e.target.value)}
          />
          {erori.nume && <span style={{ color: "red" }}>{erori.nume}</span>}
        </div>
        <div className="categoriile">
          <label>Categoria</label>
          <select
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
              setNrIntrebari(""); 
            }}
          >
            <option value="">Alege categoria</option>
            <option value="Toate">Toate Categoriile</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="HTML & CSS">HTML & CSS</option>
          </select>
          {erori.categorie && (
            <span style={{ color: "red" }}>{erori.categorie}</span>
          )}
        </div>

        <div className="alegeNrDeIntreb">
          <label>Nr de intrebari</label>
          <select
            value={nrIntrebari}
            onChange={(e) => setNrIntrebari(e.target.value)}
            disabled={!categoria}
          >
            <option value="">Alege nr de intrabari</option>
            {optiuniIntrebari.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "Toate" ? "Toate" : opt + " intrebari"}
              </option>
            ))}
          </select>
          {erori.nrIntrebari && (
            <span style={{ color: "red" }}>{erori.nrIntrebari}</span>
          )}
        </div>
        <div className="alegeTimp">
          <label>Timp pentru intrebare</label>
          <select value={timp} onChange={(e) => setTimp(e.target.value)}>
            <option value="">Alege timpul</option>
            <option value="0">Nelimitat</option>
            <option value="10">10 secunde</option>
            <option value="15">15 secunde</option>
            <option value="20">20 secunde</option>
            <option value="30">30 secunde</option>
          </select>
          {erori.timp && <span style={{ color: "red" }}>{erori.timp}</span>}
        </div>
        <div className="butoanele">
          <button type="submit" className="incepeBtn">
            Incepe Quizul
          </button>
          <button type="button" className="darkLight" onClick={schimbaTema}>
            {tema === "light" ? "Light" : "Dark"}
          </button>
        </div>
      </form>
    </>
  );
}
export default PaginaStart;
