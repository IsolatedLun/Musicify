import React from 'react'

const DropUp = () => {
    return (
        <div className="main-dropup absolute--open" id='main-dropup'>
            <ul className="dropup__list">
                <li className="list__item">
                    <i className='fa item__icon'>&#xf019;</i>
                    <p className='item__text'>Download</p>
                </li>
                <li className="list__item">
                    <i className='fa item__icon'>&#xf019;</i>
                    <p className='item__text'>Favorite</p>
                </li>
            </ul>
        </div>
    )
}

export default DropUp
