import React, { FormEvent } from 'react';
import { validateInputs } from '../../misc/formHandler';

const SignUp = () => {

    const handleForm = (e: FormEvent) => {
        e.preventDefault();

        const inputs = (document.querySelectorAll('.form__inpt') as NodeListOf<HTMLInputElement>)!;
        validateInputs(inputs);
    }

    const togglePasswordVisibility = (e: React.MouseEvent, inputId: string) => {
        const input = document.getElementById(inputId)! as HTMLInputElement;
        const target = e.target as HTMLButtonElement;

        if(input.type === 'password') {
            target.style.color = 'var(--txt)';
            input.type = 'text';
        }

        else {
            target.style.color = 'var(--txt-muted)';
            input.type = 'password';
        }
    }

    return (
        <div className="form-container" id='main-content'>
            <form className="auth--form capitalize" onSubmit={(e: FormEvent) => handleForm(e)}>

                <div className="form__double-part">

                    <div className="form__part">
                        <label className="form__label">First name</label>
                        <input type="text" placeholder='Enter first name' className='form__inpt' 
                            data-realType='text' />
                        <p className="form__helptext"></p>
                    </div>

                    <div className="form__part">
                        <label className="form__label">Last name</label>
                        <input type="text" placeholder='Enter last name' className='form__inpt'
                            data-realType='text' />
                        <p className="form__helptext"></p>
                    </div>

                </div>

                <div className="form__part">
                    <label className="form__label">Email address</label>
                    <input type="email" placeholder='Enter email address' className="form__inpt" 
                        data-realType='email' />
                    <p className="form__helptext"></p>
                </div>

                <div className="form__part">
                    <label className="form__label">Password</label>
                    <input id='inpt-password' type="password" placeholder='Enter password' className="form__inpt" 
                        data-realType='password' />
                    <button onClick={(e: React.MouseEvent) => togglePasswordVisibility(e, 'inpt-password')}
                        className='btn--def fa part__btn'>&#xf06e;</button>
                    <p className="form__helptext"></p>
                </div>

                <p className="form__splitter">Misc</p>

                <div className="form__part">
                    <label className="form__label">band name<span className='txt--muted'>*</span></label>
                    <input type="text" placeholder='Enter band name' className='form__inpt' 
                        data-realType='ignore' />
                    <p className="form__helptext"></p>
                </div>

                <button className="btn--def form__btn">Sign in</button>

            </form>
        </div>
    )
}

export default SignUp
