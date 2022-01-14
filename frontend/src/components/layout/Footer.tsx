import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

const Footer = () => {
    const { isLogged } = useAppSelector(state => state.user);

    return (
        <footer className='primary-footer flex flex--col gap--1'>
            <div className="footer__content flex--align flex--around text--center">
                <ul className="footer_links">
                    <h2 className="footer__head">Main</h2>
                    <li className="footer__link"><Link to='/'>Home</Link></li>
                    <li className="footer__link"><Link to='/browse'>Browse</Link></li>
                    {
                        isLogged
                        ? 
                        <li className="footer__link"><Link to='/user'>You</Link></li>
                        : null
                    }
                </ul>

                <ul className="footer_links">
                    <h2 className="footer__head">Development</h2>
                    <li className="footer__link">
                        <a href='https://github.com/IsolatedLun/Musicify' target='_blank'>Source code</a>
                    </li>
                </ul>
            </div>

            <div className="footer__icon">
                <img src="../src/images/logo_small_v2.png" />
            </div>
        </footer>
    )
}

export default Footer
