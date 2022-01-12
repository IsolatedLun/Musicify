import axios from 'axios';
import React from 'react';
import { useAppSelector } from '../hooks';
import { GET_SONG } from '../misc/consts';
import { saveAs } from 'file-saver';

const DropUp = () => {
    const { currSong } = useAppSelector(state => state.music)

    const downloadSong = (songId: number | null, songName: string) => {
        saveAs(GET_SONG + songId, songName + '.mp3');
    }

    if(currSong)
        return (
            <div className="main-dropup absolute--open" id='main-dropup' tabIndex={-1}>
                <ul className="dropup__list">
                    <li className="list__item" onClick={() => downloadSong(currSong.id, currSong.title)}>
                        <i className='fa item__icon'>&#xf019;</i>
                        <p className='item__text'>Download</p>
                    </li>
                    <li className="list__item">
                        <i className='fa item__icon'>&#xf004;</i>
                        <p className='item__text'>Favorite</p>
                    </li>
                </ul>
            </div>
        )
    else
        return(<></>)
}

export default DropUp
