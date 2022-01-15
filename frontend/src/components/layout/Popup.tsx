import React from 'react'
import { popup } from '../../misc/utils';

const Popup = () => {

    const closePopup = () => {
        document.getElementById('popup')?.classList.remove('active');
        document.getElementById('popup')?.classList.add('inactive');
        popup('', '', true);
    }

    return (
        <div className="popup inactive" id='popup'>
            <div className="popup__head flex flex--align--between gap--05">
                <div className='flex flex--align gap--05'>
                    <p className="fa popup__icon" id='popup-icon'></p>
                    <p className="popup__type" id='popup-type'></p>
                </div>
                <div>
                    <button onClick={() => closePopup()}
                    className='btn--def fa'>&#xf00d;</button>
                </div>
            </div>
            <p className="popup__text" id='popup-text'></p>
        </div>
    )
}

export default Popup
