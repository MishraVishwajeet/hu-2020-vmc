import React, { useState } from 'react';
import './instanceContainerStyle.scss';
import Instance from './instance';
import Card from '../card';
import Dropdown from './dropdown/dropdown';

interface PrebuiltConfiguration {
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

interface Instance {
  title: string;
  prebuiltConfiguration: PrebuiltConfiguration[];
  cpuCores: CPUcore[];
  memory: Memory[];
}

interface InstanceData {
  name: string;
  instances: Instance[];
}

interface InstanceContainerProps {
  instanceData: InstanceData;
  selectedInstance: number;
  instanceHadler: (instanceIndex: number) => void;
  cardClicked: (cardData: PrebuiltConfiguration, index: number) => void;
  setCostEstimateAction?: any;
  memoryHandler: (memoryItem: any) => void;
  cpuCoreHandler: (cpuCore: any) => void;
  oppo?: any;
}

const InstanceContainer: React.FC<InstanceContainerProps> = (props: InstanceContainerProps) => {
  const [prebuiltConf, setPrebuiltConf] = useState(
    props.instanceData.instances[props.selectedInstance].prebuiltConfiguration,
  );
  const initialCPU = 'CPU Cores';
  const initialMemory = 'Memory';
  const [CPUtitle, setCPUtitle] = useState(initialCPU);
  const [memoryTitle, setMemoryTitle] = useState(initialMemory);

  const { setCostEstimateAction } = props;

  const clickHandler = (itemIndex: number): void => {
    props.oppo &&
      props.oppo(
        'Warning',
        'Changing the instance will make changes to the configurations. All data will be lost',
      );
    setCPUtitle(initialCPU);
    setMemoryTitle(initialMemory);
    props.instanceHadler(itemIndex);
    setPrebuiltConf(props.instanceData.instances[itemIndex].prebuiltConfiguration);
  };

  const instances = props.instanceData.instances.map((instance, index) => (
    <div key={index}>
      <Instance
        item={instance}
        itemIndex={index}
        selInstance={props.selectedInstance}
        clickHandler={clickHandler}
      />
    </div>
  ));

  const getPrebuiltConfs = () => {
    const filteredConf = props.instanceData.instances.find(
      item => item.title === prebuiltConf[0].name,
    );
    const conf =
      filteredConf &&
      filteredConf.prebuiltConfiguration.map((item, index) => (
        <div key={index}>
          <Card
            data={item}
            cardIndex={index}
            clickHandler={props.cardClicked}
            setCostEstimateAction={setCostEstimateAction}
          />
        </div>
      ));
    return conf;
  };

  const selectCPUcore = (selItem: any) => {
    setCPUtitle(selItem.name);
    props.cpuCoreHandler(selItem);
    setCostEstimateAction &&
      setCostEstimateAction({
        cpuCore: { title: selItem.name, cost: selItem.price },
      });
  };

  const selectMemory = (selItem: any) => {
    setMemoryTitle(selItem.name);
    props.memoryHandler(selItem);
    setCostEstimateAction &&
      setCostEstimateAction({
        memory: { title: selItem.name, cost: selItem.price },
      });
  };

  const createConfiguration = () => {
    const isCardSelected = props.instanceData.instances[
      props.selectedInstance
    ].prebuiltConfiguration.find(item => item.selected);
    const filteredConf = props.instanceData.instances.find(
      item => item.title === prebuiltConf[0].name,
    );
    return (
      !isCardSelected &&
      filteredConf && (
        <>
          <p className="createConf">Create Configuration</p>
          <div className="configurations">
            <Dropdown
              title={CPUtitle}
              value={filteredConf.cpuCores}
              selectHandler={(e: any) => selectCPUcore(e)}
            />
            <Dropdown
              title={memoryTitle}
              value={filteredConf.memory}
              selectHandler={(e: any) => selectMemory(e)}
            />
          </div>
        </>
      )
    );
  };

  return (
    <div className="instanceContainer">
      <div className="instances">{instances}</div>
      <div className="configurationContainer">
        <p className="configurationHeader">Prebuilt Configurations</p>
        <div className="configurations">{getPrebuiltConfs()}</div>
        {createConfiguration()}
      </div>
    </div>
  );
};

export default InstanceContainer;
