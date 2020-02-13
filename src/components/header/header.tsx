import React, { useState } from 'react';
import './headerStyle.scss';
import Dropdown from '../card/instances/dropdown/dropdown';
const regionData = {
  regions: [
    {
      id: 1,
      name: 'us-east-1',
      selected: false,
      value: 'us-east-1',
    },
    {
      id: 2,
      name: 'us-east-2',
      selected: false,
      value: 'us-east-2',
    },
    {
      id: 3,
      name: 'us-west-1',
      selected: false,
      value: 'us-west-1',
    },
    {
      id: 4,
      name: 'india-1',
      selected: false,
      value: 'india-1',
    },
  ],
};
interface Region {
  name: string;
  selected: boolean;
  value: string;
}

interface HeaderProps {
  region: Region | null;
  title: string;
  selectRegion: (region: Region) => void;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const [ddTitle, setDdTitle] = useState(props.region || 'Region');
  const selectRegion = (item: any) => {
    setDdTitle(item.name);
  };

  const handleSelection = (e: any) => {
    selectRegion(e);
    props.selectRegion(e);
  };

  return (
    <div className="header">
      <p className="title">{props.title}</p>
      <Dropdown
        title={ddTitle}
        value={regionData.regions}
        selectHandler={(e: any) => handleSelection(e)}
      />
    </div>
  );
};

export default Header;
