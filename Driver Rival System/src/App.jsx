import './App.css'
import "./css/main.css"
import { Routes, Route, Outlet } from "react-router-dom";
import { DriverProvider } from './contexts/DriverContext.jsx'
import { TeamProvider } from './contexts/TeamContext.jsx'
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
import { TrackProvider } from './contexts/TrackContext.jsx';
function App() {

  return (
    <GlobalStateProvider>
      <NavBar></NavBar>

      <main>
        <Routes>
          <Route element={
            <DriverProvider>
              <TeamProvider>
                <TrackProvider>
                  <Outlet />
                </TrackProvider>
              </TeamProvider>
            </DriverProvider>
          }>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<DriverProvider><Outlet /></DriverProvider>}>
            <Route path="/drivers" element={<Drivers />} />
          </Route>
          <Route element={<TrackProvider><Outlet /></TrackProvider>}>
            <Route path="/tracks" element={<Tracks />} />
          </Route>
          <Route element={<TeamProvider><Outlet /></TeamProvider>}>
            <Route path="/teams" element={<Teams />} />
          </Route>
          <Route path="/info" element={<Info />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </GlobalStateProvider>
  )
}

export default App
