import React from 'react'
import UserHeader from './UserHeader'

const UserHome = () => {
    return (
        <div className='user__home flex flex--col gap--1'>
            <div className="home__items">
                <h2 className="items__title">Recents</h2>
            </div>
            <div className="home__items">
                <h2 className="items__title">Favorites</h2>
            </div>
        </div>
    )
}

export default UserHome
