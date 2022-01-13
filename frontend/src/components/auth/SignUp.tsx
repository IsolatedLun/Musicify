import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { togglePasswordVisibility, validateInputs } from '../../misc/formHandler';
import { UserForm } from '../../misc/interfaces';
import { constructFormData, popup } from '../../misc/utils';
import { useSignUpMutation } from '../../services/userServices';

const SignUp = () => {
    const { isLogged } = useAppSelector(state => state.user)
    const navigate = useNavigate();
    const [signup, { isLoading }] = useSignUpMutation();
    
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
                    popup(err.data['err'], 'err');
                }
            }
        }
    }

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setNewUser({ ...newUser, [target.name]: target.value });
    }

    const handleProfileInput = (e: FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        setNewUser({ ...newUser, profilePicture: target.files![0] })
    }

    return (
        <div className="form-container" id='main-content'>
            <form className="auth--form capitalize" encType='multipart/form-data'
                onSubmit={(e: FormEvent) => handleForm(e)}>

                <div className="form__double-part">

                    <div className="form__part">
                        <label className="form__label">First name</label>
                        <input type="text" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                            placeholder='Enter first name' className='form__inpt' 
                            data-realtype='text' name='firstName' />
                        <p className="form__helptext"></p>
                    </div>

                    <div className="form__part">
                        <label className="form__label">Last name</label>
                        <input type="text" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                            placeholder='Enter last name' className='form__inpt'
                            data-realtype='text' name='lastName' />
                        <p className="form__helptext"></p>
                    </div>

                </div>

                <div className="form__part">
                    <label className="form__label">Email address</label>
                    <input type="email" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                        placeholder='Enter email address' className="form__inpt" 
                        data-realtype='email' name='email' />
                    <p className="form__helptext"></p>
                </div>

                <div className="form__part">
                    <label className="form__label">Password</label>
                    <input id='inpt-password' type="password" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                        placeholder='Enter password' className="form__inpt" 
                        data-realtype='password' name='password' />
                    <button onClick={(e: React.MouseEvent) => togglePasswordVisibility(e, 'inpt-password')}
                        className='btn--def fa part__btn'>&#xf06e;</button>
                    <p className="form__helptext"></p>
                </div>

                <p className="form__splitter">Misc</p>

                <div className="form__part">
                    <label className="form__label">Producer name<span className='txt--muted'>* (Public username)</span></label>
                    <input type="text" onInput={(e: FormEvent<HTMLInputElement>) => handleInput(e)}
                        placeholder='Enter producer name' className='form__inpt' 
                        data-realtype='ignore' name='producerName' />
                    <p className="form__helptext"></p>
                </div>

                <div className="form__part">
                    <label className="form__label">Profile<span className='txt--muted'>*</span></label>
                    <input type="file" onInput={(e: FormEvent<HTMLInputElement>) => handleProfileInput(e)}
                        placeholder='Upload profie pciture' className='form__inpt' 
                        data-realtype='ignore' data-file-type='img' name='profilePicture' />
                    <p className="form__helptext"></p>
                </div>

                <Link to='/login' className='form__link' replace>Already have an account?</Link>

                <button className="btn--def btn--primary form__btn">Sign in</button>

            </form>
        </div>
    )
}

export default SignUp
