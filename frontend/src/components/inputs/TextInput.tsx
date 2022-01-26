import React, { FormEvent } from 'react';
import { useAutoState } from '../../hooks/useAutoState';

export interface InputProps {
    setter: Function;
    data: Object;
    type: string | 'text' | 'file' | 'singleStr';
    name: string;
    label: string;
    
    // labelCls: string[];
    // inputCls: string[];
    // helpTextCls: string[];
}

const TextInput = ({ props } : { props: InputProps }) => {

  return(
    <div className="form__part">
        <label className="form__label">{ props.label }</label>
        <input 
        
            onInput={(e: FormEvent<HTMLInputElement>) => 
                useAutoState(e, props.setter, props.data, props.type)}

            placeholder={`Enter ${props.label}`} 
            className='form__inpt' 
            data-realtype={props.type} name={props.name} 
            type="text"
            
            />

        <p className="form__helptext"></p>
    </div>
  )
};

export default TextInput;
