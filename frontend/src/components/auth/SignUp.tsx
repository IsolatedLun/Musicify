import React from 'react';

const SignUp = () => {
    return (
        <div className="form-container" id='main-content'>
            <form className="auth--form capitalize">

                <div className="form__double-part">

                    <div className="form__part">
                        <label className="form__label">First name</label>
                        <input type="text" placeholder='Enter first name' className='form__inpt' />
                    </div>

                    <div className="form__part">
                        <label className="form__label">Last name</label>
                        <input type="text" placeholder='Enter last name' className='form__inpt' />
                    </div>

                </div>

                <div className="form__part">
                    <label className="form__label">Email address</label>
                    <input type="email" placeholder='Enter email address' className="form__inpt" />
                </div>

                <div className="form__part">
                    <label className="form__label">Password</label>
                    <input type="password" placeholder='Enter password' className="form__inpt" />
                </div>

                <p className="form__splitter">Misc</p>

                <div className="form__part">
                    <label className="form__label">band name<span className='txt--muted'>*</span></label>
                    <input type="text" placeholder='Enter band name' className='form__inpt' />
                </div>

                <button className="btn--def form__btn">Sign in</button>

            </form>
        </div>
    )
}

export default SignUp
