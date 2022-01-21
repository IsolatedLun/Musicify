import React from 'react';
import { Link, useParams } from 'react-router-dom';

const EditAlbum = () => {
    const { albumId } = useParams();
  
    return(
        <div className="album">
            <div className="form__part">
                <label className='form__label'>Songs</label>
                <div className="form__list">
                    <div className="list__item">
                        <div className="item__profile">
                            <img src="" alt="" />
                        </div>
                        <p className="item__title">Homage</p>
                    </div>
                </div>
                <Link className='btn--def form__btn btn--primary list__btn' 
                    to='/user/upload/song?for=album'>
                    Add song
                </Link>
            </div>
        </div>
    )
};

export default EditAlbum;
