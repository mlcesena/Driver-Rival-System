import './App.css'
import "./css/main.css"
import { DriverProvider } from './contexts/DriverContext.jsx'
import Home from './pages/Home.jsx'

function App() {

  return (
    <DriverProvider>
      <main>
        <Home></Home>
      </main>
    </DriverProvider>
  )
}

export default App
