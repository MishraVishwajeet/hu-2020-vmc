import React from 'react';
import './cardStyle.scss';

interface CardData {
  title: string;
  name: string;
  cpuCore: string;
  storage: string;
  memory: string;
  ipv6: string;
  selected: boolean;
  cpuCost: number;
  memoryCost: number;
}

interface CardProps {
  cardIndex: number;
  clickHandler: (data: CardData, cardIndex: number) => void;
  data: CardData;
  setCostEstimateAction?: any;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const radioClass = props.data.selected ? 'cardRadioBtn selected' : 'cardRadioBtn';

  const handleClickOnCard = () => {
    props.clickHandler(props.data, props.cardIndex);
  };

  return (
    <div className="card" onClick={handleClickOnCard}>
      <div className="cardHeader">
        <div className="cardTitle">{props.data.title}</div>
        <div className="cardName">{props.data.name}</div>
        <div className={radioClass}></div>
      </div>
      <div className="cardBody">
        <div className="cardContent">
          <div>{props.data.cpuCore}</div>
          <div>{props.data.ipv6}</div>
        </div>
        <div className="cardContent">
          <div>{props.data.memory}</div>
          <div>{props.data.storage}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
