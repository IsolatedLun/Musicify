import React from 'react';
import { INF_Album } from '../../../misc/interfaces';
import Album from './Album';

const Albums = ({ albums }: { albums: INF_Album[] | null }) => {
    if(albums !== undefined && albums !== null)
        return <div className='albums'>{
            albums.map(album => (
                <Album album={album} />
            ))
        }</div>
    else
        return(<></>)
};

export default Albums;
