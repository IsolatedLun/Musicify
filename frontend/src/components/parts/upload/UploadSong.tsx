import React, { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAutoState } from '../../../hooks/useAutoState';
import { validateInputs } from '../../../misc/formHandler';
import { NewSong } from '../../../misc/interfaces';
import { constructFormData, popup, previewImage } from '../../../misc/utils';
import { useUploadSongMutation } from '../../../services/musicService';
import songGenres from '../../json/genres.json';
import Option from '../utils/Option';

const UploadSong = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const uploadMode = searchParams.get('for');

    const [newSong, setNewSong] = useState<NewSong>({
        title: '',
        genre: 'All',
        profile: null,
        audio: null
    })
    const [songUpload, { isLoading }] = useUploadSongMutation();

    const handleForm = async(e: React.FormEvent) => {
        e.preventDefault();
    
        const inputs = document.querySelectorAll('.form__inpt') as NodeListOf<HTMLInputElement>;

        if(validateInputs(inputs)) {
            const formData: FormData | null = constructFormData(newSong);
            if(formData !== null && uploadMode === null) {
                try {
                    await songUpload(formData).unwrap();
                    navigate('/browse');
                }

                catch(err: any) {
                    popup(err.data['err'], 'Error');
                }
            }

            else {
                alert('lol')
            }
        }
    }

    return (
        <div className="upload-song-container">
            <form className="upload-song__form" encType='multipart/form-data'
                onSubmit={(e: React.FormEvent) => handleForm(e)}>
                <div className="form__divider">
                    <section>
                        <div className="form__part">
                            <label htmlFor="song-input" id='song-label-inpt' data-fname='Add audio file'
                                className='form__label-drop-inpt fa elliptic'>&#xf1c7;
                                <input data-realtype='file' name='audio' accept='audio/*'
                                    onInput={(e: React.FormEvent<HTMLInputElement>) => 
                                        useAutoState(e, setNewSong, newSong, 'file', 
                                        { fileTargetId: 'song-label-inpt' })}
                                    type="file" data-file-type='audio' className='form__inpt' id='song-input' />
                            </label>
                            <p className="form__helptext"></p>
                        </div>
                    </section>

                    <section>
                    <div className="form__part">
                        <label className="form__label">Song name</label>
                        <input type="text" onInput={(e: FormEvent<HTMLInputElement>) => 
                            useAutoState(e, setNewSong, newSong, 'text')}
                            placeholder='Enter song name' className='form__inpt' 
                            data-realtype='text' name='title' />
                        <p className="form__helptext"></p>
                    </div>

                    <div className="form__part">
                        <label className="form__label">Song thumbnail</label>
                        <div className='flex gap--05 flex--align--end'>
                            <div className="image__prev">
                                <img id='upload-song-profile-prev' src="" />
                            </div>
                            <input type="file" onInput={(e: FormEvent<HTMLInputElement>) => 
                                useAutoState(e, setNewSong, newSong, 'file', 
                                { fileTargetId: 'upload-song-profile-prev' })}
                                placeholder='Add song thumbnail' accept='image/*'
                                className='form__inpt' data-file-type='img'
                                data-realtype='file' name='profile' />
                        </div>
                        <p className="form__helptext"></p>
                    </div>

                    <div className="form__part">
                        <label className="form__label">Genre</label>
                        <select name='genre' onChange={(e: FormEvent<HTMLSelectElement>) => 
                            useAutoState(e, setNewSong, newSong, 'text')}
                            className='select__inpt'>
                            {
                                songGenres.map(genre => (
                                    <Option val={genre}/>
                                ))
                            }
                        </select>
                    </div>
                    
                    </section>
                </div>

                <button className='form__btn self--center btn--def btn--primary'>Upload</button>
            </form>
        </div>
    )
}

export default UploadSong
