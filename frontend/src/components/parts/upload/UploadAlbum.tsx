import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAutoState } from '../../../hooks/useAutoState';
import { previewImage } from '../../../misc/utils';

const UploadAlbum = () => {
    const [newAlbum, setNewAlbum] = useState({
        album_name: '',
        profile: null,
    })

  return(
      <div className="upload-album-container">
          <form className="upload-album__form flex flex--col gap--1" encType='multipart/form-data'>
                <div className="form__part form__part-tight mt-1">
                    <label className="form__label">Album name</label>
                    <input className='form__inpt' onInput={(e) => useAutoState(e, setNewAlbum, newAlbum, 'text')}
                        data-realtype='text' name='album_name'
                        placeholder='Enter album name' type="text" />
                    <p className="form__helptext"></p>
                </div>

                <div className="form__part flex--align">
                    <label className="form__label">Song thumbnail</label>
                    <div className='flex gap--05 flex--align flex--col'>
                        <div className="image__prev">
                            <img id='upload-album-profile-prev' src="" />
                        </div>
                        <input type="file" onInput={(e: FormEvent<HTMLInputElement>) => 
                            useAutoState(e, setNewAlbum, newAlbum, 'file', 
                                { fileTargetId: 'upload-album-profile-prev' })}
                            placeholder='Add song thumbnail' accept='image/*'
                            className='form__inpt' data-file-type='img'
                            data-realtype='file' name='profile' />
                    </div>
                    <p className="form__helptext"></p>
                </div>

                {/* <div className="form__part">
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
                </div> */}

                <button className="btn--def form__btn btn--primary">Upload album</button>
          </form>
      </div>
  )
};

export default UploadAlbum;
