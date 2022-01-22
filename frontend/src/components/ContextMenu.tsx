import React from 'react';

const ContextMenu = () => {
    return(
        <div className="context-menu" id='context-menu' tabIndex={-1}>
            <ul className="menu__options">
                <li className="menu__option">Delete</li>
            </ul>
        </div>
    )
};

export default ContextMenu;
