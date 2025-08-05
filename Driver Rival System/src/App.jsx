import './App.css'
import "./css/main.css"
import { Routes, Route } from "react-router-dom";
import { DriverProvider } from './contexts/DriverContext.jsx'
import Home from './pages/Home.jsx'
import Teams from './pages/Teams.jsx'
import Info from './pages/Info.jsx'
import Contact from './pages/Contact.jsx'
import Footer from './components/Footer.jsx'
import { GlobalStateProvider } from './contexts/GlobalStateContext.jsx'
import LoadingError from './pages/LoadingError.jsx'
import NavBar from "./components/Navigation/NavBar.jsx"
import Drivers from './pages/Drivers.jsx';
import Tracks from './pages/Tracks.jsx';
function App() {

  return (
    <GlobalStateProvider>
      <NavBar></NavBar>
      <DriverProvider>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/info" element={<Info />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </DriverProvider>
    </GlobalStateProvider>
  )
}

export default App
