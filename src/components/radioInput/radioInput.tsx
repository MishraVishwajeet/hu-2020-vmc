import React from 'react';
import './radioInput.styles.scss';
const generateRandomID = () => {
  return btoa(`${Math.random()}`).substring(0, 12);
};

interface IRadioButtonProps {
  name: string;
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  value?: any;
}

const RadioInput = (props: IRadioButtonProps): JSX.Element => {
  const { name, checked, label, disabled, onChange, value } = props;

  const onRadioChange = () => {
    onChange && onChange(value);
  };

  const id = generateRandomID();

  return (
    <div className="radio">
      <input
        id={id}
        name={name}
        type="radio"
        checked={checked}
        disabled={disabled}
        onChange={onRadioChange}
      />
      <label htmlFor={id} className="radio-label">
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
