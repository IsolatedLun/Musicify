import React, { FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { setCredentails } from '../../features/user.slice';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useAutoState } from '../../hooks/useAutoState';
import { togglePasswordVisibility, validateInputs } from '../../misc/formHandler';
import { UserLogin } from '../../misc/interfaces';
import { popup } from '../../misc/utils';
import { useLoginMutation } from '../../services/userServices';

const LogIn = () => {
    const { isLogged } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [login, { isLoading } ] = useLoginMutation()

    const [user, setUser] = useState<UserLogin>({
        email: '',
        password: ''
    })

    useEffect(() => {
        if(isLogged) {
            navigate('/')
        }
    }, [isLogged])

    const handleForm = async(e: FormEvent) => {
        e.preventDefault();

        const inputs = (document.querySelectorAll('.form__inpt') as NodeListOf<HTMLInputElement>)!;
        if(validateInputs(inputs) && !isLogged) {
                try {
                    const loggingUser = await login(user).unwrap();
                    dispatch(setCredentails(loggingUser));
                }

                catch(err: any) {
                    console.log(err.data)
                    popup(err.data['err'], 'Error');
                }
        }
    }

    return (
        <div className="form-container" id='main-content'>
            <form className="auth--form capitalize" onSubmit={(e: FormEvent) => handleForm(e)}>

                <div className="form__part">
                    <label className="form__label">Email address</label>
                    <input type="email" onInput={(e: FormEvent<HTMLInputElement>) => 
                        useAutoState(e, setUser, user, 'text')}
                    placeholder='Enter email address' className="form__inpt"
                        data-realtype='email' name='email' />
                    <p className="form__helptext"></p>
                </div>

                <div className="form__part">
                    <label className="form__label">Password</label>
                    <div className="form__inpt-container">
                        <input type="password" onInput={(e: FormEvent<HTMLInputElement>) => 
                            useAutoState(e, setUser, user, 'text')}
                            placeholder='Enter password' className="form__inpt" id='inpt-password-login'
                            data-realtype='password' name='password' />
                        <button onClick={(e: React.MouseEvent) => togglePasswordVisibility(e, 'inpt-password-login')}
                            className='btn--def fa part__btn'>&#xf06e;</button>
                    </div>
                    <p className="form__helptext"></p>
                </div>

                <Link to='/signup' className='form__link' replace>Don't have an account?</Link>

                <button className="btn--def btn--primary form__btn">Log in</button>

            </form>
        </div>
    )
}

export default LogIn
