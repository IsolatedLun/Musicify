import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../features/user.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { togglePasswordVisibility, validateInputs } from '../../misc/formHandler';
import { UserForm } from '../../misc/interfaces';

const SignUp = () => {
    const { isSignedUp, isLogged } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const [newUser, setNewUser] = useState<UserForm>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        producerName: ''
    });

    useEffect(() => {
        if(isSignedUp) {
            navigate('/login')
        }
    }, [isSignedUp])

    useEffect(() => {
        if(isLogged) {
            navigate(-1);
        }
    })

    const handleForm = (e: FormEvent) => {
        e.preventDefault();

        const inputs = (document.querySelectorAll('.form__inpt') as NodeListOf<HTMLInputElement>)!;
        if(validateInputs(inputs)) {
            dispatch(signUp(newUser));
        }
    }

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setNewUser({ ...newUser, [target.name]: target.value });
    }

    return (
        <div className="form-container" id='main-content'>
            <form className="auth--form capitalize" onSubmit={(e: FormEvent) => handleForm(e)}>

                <div className="form__double-part">

                    <div className="form__part">
                        <label className="form__label">First name</label>
                        <input type="text" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                            placeholder='Enter first name' className='form__inpt' 
                            data-realtype='text' name='firstName' />
                        <p className="form__helptext"></p>
                    </div>

                    <div className="form__part">
                        <label className="form__label">Last name</label>
                        <input type="text" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                            placeholder='Enter last name' className='form__inpt'
                            data-realtype='text' name='lastName' />
                        <p className="form__helptext"></p>
                    </div>

                </div>

                <div className="form__part">
                    <label className="form__label">Email address</label>
                    <input type="email" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                        placeholder='Enter email address' className="form__inpt" 
                        data-realtype='email' name='email' />
                    <p className="form__helptext"></p>
                </div>

                <div className="form__part">
                    <label className="form__label">Password</label>
                    <input id='inpt-password' type="password" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                        placeholder='Enter password' className="form__inpt" 
                        data-realtype='password' name='password' />
                    <button onClick={(e: React.MouseEvent) => togglePasswordVisibility(e, 'inpt-password')}
                        className='btn--def fa part__btn'>&#xf06e;</button>
                    <p className="form__helptext"></p>
                </div>

                <p className="form__splitter">Misc</p>

                <div className="form__part">
                    <label className="form__label">Producer name<span className='txt--muted'>* (Public username)</span></label>
                    <input type="text" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                        placeholder='Enter producer name' className='form__inpt' 
                        data-realtype='ignore' name='producerName' />
                    <p className="form__helptext"></p>
                </div>

                <Link to='/login' className='form__link' replace>Already have an account?</Link>

                <button className="btn--def btn--primary form__btn">Sign in</button>

            </form>
        </div>
    )
}

export default SignUp
