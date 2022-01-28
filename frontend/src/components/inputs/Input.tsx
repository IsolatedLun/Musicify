import React, { FormEvent } from 'react';
import { useAutoState } from '../../hooks/useAutoState';
import { togglePasswordVisibility } from '../../misc/formHandler';
import Option from '../parts/utils/Option';
import { InputProps } from './Inputs';

const Input = ({ props } : { props: InputProps }) => {
    return(
      <div className={`form__part ${props.formPartCls}`}>
          { !props.disableLabel && (
            <label className="form__label">
              { props.label }
              { props.isOptional === true && (
                <span className='txt--muted'>*</span>
              ) }
            </label>
          ) }
          <div className={`form__inpt-container 
            ${props.options !== null ? 'flex gap--05 flex--align--end' : ''}`}>

            { props.options !== null && (
              <div className="image__prev">
                <img id={props.options?.fileTargetId} src="" />
              </div>
            ) }

            {
              props.inputType === 'select'
              ?

              (
                <select
                  
                  onChange={(e: FormEvent<HTMLSelectElement>) => 
                    useAutoState(e, props.setter!, props.data!, props.type, props.options)}

                  id={props.id}
                  name={props.name}
                  className='select__inpt'
                >
                  {
                    props.selectValues!.map(val => (
                      <Option val={val}/>
                  ))
                  }
                </select>
              )
              :

              (
                <input
            
              onInput={(e: FormEvent<HTMLInputElement>) => 
                  useAutoState(e, props.setter!, props.data!, props.type, props.options)}
              
              id={props.id}
              placeholder={`Enter ${props.label}`} 
              className='form__inpt' 
              data-realtype={props.type} 
              name={props.name} 
              type={props.type}
              data-file-type={props.fileType ?? null}
              accept={`${props.accept ?? null}/*`}
              
              />
              )
            }

            { props.inputType === 'password' && 
            <button onClick={(e: React.MouseEvent) => togglePasswordVisibility(e, props.id)}
                className='btn--def fa part__btn'>&#xf06e;</button>}
          </div>

          <p className="form__helptext"></p>
      </div>
    )
};

export default Input;
