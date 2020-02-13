import React from 'react';
import './reviewAndLaunchStyle.scss';
import Button from '../../button/button';
import Platform from '../platform';
import Card from '../../card/card';
import InputBox from '../../inputBox/inputBox';

interface Storage {
  type: string;
  volume: string;
  capacity: number;
  encryption: boolean;
  iops: number;
  backupReqd: boolean;
  remarks: string;
}

interface Instance {
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

interface Rule {
  type: string;
  protocol: string;
  portRange: number;
  source: string;
  desc: string;
}

interface ReviewAndLaunchProps {
  lanchScreenData: {
    image: { title: string; description: string };
    instance: Instance;
    bandwidth: number;
    storage: Storage[];
    securityGroups: Rule[];
    numberOfInstances: number;
  };
  goToScreen: (screenIndex: number) => void;
  setInstanceNo: (instanceCount: number) => void;
  noOfInstances: number;
  isPreBuiltSelected: boolean;
  download: (data: any) => void;
  selectedImageType?: string;
}

const ReviewAndLaunch: React.FC<ReviewAndLaunchProps> = (props: ReviewAndLaunchProps) => {
  const { setInstanceNo, noOfInstances, lanchScreenData, isPreBuiltSelected } = props;
  const { image, instance, bandwidth, storage } = lanchScreenData;
  const getStorageCards = () => {
    const storageArray = storage.map((item, index: number) => (
      <div key={index}>
        {}
      </div>
    ));
    return storageArray;
  };

  return (
    <div className="reviewContainer">
      <div className="buttonContainer">
        <Button type="primary" title="Generate JSON" onClick={props.download} />
      </div>
      <div className="subComponent">
        <div className="subComponentHeader">
          <span className="title">Image</span>
          <button className="edit" onClick={() => props.goToScreen(0)}>
            EDIT
          </button>
        </div>
        <Platform
          key={0}
          platform={image}
          clickHandler={() => console.log('')}
          showSelectedImageType={props.selectedImageType}
        />
      </div>
      <div className="subComponent">
        <div className="subComponentHeader w30">
          <span className="title">Instance</span>
          <button className="edit" onClick={() => props.goToScreen(1)}>
            EDIT
          </button>
        </div>
        <Card data={instance} cardIndex={-1} clickHandler={() => console.log()} />
      </div>
      <div>
        <div className="subComponentHeader w30">
          <span className="title">Bandwidth</span>
          <button className="edit" onClick={() => props.goToScreen(2)}>
            EDIT
          </button>
        </div>
      </div>
      <div>
        <div className="subComponentHeader w90">
          <span className="title">Storage</span>
          <button className="edit" onClick={() => props.goToScreen(isPreBuiltSelected ? 1 : 2)}>
            EDIT
          </button>
        </div>
        {getStorageCards()}
      </div>
      <div>
        <div className="subComponentHeader">
          <span className="title">Number of Instances</span>
        </div>
        <div className="inputContainer">
          <InputBox
            value={noOfInstances}
            type="number"
            onChangeHandler={e => setInstanceNo(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewAndLaunch;
