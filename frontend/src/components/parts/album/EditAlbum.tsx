import React, { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { setSongList } from '../../../features/music-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useGetAlbumSongsQuery } from '../../../services/albumService';
import Loader from '../../layout/Loader';
import Songs from '../song/Songs';
import ResultTitle from '../utils/ResultTitle';

const EditAlbum = () => {
    const { albumId } = useParams();

    const { data, isSuccess, isFetching, refetch } = useGetAlbumSongsQuery(Number(albumId!));  
    const albumSongs = useAppSelector(state => state.music.songsToPlay['ref-album-' + albumId]);
    const [searchParams, setSearchParams] = useSearchParams();
    const albumName = searchParams.get('album_name');
    const dispatch = useAppDispatch();
    
    
    useEffect(() => {
        if(data && data !== undefined)
            dispatch(setSongList({songKey: `ref-album-${albumId}`, data}));
    }, [isFetching])

    useEffect(() => {
        refetch();
    }, [])
    
    if(data && albumName && albumSongs)
        return(
            <div className="album">
                <div className="flex flex--align--between">
                    <ResultTitle text={albumName} resultText='song' amt={data.length} />
                    <button onClick={() => refetch()} name='refresh' 
                        aria-label='Refresh button' aria-hidden='true'
                        className='fa btn--def btn--primary round--50 p-05'>&#xf021;</button>
                </div>

                <div className="song-list">
                    { isFetching && <Loader text='Loading album songs...'/> }
                    { isSuccess && <Songs songs={albumSongs} referBy={'ref-album-' + albumId}
                        fallbackEl={<></>} direction='horiz' editable={true} /> }
                </div>

                <div className="btn--group">
                    <Link className='btn--def form__btn btn--primary list__btn' 
                        to={'/user/upload/song?for=album&id=' + albumId}>
                        Add song
                    </Link>
                    <Link className='btn--def form__btn btn--primary list__btn' 
                        to={`/user/delete?for=album&id=${albumId}&name=${albumName}`}>
                        Delete album
                    </Link>
                </div>
            </div>
    )

    else
        return(<></>)
};

export default EditAlbum;
