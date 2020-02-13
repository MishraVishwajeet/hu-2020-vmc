import React from 'react';
import './instanceStyle.scss';

interface CPUcore {
  name: string;
  selected: boolean;
  price: number;
}

interface Memory {
  name: string;
  selected: boolean;
  price: number;
}

interface Item {
  title: string;
  cpuCores: CPUcore[];
  memory: Memory[];
}

interface InstanceProps {
  item: Item;
  itemIndex: number;
  selInstance: number;
  clickHandler: (index: number) => void;
}

const Instance: React.FC<InstanceProps> = (props: InstanceProps) => {
  const { title } = props.item;
  const selectedTab = props.selInstance === props.itemIndex;
  const instanceClass = selectedTab ? 'instance selected' : 'instance';
  return (
    <div className={instanceClass} onClick={() => props.clickHandler(props.itemIndex)}>
      {title}
    </div>
  );
};

export default Instance;
