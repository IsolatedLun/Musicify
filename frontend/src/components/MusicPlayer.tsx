import { useEffect } from "react";
import { useAppSelector } from "../hooks";
import { API_URL } from "../misc/consts";
import { INF_Song } from "../misc/interfaces";
import { toggleMusicPlayer } from "../misc/utils";
import Song from "./parts/Song";

const MusicPlayer = () => {
    const { currSong } = useAppSelector(state => state.music);
    const audioEl = document.getElementById('audio-el') as HTMLAudioElement;
    const audioBar = document.getElementById('audio-bar') as HTMLDivElement;
    const audioBarProgress = document.getElementById('audio-bar-progress') as HTMLDivElement;
    const toggleBtn = document.getElementById('music-toggler') as HTMLButtonElement;

    useEffect(() => {   
        if(audioEl) {
            handleAudioBar();

            audioEl.addEventListener('canplay', () => {
                audioEl.play();
            })
        }
    }, [])

    const handleControls = (e: React.MouseEvent<HTMLButtonElement>) => {
       const action = (e.target as HTMLButtonElement).name;
       switch(action) {
           case 'toggle-song':
               handleAudio();
               break;

            case 'change-song':
                changeSong();
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

    const changeSong = () => {

    }

    const changeTime = (e: React.MouseEvent<HTMLDivElement>) => {
        const pct: number = e.nativeEvent.offsetX / (e.target as HTMLDivElement).offsetWidth;
        audioEl.currentTime = pct * audioEl.duration;
    }

    const handleAudioBar = () => {
        const pct: number = (audioEl.currentTime / audioEl.duration);
        audioBarProgress.style.transform = `scaleX(${pct})`;
    }

    return (
        <div className='music-player flex flex--align text--center gap--1' id='music-player'>
            <div onClick={() => toggleMusicPlayer()} 
            className="player__handle round" id='player-handle'></div>
            <div className="music__repr">
                <div className="music__head">
                    <h1 className="music__title">{ currSong.title }</h1>
                    <div className="music__stats flex--align flex--center gap--1 text--center">
                        <div className="music__stat">
                            <i className="fas fa-eye views"></i>
                            <p className="stat__num">{ currSong.views }</p>
                        </div>
                        <div className="music__stat">
                            <i className="fas fa-star rate"></i>
                            <p className="stat__num">{ currSong.rating }</p>
                        </div>
                    </div>
                </div>
                <div className="music__thumbnail">
                    <img src={ API_URL + 'songs/thumb/' + currSong.id } alt={currSong.title + ' thumbnail'} />
                </div>
            </div>

            <audio onTimeUpdate={() => handleAudioBar()}
            id='audio-el' src={API_URL + 'songs/audio/' + currSong.id}></audio>

            <div className="music__controls flex gap--2">
                <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleControls(e)}
                className='fa reverse btn--def music__control' name='change-song'>&#xf050;</button>
                
                <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleControls(e)}
                className='fa btn--def music__control' id='music-toggler' name='toggle-song'>&#xf04b;</button>

                <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleControls(e)}
                className='fa btn--def music__control' name='change-song'>&#xf050;</button>
            </div>

            <div className="music__bar" id='audio-bar' onClick={(e: React.MouseEvent<HTMLDivElement>) => changeTime(e)}>
                <div className="music__progress" id='audio-bar-progress'></div>
            </div>
        </div>
    )
}

export default MusicPlayer
