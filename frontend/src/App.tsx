import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { useEffect } from "react";
import MusicPlayer from "./components/MusicPlayer";
import Browse from "./components/Browse";
import { toggleMusicPlayer } from "./misc/utils";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import { useAppDispatch } from "./hooks";
import { getUserByToken, setIsLogged } from "./features/user.slice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      const key = e.code;

      if( e.shiftKey && key === 'KeyE') {
        toggleMusicPlayer();
      }
    })

    dispatch(setIsLogged());
  }, [])

  useEffect(() => {
    dispatch(getUserByToken())
  })

  return (
    <Router>

      <div className="main-container">
        <div>
          <Navbar />
          
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/browse' element={<Browse />} />

            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<LogIn />} />

          </Routes>
          <MusicPlayer />
        </div>

        <Footer />
      </div>

    </Router>
  )
}

export default App
