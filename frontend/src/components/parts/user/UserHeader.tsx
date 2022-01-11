import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setDoSave } from '../../../features/user.slice'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { API_URL } from '../../../misc/consts'
import { User } from '../../../misc/interfaces'

const UserHeader = () => {
    const { user , changesMade } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
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
                <div className='head__part flex flex--align--between'>
                    <div className='head__info flex flex--align gap--05'>
                        <div className="user__profile">
                            <img src={API_URL + 'users/profiles/' + user.id} alt="" />
                        </div>
                        <h1 className="user__title">{ user.producer_name }</h1>
                    </div>
                    <div className="btn--group gap--1">
                        <Link to='settings' className='btn--def btn--primary'>Settings</Link>
                        {
                            changesMade
                            ?
                            <button onClick={() => dispatch(setDoSave(true))}
                                className='btn--def btn--primary'>Save changes</button>
                            : null
                        }
                    </div>
                </div>
            
                <ul className="user__nav flex flex--align flex--center gap--05">
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
