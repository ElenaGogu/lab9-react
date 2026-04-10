import { useState } from "react";

function directLiteraMare(valoare) {
    return valoare.charAt(0).toUpperCase() + valoare.slice(1).toLowerCase();
}

function PaginaStart(){
    const [numele, setNumele] = useState("");
    const [categoria, setCategoria] = useState("Toate Categoriile");
    const [nrIntrebari, setNrIntrebari] = useState("15 intrebari");
    const [timp, setTimp] = useState("15 secunde");
    const [erori, setEroare] = useState({
        nume: "",
        categorie: "",
        nrIntrebari: "",
        timp: ""

    });

    const trimitere = (e) => {
        e.preventDefault();
        const verifNume = numele.trim() === "" ? setEroare({...erori, numele: "Nu este introdus numele"}) : setEroare("");
        if (numele.trim() === ""){
            setEroare({...erori, numele: "Numele nu este introdus"});
            return;
        }
        if (numele.trim().length < 3){
            setEroare({...erori, numele: "Numele nu are 3 caractere"});
            return;
        }
        if (!/^[a-zA-ZăâîșțĂÂÎȘȚ\s]+$/.test(numele)) {
            setEroare({...erori, numele: "Numele poate contine doar litere!"});
            return;
        }

        if (!categoria) {
        setEroare({...erori, categorie: "Selecteaza o categorie!"});
        return;
        }

        if (!nrIntrebari) {
        setEroare({...erori, nrIntrebari: "Selecteaza categoria!"});
        return;
        }

        if (!timp) {
        setEroare({...erori, timp: "Selecteaza timpul!"});
        return;
        }
        
        setEroare("");
        
        console.log({numele, categoria, nrIntrebari, timp, erori});

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
                    <option value="Toate">Toate Categoriile</option>
                    <option value="React">React</option>
                    <option value="Java Script">Java script</option>
                    <option value= "HTML">HTML</option>
                </select>
                {erori.categorie && <span style={{ color: "red" }}>{erori.categorie}</span>}
            </div>
            <div className="alegeNrDeIntreb">
                <label>Nr de intrebari</label>
                <select
                    value={nrIntrebari}
                    onChange={(e) => setNrIntrebari(e.target.value)}>
                    <option>15 intrebari</option>
                    <option>25 intrebari</option>
                    <option>35 intrebari</option>
                    <option>45 intrebari</option>
                </select>
                {erori.nrIntrebari && <span style={{ color: "red" }}>{erori.nrIntrebari}</span>}
            </div>
            <div className="alegeTimp">
                <label>Timp pentru intrebare</label>
                <select
                    value={timp}
                    onChange={(e) => setTimp(e.target.value)}>
                    <option value="15">15 secunde</option>
                    <option value="20">20 secunde</option>
                    <option value="25">25 secunde</option>
                    <option value="30">30 secunde</option>
                </select>
                {erori.timp && <span style={{ color: "red" }}>{erori.timp}</span>}
            </div>
            <div className="butoanele">
                <button type="submit" className="incepeBtn">Incepe Quizul</button>
                <button type="submit"className="darkLight">Schimba tema</button>
            </div>
        </form>
        </>
    )
}
export default PaginaStart