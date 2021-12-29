import React from 'react'

const Navbar = () => {
    return (
        <nav className='primary-nav flex--align--between'>
            <div className="nav__head flex--align gap--1">
                <div className="nav__icon"><img src="./src/images/logo_small_v2.png" /></div>
                <h1 className="nav__title">Musicify</h1>
            </div>

            <ul className="nav__links flex--align gap--1">
                <li className="nav__link"><a href="#">Home</a></li>
                <li className="nav__link"><a href="#">Browse</a></li>
                <li className="link--split"></li>
                <li className='nav__link'><a href="#">Log in</a></li>
                <li className="nav__link"><a href="#">Sign up</a></li>
            </ul>

            <button className='fa nav__dropdown btn--def'>&#xf0c9;</button>
        </nav>
    )
}

export default Navbar
