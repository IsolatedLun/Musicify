import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetAlbumSongsQuery } from '../../../services/albumService';
import Loader from '../../layout/Loader';
import Songs from '../song/Songs';

const EditAlbum = () => {
    const { albumId } = useParams();
    const { data, isSuccess, isFetching } = useGetAlbumSongsQuery(Number(albumId));
  
    return(
        <div className="album">
            <h1 className="album__title">{}</h1>

            <div className="song-list">
                { isFetching && <Loader text='Loading album songs...'/> }
                { isSuccess && <Songs songs={data} referBy={'album-' + albumId} mode='def'
                    fallbackEl={<></>} search='' genre='' direction='horiz' /> }
            </div>

            <Link className='btn--def form__btn btn--primary list__btn' 
                to={'/user/upload/song?for=album&id=' + albumId}>
                Add song
            </Link>
        </div>
    )
};

export default EditAlbum;
