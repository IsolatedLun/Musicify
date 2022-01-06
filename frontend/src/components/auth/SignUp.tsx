import React, { FormEvent } from 'react';
import { validateInputs } from '../../misc/formHandler';

const SignUp = () => {

    const handleForm = (e: FormEvent) => {
        e.preventDefault();

        const inputs = (document.querySelectorAll('.form__inpt') as NodeListOf<HTMLInputElement>)!;
        validateInputs(inputs);
    }

    return (
        <div className="form-container" id='main-content'>
            <form className="auth--form capitalize" onSubmit={(e: FormEvent) => handleForm(e)}>

                <div className="form__double-part">

                    <div className="form__part">
                        <label className="form__label">First name</label>
                        <input type="text" placeholder='Enter first name' className='form__inpt' />
                        <p className="form__helptext"></p>
                    </div>

                    <div className="form__part">
                        <label className="form__label">Last name</label>
                        <input type="text" placeholder='Enter last name' className='form__inpt' />
                        <p className="form__helptext"></p>
                    </div>

                </div>

                <div className="form__part">
                    <label className="form__label">Email address</label>
                    <input type="email" placeholder='Enter email address' className="form__inpt" />
                    <p className="form__helptext"></p>
                </div>

                <div className="form__part">
                    <label className="form__label">Password</label>
                    <input type="password" placeholder='Enter password' className="form__inpt" />
                    <p className="form__helptext"></p>
                </div>

                <p className="form__splitter">Misc</p>

                <div className="form__part">
                    <label className="form__label">band name<span className='txt--muted'>*</span></label>
                    <input type="text" placeholder='Enter band name' className='form__inpt' />
                    <p className="form__helptext"></p>
                </div>

                <button className="btn--def form__btn">Sign in</button>

            </form>
        </div>
    )
}

export default SignUp
