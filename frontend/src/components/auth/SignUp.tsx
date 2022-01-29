import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { useAutoState } from '../../hooks/useAutoState';
import { togglePasswordVisibility, validateInputs } from '../../misc/formHandler';
import { UserForm } from '../../misc/interfaces';
import { constructFormData, popup } from '../../misc/utils';
import { useSignUpMutation } from '../../services/userServices';
import Inputs, { InputProps } from '../inputs/Inputs';

const SignUp = () => {
    const { isLogged } = useAppSelector(state => state.user)
    const navigate = useNavigate();
    const [signup, { isLoading }] = useSignUpMutation();

    const doubleInputs: InputProps[] = [
        { inputType: 'text', label: 'first name', name: 'firstName', type: 'text', 
            id: 'first-name-inpt', options: null },
        { inputType: 'text', label: 'last name', name: 'lastName', type: 'text', 
            id: 'last-name-inpt', options: null },
    ]

    const mainInputs: InputProps[] = [
        { inputType: 'text', label: 'email address', name: 'email', type: 'text', 
            id: 'email-inpt', options: null },
        { inputType: 'text', label: 'password', name: 'password', type: 'password', 
            id: 'passwrd-inpt', options: null },
    ]

    const miscInputs: InputProps[] = [
        { inputType: 'text', label: 'producer name', name: 'producerName', type: 'text', 
            id: 'producer-name-inpt', options: null, isOptional: true },
        { inputType: 'file', label: 'profile picture', name: 'profilePicture', type: 'file', 
            id: 'profile-pic-inpt', options: { fileTargetId: 'new-profile-prev' }, fileType: 'img',
            isOptional: true, accept: 'image' },
    ]
    
    const [newUser, setNewUser] = useState<UserForm>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        producerName: '',
        profilePicture: null
    });

    useEffect(() => {
        if(isLogged) {
            navigate(-1);
        }
    }, [])

    const handleForm = async(e: FormEvent) => {
        e.preventDefault();

        const inputs = (document.querySelectorAll('.form__inpt') as NodeListOf<HTMLInputElement>)!;
        if(validateInputs(inputs)) {
            const formData: FormData | null = constructFormData(newUser);
            
            if(formData !== null) {
                try {
                    await signup(formData).unwrap();
                    navigate('/login');
                }

                catch(err: any) {
                    popup(err.data['err'], 'Error');
                }
            }
        }
    }

    return (
        <div className="form-container" id='main-content'>
            <form className="auth--form capitalize" encType='multipart/form-data'
                onSubmit={(e: FormEvent) => handleForm(e)}>

                <div className="form__double-part">

                    <Inputs props={{ setter: setNewUser, data: newUser, inputs: doubleInputs }} />

                </div>

                <Inputs props={{ setter: setNewUser, data: newUser, inputs: mainInputs }} />

                <p className="form__splitter">Misc</p>

                <Inputs props={{ setter: setNewUser, data: newUser, inputs: miscInputs }} />

                <Link to='/login' className='form__link' replace>Already have an account?</Link>

                <button className="btn--def btn--primary form__btn">Sign in</button>

            </form>
        </div>
    )
}

export default SignUp
