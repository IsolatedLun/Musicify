import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { User } from '../../../misc/interfaces';
import Upload from '../upload/Upload';
import UploadSong from '../upload/UploadSong';
import UserHeader from './UserHeader';
import UserHome from './UserHome';
import UserSettings from './UserSettings';

const UserRouter = ({ user }: { user: User | null }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(user === null)
            navigate('/login');
    }, [])

    return (
        <div className="user-container">
            <UserHeader />
            <Routes>
                <Route path='/' element={<UserHome user={user} />} />
                <Route path='songs' element={<h1>User songs</h1>}/>
                <Route path='albums' element={<h1>User albums</h1>}/>
                <Route path='settings' element={<UserSettings user={user} />}/>

                <Route path='upload' element={<Upload />}/>
                <Route path='upload/song' element={<UploadSong />}/>
            </Routes>
        </div>
    )
}

export default UserRouter
