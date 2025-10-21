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
import NavBar from "./components/Navigation/NavBar.jsx"
import Drivers from './pages/Drivers.jsx';
import Tracks from './pages/Tracks.jsx';
import { TrackProvider } from './contexts/TrackContext.jsx';
import Curve from "./components/BackgroundElements/Curve.jsx";
import Shape from './components/BackgroundElements/Shape.jsx';
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

        <Curve option={0} className="bg-svg-element" style={{ top: "22%", left: "0%", rotate: "90deg" }} />
        <Curve option={1} className="bg-svg-element" style={{ top: "30%", left: "80%", rotate: "-90deg" }} />
        <Curve option={2} className="bg-svg-element" style={{ top: "70%", left: "2%", rotate: "0deg" }} />
        <Curve option={0} className="bg-svg-element" style={{ top: "88%", left: "88%", rotate: "-90deg" }} />
        <Shape option={0} className="bg-svg-element" style={{ top: "67%", left: "88%", rotate: "8deg" }} />
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </GlobalStateProvider>
  )
}

export default App
