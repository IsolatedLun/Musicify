import React, { FormEvent, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { setCredentails } from '../../features/user.slice';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { validateInputs } from '../../misc/formHandler';
import { UserLogin } from '../../misc/interfaces';
import { popup } from '../../misc/utils';
import { useLoginMutation } from '../../services/userServices';
import Inputs, { InputProps } from '../inputs/Inputs';

const LogIn = () => {
    const { isLogged } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [login, { isLoading } ] = useLoginMutation();

    const inputs: InputProps[] = [
        { inputType: 'text', label: 'email address', name: 'email', type: 'text', 
            id: 'email-inpt', options: null },
        { inputType: 'password', label: 'password', name: 'password', type: 'text', 
            id: 'passwrd-inpt', options: null },
    ]

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

                <Inputs props={{ setter: setUser, data: user, inputs: inputs }} />

                <Link to='/signup' className='form__link' replace>Don't have an account?</Link>

                <button className="btn--def btn--primary form__btn">Log in</button>

            </form>
        </div>
    )
}

export default LogIn
