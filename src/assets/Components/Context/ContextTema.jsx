import useLocalStorage from "../../hooks/useLocalStorage";
import { createContext, useEffect } from "react";
import "./ContextTema.css";

export const TemaContext = createContext();

function ContextTema({ children }) {
  const [tema, setTema] = useLocalStorage("tema", "light");

  useEffect(() => {
    document.body.className = tema;
  }, [tema]);

  const schimbaTema = () => {
    setTema(tema === "light" ? "dark" : "light");
  };

  return (
    <TemaContext.Provider value={{ tema, schimbaTema }}>
      {children}
    </TemaContext.Provider>
  );
}
export default ContextTema;
