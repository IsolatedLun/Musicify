import React, { FormEvent } from 'react';
import songGenres from '../../json/genres.json';
import Option from '../utils/Option';

const UploadSong = () => {

    const handleInput = (e: FormEvent<HTMLInputElement>) => {

    }

    return (
        <div className="upload-song-container">
            <form className="upload-song__form">
                <div className="form__divider">
                    <section>
                        <div className="form__part">
                            <label htmlFor="song-input" className='form__label-drop-inpt fa'>&#xf1c7;</label>
                            <input data-realtype='file' name='audio'
                            type="file" className='hidden' id='song-input' />
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
                                <img src="" />
                            </div>
                            <input type="file" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                                placeholder='Add song thumbnail' className='form__inpt' 
                                data-realtype='file' name='profile' />
                        </div>
                        <p className="form__helptext"></p>
                    </div>

                    <div className="form__part">
                        <label className="form__label">Genre</label>
                        <select>
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
