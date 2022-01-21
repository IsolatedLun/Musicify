import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { User } from '../../../misc/interfaces';
import EditAlbum from '../album/EditAlbum';
import Upload from '../upload/Upload';
import UploadAlbum from '../upload/UploadAlbum';
import UploadSong from '../upload/UploadSong';
import UserAlbums from './UserAlbums';
import UserHeader from './UserHeader';
import UserHome from './UserHome';
import UserSettings from './UserSettings';
import UserSongs from './UserSongs';

const UserRouter = ({ user }: { user: User | null }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(user === null)
            navigate('/login');
    }, [])

    if(user)
        return (
            <div className="user-container">
                <UserHeader />
                <Routes>
                    <Route path='/' element={<UserHome user={user} />} />
                    <Route path='songs' element={<UserSongs user={user} />}/>
                    <Route path='albums' element={<UserAlbums user={user} />} />
                    <Route path='settings' element={<UserSettings user={user} />}/>

                    <Route path='upload' element={<Upload />}/>
                    <Route path='upload/song' element={<UploadSong />}/>
                    <Route path='upload/album' element={<UploadAlbum />}/>
                    <Route path='/album/edit/:albumId' element={<EditAlbum />}/>
                </Routes>
            </div>
        )
    else
        return(<h1>Unauthroized access</h1>)
}

export default UserRouter
