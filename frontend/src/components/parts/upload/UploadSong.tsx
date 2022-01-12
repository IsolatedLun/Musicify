import React, { FormEvent, useState } from 'react';
import { validateInputs } from '../../../misc/formHandler';
import { previewImage } from '../../../misc/utils';
import songGenres from '../../json/genres.json';
import Option from '../utils/Option';

const UploadSong = () => {
    interface NewSong {
        song_title: string;
        song_genre: string;
        thumbnail: File | null;
        audio: File | null;
    }

    const [newSong, setNewSong] = useState<NewSong>({
        song_title: '',
        song_genre: 'All',
        thumbnail: null,
        audio: null
    })

    const handleInput = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        setNewSong({ ...newSong, [target.name]: target.value })
    }

    const handleFileInput = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        
        if(target.files)
            setNewSong({ ...newSong, [target.name]: target.files[0] })
        
            if(target.name === 'profile')
                previewImage('upload-song-profile-prev', target.files![0], null);
    }

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault();

        const inputs = document.querySelectorAll('.form__inpt') as NodeListOf<HTMLInputElement>;

        if(validateInputs(inputs)) {

        }

    }

    return (
        <div className="upload-song-container">
            <form className="upload-song__form" onSubmit={(e: React.FormEvent) => handleForm(e)}>
                <div className="form__divider">
                    <section>
                        <div className="form__part">
                            <label htmlFor="song-input" data-fname='Add audio file'
                                className='form__label-drop-inpt fa'>&#xf1c7;
                                <input data-realtype='file' name='audio'
                                type="file" data-file-type='audio' className='form__inpt' id='song-input' />
                            </label>
                            <p className="form__helptext"></p>
                        </div>
                    </section>

                    <section>
                    <div className="form__part">
                        <label className="form__label">Song name</label>
                        <input type="text" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                            placeholder='Enter song name' className='form__inpt' 
                            data-realtype='text' name='song_title' />
                        <p className="form__helptext"></p>
                    </div>

                    <div className="form__part">
                        <label className="form__label">Song thumbnail</label>
                        <div className='flex gap--05 flex--align--end'>
                            <div className="image__prev">
                                <img id='upload-song-profile-prev' src="" />
                            </div>
                            <input type="file" onInput={(e: FormEvent<HTMLInputElement>) => handleFileInput(e)}
                                placeholder='Add song thumbnail' accept='image/*'
                                className='form__inpt' data-file-type='img'
                                data-realtype='file' name='profile' />
                        </div>
                        <p className="form__helptext"></p>
                    </div>

                    <div className="form__part">
                        <label className="form__label">Genre</label>
                        <select onChange={(e: FormEvent<HTMLSelectElement>) => handleInput(e)}
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
