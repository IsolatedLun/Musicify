import React from 'react';
import { toggleEl } from '../../misc/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className='primary-nav flex--align--between'>
                <a href='#main-content' className='nav__skip round'>Skip navigation</a>
                <div className="nav__head flex--align gap--1">
                    <div className="nav__icon"><img src="./src/images/logo_small_v2.png" /></div>
                    <h1 className="nav__title">Musicify</h1>
                </div>

                <ul className="nav__links flex--align gap--1">
                    <li className="nav__link"><Link to={'/'}>Home</Link></li>
                    <li className="nav__link"><Link to={'/browse'}>Browse</Link></li>
                    <li className="link--split y"></li>
                    <li className='nav__link'><Link to={'/login'}>Log in</Link></li>
                    <li className="nav__link"><Link to={'/signup'}>Sign up</Link></li>
                </ul>

                <button onClick={() => toggleEl('side-nav', 'active')}
                    className='fa nav__dropdown btn--def'>&#xf0c9;</button>
            </nav>
        
            <div className="side-nav" id='side-nav'>
                <h2 className="side__title">Musicify</h2>
                <ul className="side__links flex--align flex--col gap--05">
                    <li className="side__link"><Link to={'/'}>Home</Link></li>
                    <li className="side__link"><Link to={'/browse'}>Browse</Link></li>
                    <button onClick={() => toggleEl('side-nav', 'active')}
                        className='fa btn--def'>&#xf00d;</button>
                </ul>
            </div>
        </>
    )
}

export default Navbar
