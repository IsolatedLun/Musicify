import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import React, { useEffect } from "react";
import MusicPlayer from "./components/MusicPlayer";
import Browse from "./components/Browse";
import { toggleMusicPlayer } from "./misc/utils";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getUserByToken, setIsLogged } from "./features/user.slice";
import Logout from "./components/auth/Logout";
import UserRouter from "./components/parts/user/UserRouter";
import Popup from "./components/layout/Popup";
import DropUp from "./components/DropUp";
import { DROPUP_OFF, DROPUP_ON } from "./misc/consts";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user)

  useEffect(() => {
    const dropup = document.getElementById('main-dropup') as HTMLElement;

    window.addEventListener('keydown', (e) => {
      const key = e.code;

      if( e.shiftKey && key === 'KeyE') {
        toggleMusicPlayer();
      }
    })

    window.addEventListener('mousedown', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      

    })

    dispatch(setIsLogged());
  }, [])

  useEffect(() => {
    dispatch(getUserByToken())
  }, [])

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
            <Route path='/logout' element={<Logout />} />

            <Route path='user/*' element={<UserRouter user={user} />} />

          </Routes>

          <MusicPlayer user={user} />
          
          <DropUp />
          <Popup />
        </div>

        <Footer />
      </div>

    </Router>
  )
}

export default App
