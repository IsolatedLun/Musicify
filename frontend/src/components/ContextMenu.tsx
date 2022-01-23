import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fullReload } from '../misc/utils';
import { usePostDeleteItemMutation } from '../services/rootService';

const ContextMenu = () => {
    const { selectedSong } = useAppSelector(state => state.music);
    const [deleteItem, { isSuccess }] = usePostDeleteItemMutation();

    const postDeleteItem = async() => {
        try {
            await deleteItem({ id: selectedSong.id, type: selectedSong.type });
            fullReload();
        }

        catch {
            
        }
    }

    return(
        <div className="context-menu" id='context-menu' tabIndex={-1}>
            <ul className="menu__options">
                <button onClick={() => postDeleteItem()}
                className="btn--def menu__option">Delete</button>
            </ul>
        </div>
    )
};

export default ContextMenu;
