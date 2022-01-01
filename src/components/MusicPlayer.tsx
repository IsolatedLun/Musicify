import React, { SyntheticEvent, useEffect } from 'react'
import { getAngleWithMouse, getRotation } from '../misc/utils';
import ClickNHold from 'react-click-n-hold';

const MusicPlayer = () => {

    const toggleMusicPlayer = () => {
        const musicPlayer = document.getElementById('music-player')!

        if(musicPlayer.style.transform === 'translateY(-85%)')
            musicPlayer.style.transform = `translateY(8%)`;
        else
            musicPlayer.style.transform = 'translateY(-85%)'
    }

    return (
        <div className='music-player flex flex--align text--center gap--1' id='music-player'>
            <div onClick={() => toggleMusicPlayer()} 
            className="player__handle round" id='player-handle'></div>
            <div className="music__repr">
                <div className="music__head">
                    <h1 className="music__title">Homage</h1>
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

            <div className="music__controls flex gap--2">
                <button 
                className='fa reverse btn--def music__control' id='music-toggler'>&#xf050;</button>
                
                <button 
                className='fa btn--def music__control' id='music-toggler'>&#xf04b;</button>

                <button 
                className='fa btn--def music__control' id='music-toggler'>&#xf050;</button>
            </div>

            <div className="music__bar">
                <div className="music__progress"></div>
            </div>
        </div>
    )
}

export default MusicPlayer
