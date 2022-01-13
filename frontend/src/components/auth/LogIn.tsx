import React, { FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { setCredentails } from '../../features/user.slice';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { validateInputs } from '../../misc/formHandler';
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
                    const loggingUser = await login(user).unwrap()
                    dispatch(setCredentails(loggingUser));
                }

                catch(err: any) {
                    popup(err.data['err'], 'err');
                }
        }
    }

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setUser({ ...user, [target.name]: target.value });
    }

    return (
        <div className="form-container" id='main-content'>
            <form className="auth--form capitalize" onSubmit={(e: FormEvent) => handleForm(e)}>

                <div className="form__part">
                    <label className="form__label">Email address</label>
                    <input type="email" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                    placeholder='Enter email address' className="form__inpt"
                        data-realType='email' name='email' />
                    <p className="form__helptext"></p>
                </div>

                <div className="form__part">
                    <label className="form__label">Password</label>
                    <input type="password" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                        placeholder='Enter password' className="form__inpt"
                        data-realType='password' name='password' />
                    <p className="form__helptext"></p>
                </div>

                <Link to='/signup' className='form__link' replace>Don't have an account?</Link>

                <button className="btn--def btn--primary form__btn">Log in</button>

            </form>
        </div>
    )
}

export default LogIn
