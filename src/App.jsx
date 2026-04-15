import PaginaStart from './assets/Components/PaginaStart/PaginaStart'
import './App.css'
import PaginaDeIntrebari from './assets/Components/PaginaDeIntrebnari/PaginaDeIntrebari'
import QuizProvider from './assets/Components/Context/Context'
function App() {
 
  return (
    <QuizProvider>
      <PaginaStart />
      <PaginaDeIntrebari />
    </QuizProvider>
    
  )
}

export default App
