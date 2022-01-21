import React from 'react';
import { API_URL } from '../../../misc/consts';
import { INF_Album } from '../../../misc/interfaces';

const Album = ({ album }: { album: INF_Album }) => {
    return(
        <div className="album">
            <h1 className="album__title">{ album.album_name }</h1>
            <div className="album__profile">
                <img src={API_URL + 'albums/profiles/' + album.id} alt={album.album_name + ' profile'} />
            </div>
        </div>
    )
};

export default Album;
