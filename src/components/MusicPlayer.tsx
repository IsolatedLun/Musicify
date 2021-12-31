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
        <div className='music-player' id='music-player'>
            <div className="player__handle round" id='player-handle'></div>

            <div className="player__thumbnail">
                <img src="" alt='' />
            </div>

            <div className="player__controls">

            </div>
        </div>
    )
}

export default MusicPlayer
