import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { useEffect } from "react";
import MusicPlayer from "./components/MusicPlayer";

function App() {

  useEffect(() => {

  }, [])

  return (
    <Router>

      <Navbar />
      
      <Routes>

        <Route path='/' element={<Home />} />

      </Routes>
      <MusicPlayer />
      <Footer />

    </Router>
  )
}

export default App
