import React, { useEffect } from 'react'

const MusicPlayer = () => {

    
    useEffect(() => {
        const playerHandle = document.getElementById('player-handle')!;
        const musicPlayer = document.getElementById('music-player')!
        playerHandle.addEventListener('mousedown', (e: MouseEvent) => {
            let transform: string = musicPlayer.style.transform;

            if(transform === 'translateY(-85%)') {
                musicPlayer.style.transform = `translateY(8%)`;
            }

            else {
                musicPlayer.style.transform = 'translateY(-85%)'
            }
        })
    }, [])

    return (
        <div className='music-player flex flex--align text--center gap--1' id='music-player'>
            <div className="player__handle round" id='player-handle'></div>

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

            <div className="music__controls">
                <button className='fa btn--def player__valve'>&#xf655;</button>
            </div>
        </div>
    )
}

export default MusicPlayer
