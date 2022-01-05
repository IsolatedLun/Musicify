import { useEffect } from "react";
import { setIndex } from "../features/music-slice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { API_URL } from "../misc/consts";
import { INF_Song } from "../misc/interfaces";
import { getSongEl, toggleMusicPlayer } from "../misc/utils";
import Song from "./parts/Song";
import SongPreview from "./parts/SongPreview";

const MusicPlayer = () => {
    const { currSong, songs, currIdx } = useAppSelector(state => state.music);
    const dispatch = useAppDispatch();

    const audioEl = document.getElementById('audio-el') as HTMLAudioElement;
    const audioBar = document.getElementById('audio-bar') as HTMLDivElement;
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
        dispatch(setIndex(songs.map(song => song.id).indexOf(currSong.id)))
    }, [currSong.id])

    const handleControls = (e: React.MouseEvent<HTMLButtonElement>) => {
       const target = (e.target as HTMLButtonElement);
       switch(target.name) {
           case 'toggle-song':
               handleAudio();
               break;

            case 'change-song':
                const idx: number = Number(target.getAttribute('data-num'));
                playBetween(idx);
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

    const playBetween = () => {
        let nextSong: HTMLButtonElement | null = null;
        let idx = songs.indexOf(songs.filter(song => song.id === currSong.id)[0])

        if(songs[currIdx + idx]) {
            nextSong = getSongEl(songs[idx + 1].id!)
        }

        else if(songs[currIdx + -idx]) {
            nextSong = getSongEl(songs[idx - 1].id!);
        }

        if(nextSong)
            nextSong.click();
    }

    const updateTime = () => {
        const currTime = new Date(audioEl.currentTime * 1000).toISOString().substr(11, 8);
        audioTime.innerText = currTime + ' / ' + audioDuration;
    }

    return (
        <div onMouseDown={() => isMouseDown = true} onMouseUp={() => isMouseDown = false} 
        className='music-player flex flex--align text--center gap--1' id='music-player'>
            <div onClick={() => toggleMusicPlayer()} 
            className="player__handle round" id='player-handle'></div>

                <div className="music__reprs">

                    <Song song={songs[currIdx - 1]} idx={currIdx - 1} ignore={true} queueType='previous' />
                    <SongPreview song={currSong} currId={null} isQueue={false} />
                    <Song song={songs[currIdx + 1]} idx={currIdx + 1} ignore={true} queueType='next' />

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

        </div>
        
    )
}

export default MusicPlayer
