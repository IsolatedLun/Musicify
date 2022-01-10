import React from 'react'

const Popup = () => {
    return (
        <div className="popup inactive" id='popup'>
            <div className="popup__content flex flex--align gap--05" id='popup-content'>
                <p className="fa" id='popup-icon'> &#xf052;</p>
                <p className="popup__text" id='popup-text'>hello</p>
            </div>
        </div>
    )
}

export default Popup
