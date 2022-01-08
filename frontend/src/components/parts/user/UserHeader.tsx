import React from 'react'
import { useAppSelector } from '../../../hooks'
import { API_URL } from '../../../misc/consts'
import { User } from '../../../misc/interfaces'

const UserHeader = () => {
    const user = useAppSelector(state => state.user.user)

    if(user !== null)
        return (
            <div className="user__head flex flex--col gap--05">
                <div className='flex flex--align gap--05'>
                    <div className="user__profile">
                        <img src={API_URL + 'users/profiles/' + user.id} alt="" />
                    </div>
                    <h1 className="user__title">{ user.producer_name }</h1>
                </div>
            
                <ul className="user__nav flex flex--align flex--center">
                    <li className="user__link">Home</li>
                    <li className="user__link">Songs</li>
                    <li className="user__link">Albums</li>
                </ul>
            </div>
        )
    else
        return(<></>)
}

export default UserHeader
