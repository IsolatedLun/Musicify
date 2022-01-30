import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import React, { useEffect } from "react";
import MusicPlayer from "./components/MusicPlayer";
import Browse from "./components/Browse";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Logout from "./components/auth/Logout";
import UserRouter from "./components/parts/user/UserRouter";
import Popup from "./components/layout/Popup";
import DropUp from "./components/DropUp";
import { useGetUserByTokMutation } from "./services/userServices";
import { useAuth } from "./hooks/useAuth";
import { popup } from "./misc/utils";
import ContextMenu from "./components/ContextMenu";

function App() {
  const { user } = useAuth();
  const [authedUser] = useGetUserByTokMutation();

  const fetchUser = async() => {
    try {
      await authedUser();
    }

    catch(err: any) {
      popup('User does not exist.', 'Error');
      localStorage.removeItem('tok');
    }
  }

  useEffect(() => {
    if(user === null && localStorage.getItem('tok')) {
      fetchUser()
    }
  }, [authedUser])

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
          <ContextMenu />
        </div>

        <Footer />
      </div>

    </Router>
  )
}

export default App
