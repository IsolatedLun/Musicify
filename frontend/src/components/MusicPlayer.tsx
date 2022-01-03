import { useAppSelector } from "../hooks";
import { API_URL } from "../misc/consts";
import { INF_Song } from "../misc/interfaces";

const MusicPlayer = () => {
    const { currSong } = useAppSelector(state => state.music);

    const toggleMusicPlayer = () => {
        const musicPlayer = document.getElementById('music-player')!

        if(musicPlayer.style.transform === 'translateY(96%)')
            musicPlayer.style.transform = `translateY(2%)`;
        else
            musicPlayer.style.transform = 'translateY(96%)'
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
