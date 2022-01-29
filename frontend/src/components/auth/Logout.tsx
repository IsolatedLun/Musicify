import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../features/user.slice';
import { useAppDispatch } from '../../hooks/hooks';
import { fullReload } from '../../misc/utils';

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const commenceLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    return (
        <div className="form-container">
            <div className="logout text--center" id='main-content'>
                <h1 className="logout__title">Are you sure you want to logout?</h1>
                <div className="btn--group">
                    <button onClick={() => commenceLogout()}
                    className='btn--def btn--primary'>Yes</button>
                    <button onClick={() => navigate(-1)}
                    className='btn--def btn--primary btn--err err cust'>No</button>
                </div>
            </div>
        </div>
    )
}

export default Logout
