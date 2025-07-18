import './App.css'
import "./css/main.css"
import { DriverProvider } from './contexts/DriverContext.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import { GlobalStateProvider } from './contexts/GlobalStateContext.jsx'

function App() {

  return (
    <GlobalStateProvider>
      <DriverProvider>
        <main>
          <Home></Home>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </DriverProvider>
    </GlobalStateProvider>
  )
}

export default App
