import React from 'react';
import './inputBoxStyle.scss';

interface InputBoxProps {
  type: string;
  onChangeHandler?: (event: any) => void;
  value: string | number;
  disabled?: boolean;
  placeholder?: string;
}

const InputBox: React.FC<InputBoxProps> = (props: InputBoxProps) => {
  const { value, type, disabled, placeholder } = props;
  return (
    <input
      className="inputBox"
      value={value}
      type={type}
      onChange={e => props.onChangeHandler && props.onChangeHandler(e)}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

export default InputBox;
