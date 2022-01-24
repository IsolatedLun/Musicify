import React, { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { setSongList } from '../../../features/music-slice';
import { useAppDispatch } from '../../../hooks/hooks';
import { useGetAlbumSongsQuery } from '../../../services/albumService';
import Loader from '../../layout/Loader';
import Songs from '../song/Songs';
import ResultTitle from '../utils/ResultTitle';

const EditAlbum = () => {
    const { albumId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const albumName = searchParams.get('album_name')
    const dispatch = useAppDispatch()
    const { data, isSuccess, isFetching, refetch } = useGetAlbumSongsQuery(Number(albumId));
    
    useEffect(() => {
        if(data)
            dispatch(setSongList({songKey: `ref-album-${albumId}`, data}));
        
        else
            refetch()
    }, [isFetching])
    
    if(data && albumName)
        return(
            <div className="album">
                <ResultTitle text={albumName} resultText='song' amt={data.length} />

                <div className="song-list">
                    { isFetching && <Loader text='Loading album songs...'/> }
                    { isSuccess && <Songs songs={data} referBy={'ref-album-' + albumId} mode='def'
                        fallbackEl={<></>} search='' genre='' direction='horiz' editable={true} /> }
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
