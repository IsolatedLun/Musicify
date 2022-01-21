import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAutoState } from '../../../hooks/useAutoState';
import { validateInputs } from '../../../misc/formHandler';
import { constructFormData, previewImage } from '../../../misc/utils';
import { usePostNewAlbumMutation } from '../../../services/albumService';

const UploadAlbum = () => {
    const navigate = useNavigate();
    const [uploadAlbum, { isSuccess }] = usePostNewAlbumMutation();
    const [newAlbum, setNewAlbum] = useState({
        album_name: '',
        profile: null,
    })

    const handleForm = (e: FormEvent) => {
        e.preventDefault();
        const inputs = document.querySelectorAll('.form__inpt') as NodeListOf<HTMLInputElement>;

        if(validateInputs(inputs)) {
            const albumData: FormData = constructFormData(newAlbum)!;
            postAlbum(albumData);
        }
    }

    useEffect(() => {
        if(isSuccess)
            navigate('/user/albums');
    }, [isSuccess])

    const postAlbum = async(formData: FormData) => {
        await uploadAlbum(formData).unwrap();
    }

  return(
      <div className="upload-album-container">
          <form className="upload-album__form flex flex--col gap--1" encType='multipart/form-data'>
                <div className="form__part form__part-tight mt-1">
                    <label className="form__label">Album name</label>
                    <input className='form__inpt' onInput={(e) => 
                        useAutoState(e, setNewAlbum, newAlbum, 'text')}
                        data-realtype='text' name='album_name'
                        placeholder='Enter album name' type="text" />
                    <p className="form__helptext"></p>
                </div>

                <div className="form__part flex--align">
                    <label className="form__label">Album profile</label>
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

                <button onClick={(e: FormEvent) => handleForm(e)}
                    className="btn--def form__btn btn--primary">Upload album</button>
          </form>
      </div>
  )
};

export default UploadAlbum;
