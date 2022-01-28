import React, { FormEvent, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAutoState } from '../../../hooks/useAutoState';
import { validateInputs } from '../../../misc/formHandler';
import { NewSong } from '../../../misc/interfaces';
import { constructFormData, getAudioLength, popup, previewImage } from '../../../misc/utils';
import { usePostSongToAlbumMutation } from '../../../services/albumService';
import { useUploadSongMutation } from '../../../services/musicService';
import Input from '../../inputs/Input';
import Inputs, { InputProps } from '../../inputs/Inputs';
import filters from '../../json/filters.json';
import Option from '../utils/Option';

const UploadSong = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const uploadMode = searchParams.get('for');
    const albumId = searchParams.get('id');

    const inputs: InputProps[] = [
        { inputType: 'text', label: 'song name', name: 'title', type: 'text', 
            id: 'song-name-inpt', options: null },
        { inputType: 'file', label: 'song thumbnail', name: 'profile', type: 'file', 
            id: 'thumbnail-inpt', options: { fileTargetId: 'song-prev-thumbnail' }, fileType: 'img' },
        { inputType: 'select', label: 'song genre', name: 'genre', type: 'text', 
        id: 'song-genre-select', options: null, selectValues: filters.genres },
    ]

    const [newSong, setNewSong] = useState<NewSong>({
        title: '',
        genre: 'All',
        profile: null,
        audio: null
    })

    const [songUpload, { isLoading }] = useUploadSongMutation();
    const [albumSongUpload, { isSuccess }] = usePostSongToAlbumMutation();

    const handleForm = async(e: React.FormEvent) => {
        e.preventDefault();
    
        const inputs = document.querySelectorAll('.form__inpt') as NodeListOf<HTMLInputElement>;

        if(validateInputs(inputs)) {
            const formData: FormData | null = constructFormData(newSong);

            if(formData !== null) {
                await getAudioLength(newSong.audio!)
                    .then((duration: any) => formData.append('duration', duration));

                try {
                    const songId = await songUpload(formData).unwrap();
                    if(uploadMode === 'album') {
                        await albumSongUpload({ albumId, songId }).unwrap();
                        navigate('/user/albums');
                    }

                    else {
                        navigate('/browse');
                    }
                }

                catch(err: any) {
                    popup(err.data['err'], 'Error');
                }
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

                    <Inputs props={{ setter: setNewSong, data: newSong, inputs: inputs }} />
                    
                    </section>
                </div>

                <button className='form__btn self--center btn--def btn--primary'>Upload</button>
            </form>
        </div>
    )
}

export default UploadSong
