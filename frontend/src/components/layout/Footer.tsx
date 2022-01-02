import React from 'react'

const Footer = () => {
    return (
        <footer className='primary-footer flex flex--col gap--1'>
            <div className="footer__content flex--align flex--around text--center">
                <ul className="footer_links">
                    <h2 className="footer__head">Main</h2>
                    <li className="footer__link"><a href="#">Home</a></li>
                </ul>

                <ul className="footer_links">
                    <h2 className="footer__head">Development</h2>
                    <li className="footer__link"><a href="#">Source code</a></li>
                </ul>
            </div>

            <div className="footer__icon">
                <img src="../src/images/logo_small_v2.png" />
            </div>
        </footer>
    )
}

export default Footer
