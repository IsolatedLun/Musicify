import React, { SyntheticEvent, useEffect } from 'react'
import { getAngleWithMouse } from '../misc/utils';
import ClickNHold from 'react-click-n-hold';

const MusicPlayer = () => {
    let isMouseDown = false;

    const toggleMusicPlayer = () => {
        const musicPlayer = document.getElementById('music-player')!

        if(musicPlayer.style.transform === 'translateY(-85%)')
            musicPlayer.style.transform = `translateY(8%)`;
        else
            musicPlayer.style.transform = 'translateY(-85%)'
    }

    const handleChanger = (e: any) => {
        const changer: HTMLElement = document.getElementById('player-changer')!;
        const angle: number = getAngleWithMouse(e, 'player-changer', 0.5);
        if(isMouseDown) {
            changer.style.transform = 
                `rotate(${angle}deg)`
        }

        console.log(angle)
    }

    return (
        <div onMouseDown={() => isMouseDown = true} onMouseUp={() => isMouseDown = false} 
        className='music-player flex flex--align text--center gap--1' id='music-player'>
            <div onClick={() => toggleMusicPlayer()} 
            className="player__handle round" id='player-handle'></div>
            <div className="music__repr">
                <div className="music__head">
                    <div className="music__stats flex--align flex--center gap--1 text--center">
                        <div className="music__stat">
                            <i className="fas fa-eye views"></i>
                            <p className="stat__num">900</p>
                        </div>
                        <div className="music__stat">
                            <i className="fas fa-star rate"></i>
                            <p className="stat__num">200</p>
                        </div>
                    </div>
                </div>
                <div className="music__thumbnail">
                    <img src="" alt="" />
                </div>
            </div>

            <div className="music__controls">
                <button
                 onMouseMove={(e: React.MouseEvent<HTMLButtonElement, Event>) => handleChanger(e)}
                className='fa btn--def player__valve' id='player-changer'>&#xf655;</button>
            </div>
        </div>
    )
}

export default MusicPlayer
