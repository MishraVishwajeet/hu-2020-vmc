import React from 'react';
import './navbarItemStyle.scss';

interface Item {
  title: string;
  selected: boolean;
  value: string;
}

interface NavbarItemProps {
  item: Item;
  itemIndex: number;
  selTab: number;
  clickHandler: (value: string, index: number) => void;
  isEnabled: boolean;
}

const NavbarItem: React.FC<NavbarItemProps> = (props: NavbarItemProps) => {
  const { isEnabled, clickHandler, itemIndex } = props;
  const { value, title } = props.item;
  const selectedTab = props.selTab === props.itemIndex;
  let navbarClass = selectedTab ? 'navbarItem selected' : 'navbarItem';
  if (!isEnabled) {
    navbarClass = 'navbarItem disabled';
  }
  return (
    <div
      className={navbarClass}
      onClick={() => (isEnabled ? clickHandler(value, itemIndex) : null)}
    >
      {title}
    </div>
  );
};

export default NavbarItem;
