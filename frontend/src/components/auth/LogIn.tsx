import React, { FormEvent } from 'react'
import { validateInputs } from '../../misc/formHandler';

const LogIn = () => {

    const handleForm = (e: FormEvent) => {
        e.preventDefault();

        const inputs = (document.querySelectorAll('.form__inpt') as NodeListOf<HTMLInputElement>)!;
        validateInputs(inputs);
    }

    return (
        <div className="form-container" id='main-content'>
            <form className="auth--form capitalize" onSubmit={(e: FormEvent) => handleForm(e)}>

                <div className="form__part">
                    <label className="form__label">Email address</label>
                    <input type="email" placeholder='Enter email address' className="form__inpt"
                        data-realType='email' />
                    <p className="form__helptext"></p>
                </div>

                <div className="form__part">
                    <label className="form__label">Password</label>
                    <input type="password" placeholder='Enter password' className="form__inpt"
                        data-realType='password' />
                    <p className="form__helptext"></p>
                </div>

                <button className="btn--def form__btn">Log in</button>

            </form>
        </div>
    )
}

export default LogIn
