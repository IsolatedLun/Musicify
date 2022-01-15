import { useEffect } from "react";
import { setIndex } from "../features/music-slice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { API_URL } from "../misc/consts";
import { User } from "../misc/interfaces";
import { changeTime, dragAudioBar, handleAudio, handleAudioBar, 
    handleControls, playBetween, updateTime } from "../misc/musicPlayerHandler";
import { focusElement, toggleElement } from "../misc/utils";
import { useUpdateRecentSongMutation } from "../services/musicService";
import Song from "./parts/song/Song";
import SongPreview from "./parts/song/SongPreview";

const MusicPlayer = ({ user } : { user: User | null }) => {
    const { currSong, songsToPlay, currIdx } = useAppSelector(state => state.music);
    const dispatch = useAppDispatch();
    const [postRecentSong, { isLoading }] = useUpdateRecentSongMutation();

    const audioEl = document.getElementById('audio-el') as HTMLAudioElement;
    const audioBarProgress = document.getElementById('audio-bar-progress') as HTMLDivElement;
    const toggleBtn = document.getElementById('music-toggler') as HTMLButtonElement;
    const audioTime = document.getElementById('audio-time') as HTMLParagraphElement;
    let isMouseDown = false;

    useEffect(() => {
        if(audioEl) {
            handleAudio(audioEl, toggleBtn);
        }
    }, [isMouseDown, currSong.id])

    useEffect(() => {
        dispatch(setIndex(songsToPlay.map(song => song.id).indexOf(currSong.id)))
        if(user) {
            updateRecentSong(currSong.id!);
        }
    }, [songsToPlay, currSong.id])

    const updateRecentSong = async(songId: number) => {
        await postRecentSong(songId).unwrap();
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


                <audio autoPlay onTimeUpdate={() => { 
                    handleAudioBar(audioEl, audioBarProgress); 
                    updateTime(audioEl, audioTime); }} onEnded={() => 
                        playBetween(songsToPlay, currIdx)}
                id='audio-el' src={API_URL + 'songs/audio/' + currSong.id}></audio>

                <div className="music__controls flex gap--2">
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => 
                        handleControls(e, audioEl, songsToPlay, currIdx)}
                    className='fa reverse btn--def music__control' name='change-song' data-num='-1'>&#xf050;</button>
                    
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => 
                        handleControls(e, audioEl, songsToPlay, currIdx)}
                    className='fa btn--def music__control' id='music-toggler' name='toggle-song'>&#xf04c;</button>

                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => 
                        handleControls(e, audioEl, songsToPlay, currIdx)}
                    className='fa btn--def music__control' name='change-song' data-num='1'>&#xf050;</button>
                </div>

                <div onMouseMove={(e) => dragAudioBar(e, audioEl, isMouseDown)}
                className="music__bar" id='audio-bar' onClick={(e: React.MouseEvent<HTMLDivElement>) => 
                    changeTime(e, audioEl)}>
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
