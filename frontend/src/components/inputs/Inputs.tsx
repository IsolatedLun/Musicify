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
    disableLabel?: boolean;
    formPartCls?: string;
}

/**
 * @param props -{
 *  @param setter
 *  @param data
 *  @param id
 *  @param type > If useState is not an {} then use **text**, else use **singleStr**, 
 *  if it's a file use **file**, also used for validation
 *  @param fileType > **any** | **img** | **audio**, if img then it's displayed
 *  @param name > important for setting the state. [target.name]: target.value
 *  @param label > label of the input
 *  @param inputType > **text** | **file** | **audio** | **password** | **select**
 *      - **password**: Allows the input visibility to be toggleable
 *  @param options > Used for displaying the img
 *  @param selectValues > Options for the select input
 *  @param accept - What file should the input accept
 *  @param isOptional - If true, displays an *
 *  @param disableLabel
 *  @param formPartCls
 * }-
 * 
*/
const Inputs = ({ props } : { props: Inputs }) => {
    return <>{
        props.inputs.map((input, idx) => (
        
        <Input key={idx} props={{ ...input, setter: props.setter, data: props.data }} />
        ))
    }</>

};

export default Inputs;
