import { useEffect, useState } from "react";
import { setIndex } from "../features/music-slice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { API_URL } from "../misc/consts";
import { INF_Song, User } from "../misc/interfaces";
import { changeTime, dragAudioBar, handleAudio, handleAudioBar, 
    playBetween, updateTime } from "../misc/musicPlayerHandler";
import { focusElement, toggleElement } from "../misc/utils";
import { useGetRatedSongQuery, usePostDislikeSongMutation, usePostLikeSongMutation, 
    useUpdateRecentSongMutation } from "../services/musicService";
import Song from "./parts/song/Song";
import SongPreview from "./parts/song/SongPreview";

const MusicPlayer = ({ user } : { user: User | null }) => {
    const { currSong, songsToPlay, currIdx, currSongType } = useAppSelector(state => state.music);
    const dispatch = useAppDispatch();
    const postRecentSong = useUpdateRecentSongMutation()[0];
    const likeSong = usePostLikeSongMutation()[0];
    const dislikeSong = usePostDislikeSongMutation()[0];
    const { data: ratedSongData , isFetching, isSuccess, refetch } = useGetRatedSongQuery(currSong.id);

    const [isRated, setIsRated] = useState(false);
    const [rateType ,setRateType] = useState('');

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
        if(songsToPlay[currSongType]) {
            dispatch(setIndex(songsToPlay[currSongType].map(song => song.id).indexOf(currSong.id)))
            if(user) {
                updateRecentSong(currSong.id!);
            }
        }
    }, [songsToPlay, currSong.id])

    useEffect(() => {
        if(ratedSongData) {
            refetch();
            setIsRated(ratedSongData.is_rated);
            setRateType(ratedSongData.rate_type);
        }
    }, [currSong.id])

    const updateRecentSong = async(songId: number) => {
        await postRecentSong(songId).unwrap();
    }

    const postLikeSong = async(songId: number) => {
        await likeSong(songId).unwrap();
        setIsRated(true);
        setRateType('like');
    }

    const postDislikeSong = async(songId: number) => {
        await dislikeSong(songId).unwrap();
        setIsRated(true);
        setRateType('dislike');
    }

    const getIsRated = async(songId: number) => {
        
    }

    const handleControls = async(e: React.MouseEvent<HTMLButtonElement>, audioEl: HTMLAudioElement, 
        songs: INF_Song[], idx: number) => {
        const target = (e.target as HTMLButtonElement);

        switch(target.name) {
            case 'toggle-song':
                handleAudio(audioEl, target);
                break;

            case 'change-song':
                playBetween(songs, idx, target.getAttribute('data-num')!);
                break;

            case 'rate':
                const action: string = target.getAttribute('data-action')!;
                const songId: number = Number(target.getAttribute('data-song-id'))!;
                if(action === 'like') {
                    postLikeSong(currSong.id);
                }

                else if(action === 'dislike') {
                    postDislikeSong(currSong.id);
                }

                break;     
        }       
    }

    if(currSong && songsToPlay[currSongType])
        return (
            <div onMouseDown={() => isMouseDown = true} onMouseUp={() => isMouseDown = false} 
            className='music-player flex flex--align text--center gap--1' id='music-player'>
                <div onClick={() => toggleElement('music-player', '96%', '2%', 'active')} 
                className="player__handle round" id='player-handle'></div>

                    <div className="music__reprs">

                        <Song song={songsToPlay[currSongType][currIdx - 1]} idx={currIdx - 1} ignore={true} 
                            queueType='previous' referBy={currSongType} />
                        <SongPreview song={currSong} ratedSong={ratedSongData}
                            currId={null} isQueue={false} />
                        <Song song={songsToPlay[currSongType][currIdx + 1]} idx={currIdx + 1} ignore={true} 
                            queueType='next' referBy={currSongType} />

                    </div>

                <audio autoPlay onTimeUpdate={(e) => { 
                    handleAudioBar(audioEl, audioBarProgress); 
                    updateTime(e.currentTarget, audioTime); }} onEnded={() => 
                        playBetween(songsToPlay[currSongType], currIdx)}
                id='audio-el' src={API_URL + 'songs/audio/' + currSong.id}></audio>

                <div className="music__controls flex gap--2">
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => 
                        handleControls(e, audioEl, songsToPlay[currSongType], currIdx)} data-song-id={ currSong.id }
                        disabled={rateType === 'dislike' ? true : false}
                    className="fa btn--def music__control" name='rate' data-action='dislike'>&#xf165;</button>

                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => 
                        handleControls(e, audioEl, songsToPlay[currSongType], currIdx)}
                    className='fa reverse btn--def music__control' name='change-song' data-num='-1'>&#xf050;</button>
                    
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => 
                        handleControls(e, audioEl, songsToPlay[currSongType], currIdx)}
                    className='fa btn--def music__control' id='music-toggler' name='toggle-song'>&#xf04c;</button>

                    <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => 
                        handleControls(e, audioEl, songsToPlay[currSongType], currIdx)}
                    className='fa btn--def music__control' name='change-song' data-num='1'>&#xf050;</button>

                   <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => 
                        handleControls(e, audioEl, songsToPlay[currSongType], currIdx)} data-song-id={ currSong.id }
                        disabled={rateType === 'like' ? true : false}
                    className="fa btn--def music__control" name='rate' data-action='like'>&#xf164;</button>
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
        return (<></>);
}

export default MusicPlayer
