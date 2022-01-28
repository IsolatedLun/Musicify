import React from 'react';
import { AutoStateOptions } from '../../hooks/useAutoState';
import Input from './Input';

export interface Inputs {
    setter: Function;
    data: object;
    inputs: InputProps[]
}

export interface InputProps {
    setter?: Function;
    data?: Object;
    id: string
    type: string | 'text' | 'file' | 'singleStr';
    fileType?: 'img' | 'any' | 'audio'
    name: string;
    label: string;
    inputType?: 'text' | 'file' | 'audio' | 'password' | 'select';
    options?: AutoStateOptions | null;
    selectValues?: string[];

    accept?: string;
    isOptional?: boolean;
}

const Inputs = ({ props } : { props: Inputs }) => {
    return <>{
        props.inputs.map(input => (
        
        <Input props={{ ...input, setter: props.setter, data: props.data }} />
        ))
    }</>

};

export default Inputs;
