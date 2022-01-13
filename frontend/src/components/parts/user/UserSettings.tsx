import React, { useEffect, useState } from 'react';
import { save, setChangesMade } from '../../../features/user.slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { API_URL, GET_PROFILE } from '../../../misc/consts';
import { isImage, validateInputs } from '../../../misc/formHandler';
import { User } from '../../../misc/interfaces';
import { areObjectsEqual, constructFormData, fullReload, popup, previewImage } from '../../../misc/utils';
import Loader from '../../layout/Loader';

const UserSettings = () => {
    const { user, changesMade, doSave } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const [editableUser, setEditableUser] = useState<User>(user!);
    const [isVerified, setIsVerified] = useState<boolean>(true);

    useEffect(() => {
        setEditableUser(user!);
    }, [user])

    useEffect(() => {
        if(user) {
            if(!areObjectsEqual(user, editableUser)) {
                dispatch(setChangesMade(true));
                setIsVerified(false);
            }
    
            else {
                dispatch(setChangesMade(false));
            }
        }

        return(() => {
            dispatch(setChangesMade(false));
        })
    }, [editableUser])

    useEffect(() => {
        const formData = constructFormData(editableUser);
        if(formData !== null && doSave && isVerified) {
            dispatch(save(formData));
            fullReload();
        }

        else if(!isVerified) {
            popup('Verify changes first.', 'err');
        }
    }, [doSave])

    const handleProfileInput = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        if(target.files && isImage(target.files[0])) {
            setEditableUser({ ...editableUser, [target.name]: target.files[0] });
            previewImage('user-settings-profile-preview', target.files[0], GET_PROFILE + user!.id)
        }

        else {
            popup('Only images are allowed.', 'err');
            dispatch(setChangesMade(false));
        }
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setEditableUser({ ...editableUser, [target.name]: target.value })
    }

    const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const inputs = document.querySelectorAll('.form__inpt') as NodeListOf<HTMLInputElement>;

        if(inputs && validateInputs(inputs)) {
            dispatch(setChangesMade(true));
            setIsVerified(true);
        }

        else {
            dispatch(setChangesMade(false));
        }
    }

    if(user && editableUser)
        return (
            <div className='user__settings flex flex--col gap--1'>
                <div className="setting__part flex flex--col flex--align flex--center">
                    <label className='part__label'>Profile</label>
                    <div className='part__content'>
                        <div className="form__part">
                            <div className="part__profile-preview">
                                <img id='user-settings-profile-preview' src={GET_PROFILE + user!.id}/>
                            </div>
                            <input type="file" onInput={(e: React.FormEvent<HTMLInputElement>) => 
                                handleProfileInput(e)} accept='images/*'
                                placeholder='Update profile' className='form__inpt' data-null='true'
                                data-realtype='file' data-file-type='img' name='profile' />
                            <p className="form__helptext"></p>
                        </div>
                    </div>
                </div>

                <form className="setting_form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleForm(e)}>
                    <div className="setting__part flex flex--col gap--05">
                        <label className="part__label">First name</label>
                        <div className="form__part">
                            <input onInput={(e: React.FormEvent<HTMLInputElement>) => handleInput(e)} 
                            type="text" name='first_name' placeholder='Change first name'
                            value={editableUser.first_name}
                            className=" form__inpt" data-realtype='text' />
                            <p className="form__helptext"></p>
                        </div>
                    </div>

                    <div className="setting__part flex flex--col gap--05">
                        <label className="part__label">Last name</label>
                        <div className="form__part">
                            <input onInput={(e: React.FormEvent<HTMLInputElement>) => handleInput(e)} 
                            type="text" name='last_name' placeholder='Change last name' 
                            value={editableUser.last_name}
                            className=" form__inpt" data-realtype='text' />
                            <p className="form__helptext"></p>
                        </div>
                    </div>

                    <button className='form__btn btn--def btn--primary'>Verify</button>
                </form>


            </div>
        )
    else
        return(<Loader text='Loading your settings...'/>)
}

export default UserSettings
