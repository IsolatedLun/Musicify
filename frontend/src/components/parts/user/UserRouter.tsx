import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { User } from '../../../misc/interfaces';
import UserHeader from './UserHeader';
import UserHome from './UserHome';
import UserSettings from './UserSettings';

const UserRouter = ({ user }: { user: User | null }) => {
    return (
        <div className="user-container">
            <UserHeader />
            <Routes>
                <Route path='/' element={<UserHome />} />
                <Route path='songs' element={<h1>User songs</h1>}/>
                <Route path='albums' element={<h1>User albums</h1>}/>
                <Route path='settings' element={<UserSettings />}/>
            </Routes>
        </div>
    )
}

export default UserRouter
