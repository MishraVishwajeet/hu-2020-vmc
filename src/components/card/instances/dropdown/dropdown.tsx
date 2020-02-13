import React from 'react';
import './dropdownStyle.scss';

interface DropDownProps {
  selectHandler: (item: any) => void;
  value: any;
  title: any;
  disabled?: boolean;
}

const DropDown: React.FC<DropDownProps> = (props: DropDownProps) => {
  const ddClass = props.disabled ? 'disabled dropdownContainer' : 'dropdownContainer';
  const listItems = props.value.map((item: any, index: number) => {
    return (
      <span key={index} onClick={e => props.selectHandler(item)}>
        {item.name}
      </span>
    );
  });
  return (
    <div className={ddClass}>
      <button className="dropdown">{props.title}</button>
      <div className="dropdownContent">{listItems}</div>
    </div>
  );
};

export default DropDown;
