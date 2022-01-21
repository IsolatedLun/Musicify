import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../../misc/consts';
import { INF_Album } from '../../../misc/interfaces';

const Album = ({ album }: { album: INF_Album }) => {
    const navigate = useNavigate()
    return(
        <div onClick={() => navigate('/user/album/edit/' + album.id)}
            className="album flex--align flex--col gap--05">
            <h1 className="album__title">{ album.name }</h1>
            <div className="album__profile">
                <img src={API_URL + 'albums/profiles/' + album.id} alt={album.name + ' profile'} />
            </div>
        </div>
    )
};

export default Album;
