import ContextTema from "./assets/Components/Context/ContextTema";
import QuizProvider from "./assets/Components/Context/ContextQuiz";
import PaginaDeRezultate from "./assets/Components/PaginaDeRaspuns/PaginaDeRaspuns";
import PaginaDeIntrebari from "./assets/Components/PaginaDeIntrebari/PaginaDeIntrebari";
import { useQuiz } from "./assets/hooks/useQuiz";
import PaginaStart from "./assets/Components/PaginaStart/PaginaStart";
import "./App.css";

function AfisareaPag() {
  const { stare } = useQuiz();

  if (stare.pagina === "start") return <PaginaStart />;
  if (stare.pagina === "quiz") return <PaginaDeIntrebari />;
  if (stare.pagina === "rezultate") return <PaginaDeRezultate />;
  return null;
}

function AfisareTema() {
  return (
    <div>
      <QuizProvider>
        <AfisareaPag />
      </QuizProvider>
    </div>
  );
}

function App() {
  return (
    <ContextTema>
      <AfisareTema />
    </ContextTema>
  );
}

export default App;
