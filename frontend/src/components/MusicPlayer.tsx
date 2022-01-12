import { useEffect, useState } from "react";
import { postRecentSong, setIndex, setSongsToPlay } from "../features/music-slice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { API_URL, DROPUP_OFF, DROPUP_ON } from "../misc/consts";
import { INF_Song, User } from "../misc/interfaces";
import { focusElement, getSongEl, toggleElement, toggleMusicPlayer } from "../misc/utils";
import Song from "./parts/song/Song";
import SongPreview from "./parts/song/SongPreview";

const MusicPlayer = ({ user } : { user: User | null }) => {
    const { currSong, browseSongs, recentSongs, favoriteSongs, songsToPlay,
        currIdx, currSongType } = useAppSelector(state => state.music);
    const { loc } = useAppSelector(state => state.utils)
    const dispatch = useAppDispatch();

    const audioEl = document.getElementById('audio-el') as HTMLAudioElement;
    const audioBarProgress = document.getElementById('audio-bar-progress') as HTMLDivElement;
    const toggleBtn = document.getElementById('music-toggler') as HTMLButtonElement;
    const audioTime = document.getElementById('audio-time') as HTMLParagraphElement;
    let audioDuration: Date | string = '00:00:00';
    let isMouseDown = false;

    useEffect(() => {
        if(audioEl) {
            handleAudio();
        }
    }, [isMouseDown, currSong.id])

    useEffect(() => {
        dispatch(setIndex(songsToPlay.map(song => song.id).indexOf(currSong.id)))
        if(user) {
            dispatch(postRecentSong({ userId: user.id, songId: currSong.id }))
        }
    }, [songsToPlay, currSong.id])

    const handleControls = (e: React.MouseEvent<HTMLButtonElement>) => {
       const target = (e.target as HTMLButtonElement);
       switch(target.name) {
           case 'toggle-song':
               handleAudio();
               break;

            case 'change-song':
                playBetween(target.getAttribute('data-num')!);
                break;
       }       
    }

    const handleAudio = () => {
        if(audioEl.paused) {
            toggleBtn.innerText = '\uf04c';
            audioEl.play()
        }

        else {
            toggleBtn.innerText = '\uf04b';
            audioEl.pause()
        }
    }

    const changeTime = (e: React.MouseEvent<HTMLDivElement>) => {
        const pct: number = e.nativeEvent.offsetX / (e.target as HTMLDivElement).offsetWidth;
        audioEl.currentTime = pct * audioEl.duration;
    }

    const handleAudioBar = () => {
        const pct: number = (audioEl.currentTime / audioEl.duration);
        audioBarProgress.style.transform = `scaleX(${pct})`;
    }

    const dragAudioBar = (e: React.MouseEvent<HTMLDivElement>) => {
        if(isMouseDown) {
            changeTime(e);
        }
    }

    const playBetween = (action: string='any') => {
        let nextSong: HTMLButtonElement | null = null;

        if(songsToPlay[currIdx + 1] && (action === 'any' || action === '1')) {
            nextSong = getSongEl(songsToPlay[currIdx + 1].id!)
        }

        else if(songsToPlay[currIdx - 1] && (action === 'any' || action === '-1')) {
            nextSong = getSongEl(songsToPlay[currIdx - 1].id!);
        }

        if(nextSong)
            nextSong.click();
    }

    const updateTime = () => {
        const currTime = new Date(audioEl.currentTime * 1000).toISOString().substr(11, 8);
        audioTime.innerText = currTime + ' / ' + audioDuration;
    }

    if(currSong.id !== null)
        return (
            <div onMouseDown={() => isMouseDown = true} onMouseUp={() => isMouseDown = false} 
            className='music-player flex flex--align text--center gap--1' id='music-player'>
                <div onClick={() => toggleElement('music-player', '96%', '2%', 'active')} 
                className="player__handle round" id='player-handle'></div>

                    <div className="music__reprs">

                        <Song song={songsToPlay[currIdx - 1]} idx={songsToPlay.length + 1} ignore={true} 
                            queueType='previous' referBy="ref-player" />
                        <SongPreview song={currSong} currId={null} isQueue={false} />
                        <Song song={songsToPlay[currIdx + 1]} idx={songsToPlay.length + 2} ignore={true} 
                            queueType='next' referBy="ref-player" />

                    </div>


                <audio onCanPlay={() => { audioDuration = new Date(audioEl.duration * 1000).toISOString().substr(11, 8); }}
                autoPlay onTimeUpdate={() => { handleAudioBar(); updateTime(); }} onEnded={() => playBetween()}
                id='audio-el' src={API_URL + 'songs/audio/' + currSong.id}></audio>

                <div className="music__controls flex gap--2">
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleControls(e)}
                    className='fa reverse btn--def music__control' name='change-song' data-num='-1'>&#xf050;</button>
                    
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleControls(e)}
                    className='fa btn--def music__control' id='music-toggler' name='toggle-song'>&#xf04c;</button>

                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleControls(e)}
                    className='fa btn--def music__control' name='change-song' data-num='1'>&#xf050;</button>
                </div>

                <div onMouseMove={(e) => dragAudioBar(e)}
                className="music__bar" id='audio-bar' onClick={(e: React.MouseEvent<HTMLDivElement>) => changeTime(e)}>
                    <div className="music__progress" id='audio-bar-progress'></div>
                </div>
                
                <p className="music__time" id='audio-time'>00:00:00 / 00:00:00</p>

                <button onClick={() => focusElement('main-dropup')}
                className="fa btn--def music__dropdown-btn" id='dropup-btn'>&#xf142;</button>

            </div>
        
        )
    else
        return (<></>)
}

export default MusicPlayer
