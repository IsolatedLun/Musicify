import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fullReload } from '../../../misc/utils';
import { usePostDeleteItemMutation } from '../../../services/rootService';

const DeleteView = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const type: string = searchParams.get('for')!;
    const id: string = searchParams.get('id')!;
    const name: string = searchParams.get('name')!;

    const [deleteItem, { isSuccess }] = usePostDeleteItemMutation();

    const postDeleteItem = async() => {
        await deleteItem({ id, type });
    }

    useEffect(() => {
        if(isSuccess) {
            navigate('/user/albums');
            fullReload();
        }

    }, [isSuccess])

    return(
        <div className="delete-container">
            <div className="delete__part">
                <h1 className="delete__title">
                    Delete { type } <span className='title__highlight'>{ name }</span>
                </h1>

                <div className="btn--group">
                    <button onClick={() => postDeleteItem()}
                        className='btn--def btn--primary btn--warn err cust'>Yes</button>
                    <button onClick={() => navigate(-1)}
                    className='btn--def btn--primary'>No</button>
                </div>
            </div>
        </div>
    )
};

export default DeleteView;
