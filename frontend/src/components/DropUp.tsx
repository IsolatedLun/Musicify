import React from 'react'
import { useAppSelector } from '../hooks'
import { GET_SONG } from '../misc/consts'

const DropUp = () => {
    const { currSong } = useAppSelector(state => state.music)

    const downloadSong = (songId: number | null, songName: string) => {
        const a = document.createElement('a') as HTMLAnchorElement;
        a.href = GET_SONG + songId;
        a.download = songName;

        a.click();
        a.remove();
    }

    if(currSong)
        return (
            <div className="main-dropup absolute--open" id='main-dropup'>
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
}

export default DropUp
