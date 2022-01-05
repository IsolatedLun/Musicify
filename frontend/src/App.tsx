import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { useEffect } from "react";
import MusicPlayer from "./components/MusicPlayer";
import Browse from "./components/Browse";
import { toggleMusicPlayer } from "./misc/utils";

function App() {

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      const key = e.code;

      if( e.shiftKey && key === 'KeyE') {
        toggleMusicPlayer();
      }
    })
  }, [])

  return (
    <Router>

      <div className="main-container">
        <div>
          <Navbar />
          
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/browse' element={<Browse />} />

          </Routes>
          <MusicPlayer />
        </div>

        <Footer />
      </div>

    </Router>
  )
}

export default App
