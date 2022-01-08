import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../hooks'
import { API_URL } from '../../../misc/consts'
import { User } from '../../../misc/interfaces'

const UserHeader = () => {
    const user = useAppSelector(state => state.user.user)
    let path = location.pathname.split('/').pop();

    useEffect(() => {

        if(path) {
            if(path === 'user') {
                path = 'home';
            }

            document.getElementById('user-' + path + '__link')?.classList.add('active')!
        }
    }, [])

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
                    <li id='user-home__link'><Link className="user__link" to=''>Home</Link></li>
                    <li id='user-songs__link'><Link className="user__link" to='songs'>Songs</Link></li>
                    <li id='user-albums__link'><Link className="user__link" to='albums'>Albums</Link></li>
                </ul>
            </div>
        )
    else
        return(<></>)
}

export default UserHeader
