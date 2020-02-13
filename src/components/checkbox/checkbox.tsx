import React from 'react';
import './checkboxStyle.scss';

interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  clickHandler: () => void;
  testId?: string;
}

const Checkbox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
  const checkedClass = props.checked ? 'checked' : '';
  const isDisabled = props.disabled ? 'checkbox disabled' : 'checkbox';
  return (
    <div onClick={props.clickHandler} className={isDisabled} data-testid={props.testId}>
      <div className={checkedClass}></div>
    </div>
  );
};

export default Checkbox;
