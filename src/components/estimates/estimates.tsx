import React from 'react';
import './estimatesStyle.scss';
import CardWrapper from '../cardWrapper/cardWrapper';

interface IEstimates {
  costEstimateData: any;
}

const Estimates: React.FC<IEstimates> = (props: IEstimates) => {
  const { costEstimateData } = props;

  const convertToDisplayCostFormat = (cost: number, month = false) => {
    return month ? `$${cost.toFixed(2)} / mo` : `$${cost.toFixed(2)}`;
  };

  const getEstimates = () => {
    return Object.keys(costEstimateData).map((estimate: any, index: number) => {
      return (
        <p key={index} className="estimate-item">
          <span>{costEstimateData[estimate].title}</span>
          <span>{convertToDisplayCostFormat(costEstimateData[estimate].cost)}</span>
        </p>
      );
    });
  };

  const getTotalCost = () => {
    const costs = Object.keys(costEstimateData).map((estimate: any) => {
      return costEstimateData[estimate].cost;
    });
    const totalCost = costs.reduce((a, b) => a + b, 0);
    return totalCost;
  };

  return (
    <aside className="estimatesContainer">
      <CardWrapper>
        <div className="estimates">
          <div className="estimatesTitle">Cost Estimates</div>
          <div className="estimatesDetail">{getEstimates()}</div>
          <div>
            <hr />
          </div>
          <div className="estimatesTotal">{convertToDisplayCostFormat(getTotalCost(), true)}</div>
        </div>
      </CardWrapper>
    </aside>
  );
};

export default Estimates;
