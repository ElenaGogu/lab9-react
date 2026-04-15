import { useState } from "react";

function directLiteraMare(valoare) {
    return valoare.toLowerCase();
}

function PaginaStart(){
    const [numele, setNumele] = useState("");
    const [categoria, setCategoria] = useState("");
    const [nrIntrebari, setNrIntrebari] = useState("");
    const [timp, setTimp] = useState("");
    const [erori, setEroare] = useState({
        nume: "",
        categorie: "",
        nrIntrebari: "",
        timp: ""

    });

    const trimitere = (e) => {
        e.preventDefault();
        
        if (numele.trim() === ""){
            setEroare({...erori, nume: "Numele nu este introdus"});
            return;
        }
        if (numele.trim().length < 3){
            setEroare({...erori, nume: "Numele nu are 3 caractere"});
            return;
        }
        if (!/^[a-zA-ZăâîșțĂÂÎȘȚ\s]+$/.test(numele)) {
            setEroare({...erori, nume: "Numele poate contine doar litere!"});
            return;
        }

        if (!categoria) {
        setEroare({...erori, categorie: "Selecteaza o categorie!"});
        return;
        }

        if (!nrIntrebari) {
        setEroare({...erori, nrIntrebari: "Selecteaza nr de intrebari!"});
        return;
        }

        if (!timp) {
        setEroare({...erori, timp: "Selecteaza timpul!"});
        return;
        }

        setEroare({nume:"", categorie:"", nrIntrebari:"", timp:""});
        console.log({numele, categoria, nrIntrebari, timp});

        setNumele(directLiteraMare(numele));
    }
    
    return(
        <>
        <h1 className="denumire">Quiz</h1>
        <form onSubmit={trimitere}>
            <div className="numeleUtiliz">
                <label>Numele:</label>
                <input
                type="text"
                placeholder = "ex: Gogu Elena"
                value={numele}
                onChange={(e)=>setNumele(e.target.value)}
                />
                {erori.nume && <span style={{ color: "red" }}>{erori.nume}</span>}
            </div>
            <div className="categoriile">
                <label>Categoria</label>
    
                <select 
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}>
                    <option value="">Alege categoria</option>
                    <option value="React">React</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value= "HTML & CSS">HTML & CSS</option>
                </select>
                {erori.categorie && <span style={{ color: "red" }}>{erori.categorie}</span>}
            </div>
            <div className="alegeNrDeIntreb">
                <label>Nr de intrebari</label>
                <select
                    value={nrIntrebari}
                    onChange={(e) => setNrIntrebari(e.target.value)}>
                    <option value="">Alege nr de intrabari</option>
                    <option value="15">15 intrebari</option>
                    <option value="25">25 intrebari</option>
                    <option value="35">35 intrebari</option>
                    <option value="45">45 intrebari</option>
                </select>
                {erori.nrIntrebari && <span style={{ color: "red" }}>{erori.nrIntrebari}</span>}
            </div>
            <div className="alegeTimp">
                <label>Timp pentru intrebare</label>
                <select
                    value={timp}
                    onChange={(e) => setTimp(e.target.value)}>
                    <option value="">Alege timpul</option>
                    <option value="15">15 secunde</option>
                    <option value="20">20 secunde</option>
                    <option value="25">25 secunde</option>
                    <option value="30">30 secunde</option>
                </select>
                {erori.timp && <span style={{ color: "red" }}>{erori.timp}</span>}
            </div>
            <div className="butoanele">
                <button type="submit" className="incepeBtn">Incepe Quizul</button>
                <button type="button"className="darkLight">Schimba tema</button>
            </div>
        </form>
        </>
    )
}
export default PaginaStart