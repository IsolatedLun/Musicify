import React from 'react'

const LogIn = () => {
    return (
        <div className="form-container" id='main-content'>
            <form className="auth--form capitalize">

                <div className="form__part">
                    <label className="form__label">Email address</label>
                    <input type="email" placeholder='Enter email address' className="form__inpt" />
                </div>

                <div className="form__part">
                    <label className="form__label">Password</label>
                    <input type="password" placeholder='Enter password' className="form__inpt" />
                </div>

                <button className="btn--def form__btn">Log in</button>

            </form>
        </div>
    )
}

export default LogIn
