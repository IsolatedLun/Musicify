import React, { useEffect, useState } from 'react'
import { setChangesMade } from '../../../features/user.slice'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { API_URL } from '../../../misc/consts'
import { User } from '../../../misc/interfaces'
import { areObjectsEqual } from '../../../misc/utils'

const UserSettings = () => {
    const { user, changesMade, doSave } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const [editableUser, setEditableUser] = useState<User>({ ...user! })
    const profilePreview = document.getElementById('profile-preview') as HTMLImageElement;

    useEffect(() => {
        if(user) {
            if(!areObjectsEqual(user, editableUser)) {
                dispatch(setChangesMade(true));
            }
    
            else {
                dispatch(setChangesMade(false));
            }
        }
    }, [editableUser])

    useEffect(() => {
        
    }, [doSave])

    const handleProfileInput = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if(target.files) {
            setEditableUser({ ...editableUser, [target.name]: target.files[0] });
        }

    }



    if(user)
        return (
            <div className='user__settings flex flex--col gap--1'>
                <div className="setting__part flex flex--col flex--align flex--center">
                    <label className='part__label'>Profile</label>
                    <div className='part__content'>
                        <div className="form__part">
                            <div className="part__profile-preview">
                                <img id='profile-preview' src={!changesMade 
                                ?
                                API_URL + 'users/profiles/' + user.id
                                : window.URL.createObjectURL(editableUser.profile)} />
                            </div>
                            <input type="file" onInput={(e: React.FormEvent<HTMLInputElement>) => 
                                handleProfileInput(e)}
                                placeholder='Update profile' className='form__inpt' 
                                data-realtype='file' data-file-type='img' name='profile' />
                            <p className="form__helptext"></p>
                        </div>
                    </div>
                </div>


            </div>
        )
    else
        return(<></>)
}

export default UserSettings
