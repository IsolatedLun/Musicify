import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Upload = () => {

    const [choice, setChoice] = useState<string | null>(null);

    const selectChoice = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        const choice = target.getAttribute('data-choice') ?? null;

        if(choice !== null) {
           const radio =  document.getElementById(`choice-${choice}-input`) as HTMLInputElement;
           setChoice(choice);
           radio.click();
        }
    }

    return (
        <section className="upload">
            <div onClick={(e: React.MouseEvent) => selectChoice(e)}
                className="upload__choice flex gap--1 flex--align" data-choice='song'>
                <div className='pos--relative'>
                    <input type="radio" name="upload-choice" id='choice-song-input' />
                    <span aria-label='hidden'></span>
                </div>
                <div className="choice__content">
                    <h1 className='choice__title capitalize'>Upload song</h1>
                    <p className="choice__desc">Upload a single song.</p>
                </div>
            </div>

            <div onClick={(e: React.MouseEvent) => selectChoice(e)}
                className="upload__choice flex gap--1 flex--align" data-choice='album'>
                <div className='pos--relative'>
                    <input type="radio" name="upload-choice" id='choice-album-input' />
                    <span aria-label='hidden'></span>
                </div>
                <div className="choice__content">
                    <h1 className='choice__title capitalize'>Upload album</h1>
                    <p className="choice__desc">Upload an album.</p>
                </div>
            </div>

            <Link to={choice ? choice : ''} className='btn--def btn--primary'>
                {
                    choice
                    ? 'Next'
                    : 'Select a choice'
                }
            </Link>
        </section>
    )
}

export default Upload
