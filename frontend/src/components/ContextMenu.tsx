import React from 'react';
import { useNavigate } from 'react-router-dom';
import { setRemoveSong } from '../features/music-slice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fullReload } from '../misc/utils';
import { usePostDeleteItemMutation } from '../services/rootService';

const ContextMenu = () => {
    const { selectedSong } = useAppSelector(state => state.music);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [deleteItem, { isSuccess }] = usePostDeleteItemMutation();

    const postDeleteItem = async() => {
        try {
            dispatch(setRemoveSong({ id: selectedSong.id, referBy: selectedSong.referBy }));
            await deleteItem({ id: selectedSong.id, type: selectedSong.type });
        }

        catch {
            
        }
    }

    return(
        <div onClick={() => document.getElementById('context-menu')?.blur()}
            className="context-menu" id='context-menu' tabIndex={-1}>
            <ul className="menu__options">
                <button onClick={() => postDeleteItem()}
                className="btn--def menu__option">Delete</button>
            </ul>
        </div>
    )
};

export default ContextMenu;
