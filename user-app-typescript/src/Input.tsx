import React from 'react';

interface InputProps {
  label: string;
  id: string;
  type?: 'email' | 'text';
  onChange: React.ChangeEventHandler;
  value: string;
}

const Input: React.FunctionComponent<InputProps> = props => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input
        id={props.id}
        type={props.type || 'text'}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
