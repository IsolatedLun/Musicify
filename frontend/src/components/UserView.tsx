import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import { API_URL } from '../misc/consts'
import Loader from './layout/Loader'

const UserView = () => {
    const { id } = useParams();
    const user = useAppSelector(state => state.user.user)

    if(user !== null)
        return (
            <div className='user-container'>
                <div className="user__head flex flex--align--between flex--between gap--05">
                    <div className='flex--align gap--1'>
                        <div className="user__profile">
                            <img src={API_URL + 'users/profiles/' + user.id} alt="" />
                        </div>
                        <h1 className="user__title">{ user.producer_name }</h1>
                    </div>
                    <div className="btn--group group--y gap--1">
                        <Link to='settings' className='btn--def btn--primary'>Settings</Link>
                        <Link to='upload' className='btn--def btn--primary'>Create</Link>
                    </div>
                </div>

                <div className="user__albums user__items">
                    <h1 className="items__title capitalize">My albums</h1>
                </div>

                <div className="user__albums user__items">
                    <h1 className="items__title capitalize">My songs</h1>
                </div>
            </div>
        )
    else
        return <Loader text='Loading user...' />
}

export default UserView
