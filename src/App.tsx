import React, { useState, useEffect } from 'react';
import './App.scss';
import Platform from './components/platform/platform';
import InstanceContainer from './components/card/instances/instanceContainer';
import ReviewAndLaunch from './components/platform/reviewAndLaunch/reviewAndLaunch';
import Header from './components/header/header';
import Estimates from './components/estimates/estimates';
import NavbarItem from './components/navbarItem/navbarItem';
import Button from './components/button/button';
import Modal from './components/modal/modal';
  
const App: React.FC = () => {
  const launchScreenData = {
    image: {
      title: '',
      description: '',
      imageTypes: [
        {
          type: '',
          selected: true,
        },
      ],
    },
    instance: {
      title: '',
      name: 'General Purpose',
      cpuCore: '',
      storage: '',
      memory: '',
      ipv6: 'IPV6 Supported',
      selected: true,
      cpuCost: 0,
      memoryCost: 0,
    },
    bandwidth: 512,
    storage: [
      {
        type: '',
        volume: 'Root',
        capacity: 0,
        encryption: true,
        iops: 0,
        backupReqd: false,
        remarks: 'some remarks',
      },
    ],
    securityGroups: [{ type: '', protocol: 'TCP', portRange: 0, source: '', desc: '' }],
    numberOfInstances: 0,
  };
   const navbarData = {
    tabs: [
      {
        title: '1. Choose Image',
        selected: true,
        value: 'Choose Image',
      },
      {
        title: '2. Choose Instance Type',
        selected: false,
        value: 'Choose Instance Type',
      },
      {
        title: '3. Choose Storage and Network',
        selected: false,
        value: 'Choose Storage And Network',
      },
      {
        title: '4. Configure Security',
        selected: false,
        value: 'Configure Security',
      },
      {
        title: '5. Review & Launch',
        selected: false,
        value: 'Review & Launch',
      },
    ],
  };
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
  const securityData = {
    name: '',
    radioButtons: [
      {
        type: 'Create a new security group',
        selected: true,
      },
      {
        type: 'Select an existing security group',
        selected: false,
      },
    ],
    existingSecurityGroups: [
      {
        name: 'Security SG 1',
        selected: false,
        rules: [
          {
            type: 'HTTPS',
            protocol: 'TCP',
            portRange: 443,
            source: '110.101.164.1',
            desc: 'Security G1',
          },
        ],
      },
      {
        name: 'Security SG 2',
        selected: false,
        rules: [
          {
            type: 'HTTPS',
            protocol: 'TCP',
            portRange: 443,
            source: '110.101.164.21',
            desc: 'Security G2.1',
          },
          {
            type: 'SSH',
            protocol: 'TCP',
            portRange: 22,
            source: '110.101.164.22',
            desc: 'Security G2.2',
          },
        ],
      },
    ],
    selectedSG: {
      name: '',
      rules: [{ type: '', protocol: 'TCP', portRange: 0, source: '', desc: '' }],
    },
    ruleTypes: [
      {
        name: 'HTTPS',
        selected: false,
        value: 'HTTPS',
      },
      {
        name: 'SSH',
        selected: false,
        value: 'SSH',
      },
      {
        name: 'SMTP',
        selected: false,
        value: 'SMTP',
      },
    ],
    rules: [{ type: '', protocol: 'TCP', portRange: 0, source: '', desc: '' }],
  };
const storageAndNetworkData = {
    name: 'Choose Storage And Network',
    storageTypes: [
      {
        name: 'Magnetic Disks',
        min: '40 GB',
        max: '2 TB',
        price: 20,
        selected: true,
      },
      {
        name: 'SSD',
        min: '20 GB',
        max: '512 GB',
        price: 40,
        selected: false,
      },
    ],
    storage: [
      {
        type: '',
        volume: 'Root',
        capacity: 0,
        encryption: false,
        iops: 100,
        backupReqd: false,
        remarks: '',
      },
    ],
  };
   const platformData = {
    name: 'Choose Image',
    images: [
      {
        id: 'Image1',
        title: 'Linux 2 Image',
        description:
          'Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance',
        cost: 243.61,
        imageTypes: [
          {
            type: '64-bit (x86)',
            selected: true,
          },
          {
            type: '64-bit (ARM)',
            selected: false,
          },
        ],
        regions: [1, 2, 3, 4],
      },
      {
        id: 'Image2',
        title: 'Ubuntu Server 18.04 LTS',
        description:
          'Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance',
        cost: 243.61,
        imageTypes: [
          {
            type: '64-bit (x86)',
            selected: true,
          },
          {
            type: '64-bit (ARM)',
            selected: false,
          },
        ],
        regions: [1, 2, 3, 4],
      },
      {
        id: 'Image3',
        title: 'Red Hat Enterprise Linux 8',
        description:
          'Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance',
        cost: 300,
        imageTypes: [
          {
            type: '64-bit (x86)',
            selected: true,
          },
          {
            type: '64-bit (ARM)',
            selected: false,
          },
        ],
        regions: [1, 2, 3, 4],
      },
      {
        id: 'Image4',
        title: 'Microsoft Windows Server 2019 Base',
        description:
          'Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance',
        cost: 338.77,
        imageTypes: [
          {
            type: '64-bit (x86)',
            selected: false,
          },
        ],
        regions: [1, 2],
      },
      {
        id: 'Image5',
        title: 'SUSE Linux Enterprise Server',
        description:
          'Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance',
        cost: 200.22,
        imageTypes: [
          {
            type: '64-bit (x86)',
            selected: true,
          },
          {
            type: '64-bit (ARM)',
            selected: false,
          },
        ],
        regions: [1, 2, 3, 4],
      },
    ],
  };
  
  const [title, setTitle] = useState('Choose Image');
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [selPlatform, setSelPlatform] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedInstance, setSelectedInstance] = useState(0);
  
  const [costEstimate, setCostEstimate] = useState<any>({});
  const [isInstanceNetwork, setIsInstanceNetwork] = useState(false);
  const [outboundTraffic, setOutboundTraffic] = useState(0);
   const instanceData = {
    name: 'Choose Instance Type',
    instances: [
      {
        title: 'General Purpose',
        prebuiltConfiguration: [
          {
            title: 'G1',
            name: 'General Purpose',
            cpuCore: '1 CPU',
            storage: '256GB Storage',
            memory: '0.5GB RAM',
            ipv6: 'IPV6 Supported',
            selected: false,
            cpuCost: 0,
            memoryCost: 0,
          },
          {
            title: 'G2',
            name: 'General Purpose',
            cpuCore: '2 CPU',
            storage: '512GB Storage',
            memory: '1GB RAM',
            ipv6: 'IPV6 Supported',
            selected: false,
            cpuCost: 0,
            memoryCost: 0,
          },
          {
            title: 'G3',
            name: 'General Purpose',
            cpuCore: '4 CPU',
            storage: '1TB Storage',
            memory: '4GB RAM',
            ipv6: 'IPV6 Supported',
            selected: false,
            cpuCost: 0,
            memoryCost: 0,
          },
        ],
        cpuCores: [
          {
            name: '1 Core',
            selected: false,
            price: 0,
          },
          {
            name: '2 Core',
            selected: false,
            price: 0,
          },
          {
            name: '4 Core',
            selected: false,
            price: 0,
          },
        ],
        memory: [
          {
            name: '256 MB',
            selected: false,
            price: 0,
          },
          {
            name: '512 MB',
            selected: false,
            price: 0,
          },
          {
            name: '1 GB',
            selected: false,
            price: 0,
          },
          {
            name: '2 GB',
            selected: false,
            price: 0,
          },
          {
            name: '4 GB',
            selected: false,
            price: 0,
          },
        ],
      },
      {
        title: 'CPU Optimised',
        prebuiltConfiguration: [
          {
            title: 'C1',
            name: 'CPU Optimised',
            cpuCore: '1 CPU',
            storage: '256GB Storage',
            memory: '2GB RAM',
            ipv6: 'IPV6 Supported',
            selected: false,
            cpuCost: 0,
            memoryCost: 0,
          },
          {
            title: 'C2',
            name: 'CPU Optimised',
            cpuCore: '4 CPU',
            storage: '512GB Storage',
            memory: '8GB RAM',
            ipv6: 'IPV6 Supported',
            selected: false,
            cpuCost: 0,
            memoryCost: 0,
          },
          {
            title: 'C3',
            name: 'CPU Optimised',
            cpuCore: '8 CPU',
            storage: '1TB Storage',
            memory: '16GB RAM',
            ipv6: 'IPV6 Supported',
            selected: false,
            cpuCost: 20,
            memoryCost: 0,
          },
        ],
        cpuCores: [
          {
            name: '1 Core',
            selected: false,
            price: 0,
          },
          {
            name: '2 Core',
            selected: false,
            price: 0,
          },
          {
            name: '8 Core',
            selected: false,
            price: 20,
          },
          {
            name: '16 Core',
            selected: false,
            price: 40,
          },
        ],
        memory: [
          {
            name: '16 GB',
            selected: false,
            price: 0,
          },
          { 
            name: '32 GB',
            selected: false,
            price: 20,
          },
          {
            name: '64 GB',
            selected: false,
            price: 40,
          },
        ],
      },
      {
        title: 'Storage Optimised',
        prebuiltConfiguration: [
          {
            title: 'S1',
            name: 'Storage Optimised',
            cpuCore: '1 CPU',
            storage: '256GB Storage',
            memory: '16GB RAM',
            ipv6: 'IPV6 Supported',
            selected: false,
            cpuCost: 0,
            memoryCost: 0,
          },
          {
            title: 'S2',
            name: 'Storage Optimised',
            cpuCore: '8 CPU',
            storage: '512GB Storage',
            memory: '32GB RAM',
            ipv6: 'IPV6 Supported',
            selected: false,
            cpuCost: 20,
            memoryCost: 20,
          },
          {
            title: 'S3',
            name: 'Storage Optimised',
            cpuCore: '16 CPU',
            storage: '1TB Storage',
            memory: '64GB RAM',
            ipv6: 'IPV6 Supported',
            selected: false,
            cpuCost: 40,
            memoryCost: 40,
          },
        ],
        cpuCores: [
          {
            name: '1 Core',
            selected: false,
            price: 0,
          },
          {
            name: '8 Core',
            selected: false,
            price: 20,
          },
          {
            name: '16 Core',
            selected: false,
            price: 40,
          },
        ],
        memory: [
          {
            name: '16 GB',
            selected: false,
            price: 0,
          },
          {
            name: '32 GB',
            selected: false,
            price: 20,
          },
          {
            name: '64 GB',
            selected: false,
            price: 40,
          },
        ],
      },
      {
        title: 'Network Optimised',
        prebuiltConfiguration: [
          {
            title: 'N1',
            name: 'Network Optimised',
            cpuCore: '2 CPU',
            storage: '256GB Storage',
            memory: '2GB RAM',
            ipv6: 'IPV6 Supported',
            selected: false,
            cpuCost: 0,
            memoryCost: 0,
          },
          {
            title: 'N2',
            name: 'Network Optimised',
            cpuCore: '4 CPU',
            storage: '512GB Storage',
            memory: '16GB RAM',
            ipv6: 'IPV6 Supported',
            selected: false,
            cpuCost: 0,
            memoryCost: 0,
          },
          {
            title: 'N3',
            name: 'Network Optimised',
            cpuCore: '8 CPU',
            storage: '1TB Storage',
            memory: '32GB RAM',
            ipv6: 'IPV6 Supported',
            selected: false,
            cpuCost: 20,
            memoryCost: 20,
          },
        ],
        cpuCores: [
          {
            name: '1 Core',
            selected: false,
            price: 0,
          },
          {
            name: '2 Core',
            selected: false,
            price: 0,
          },
          {
            name: '4 Core',
            selected: false,
            price: 0,
          },
          {
            name: '8 Core',
            selected: false,
            price: 20,
          },
          {
            name: '16 Core',
            selected: false,
            price: 40,
          },
        ],
        memory: [
          {
            name: '256 MB',
            selected: false,
            price: 0,
          },
          {
            name: '512 MB',
            selected: false,
            price: 0,
          },
          {
            name: '1 GB',
            selected: false,
            price: 0,
          },
          {
            name: '2 GB',
            selected: false,
            price: 0,
          },
          {
            name: '4 GB',
            selected: false,
            price: 0,
          },
          {
            name: '16 GB',
            selected: false,
            price: 0,
          },
          {
            name: '32 GB',
            selected: false,
            price: 20,
          },
          {
            name: '64 GB',
            selected: false,
            price: 40,
          },
        ],
      },
    ],
  };
  const [insti, setInsti] = useState(instanceData);
  const [lanchScreenData, setLaunchScreenData] = useState(launchScreenData);
  const [tabs, setTabState] = useState([true, false, false, false, false]);
  const [tabVal, setTabVal] = useState([false, false, false, false, false]);
  const [isPreBuiltSelected, setIsPreBuiltSelected] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState('64-bit (x86)');
  const [noOfInstances, setNoOfInstances] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('Some Message');
  const [modalTitle, setModalTitle] = useState('Title');
  const [modalOkAction, setModalOkAction] = useState(null);

  const oppo = (title: string, message: string, action?: any) => {
    setShowModal(true);
    setModalMessage(message);
    setModalTitle(title);
    setModalOkAction(action);
  };

  const onClose = (e: any) => {
    setShowModal(false);
  };

  const setTabStateAction = (indexes: number[], state: boolean) => {
    const tabStateCopy = [...tabs];
    for (const index of indexes) {
      tabStateCopy[index] = state;
    }
    setTabState([...tabStateCopy]);
  };

  const setTabValidationAction = (index: number, state: boolean) => {
    const tabValidationCopy = [...tabVal];
    tabValidationCopy[index] = state;
    setTabVal([...tabValidationCopy]);
  };

  const goBackToTab1 = () => {
    setSelectedTab(0);
    setTabStateAction([1, 2, 3, 4], false);
    setSelPlatform(null);
  };

  useEffect(() => {
    if (selPlatform) {
      setCostEstimateAction({
        image: { title: selPlatform.title, cost: selPlatform.cost },
      });
      setTabStateAction([1], true);
      setTabValidationAction(1, true);
    } else {
      delete costEstimate.image;
    }
  }, [selPlatform]);

  useEffect(() => {
    if (selPlatform) {
      if (!selPlatform.regions.includes(selectedRegion.id)) {
        oppo('Warning', 'This image is not available in this region.', goBackToTab1);
      }
    }
  }, [selectedRegion]);

  useEffect(() => {
    const instancesSelectedArray = [];
    const preConfigs = insti.instances[selectedInstance].prebuiltConfiguration;
    for (const preConf of preConfigs) {
      instancesSelectedArray.push(preConf);
    }
    const selectedIndex = instancesSelectedArray.findIndex(item => item.selected);
    if (instancesSelectedArray.some(item => item.selected)) {
      setTabValidationAction(1, true);
      setIsPreBuiltSelected(true);
      setTabStateAction([2, 3], false);
      setCostEstimateAction({
        cpuCore: {
          title: instancesSelectedArray[selectedIndex].cpuCore,
          cost: instancesSelectedArray[selectedIndex].cpuCost,
        },
        memory: {
          title: instancesSelectedArray[selectedIndex].memory,
          cost: instancesSelectedArray[selectedIndex].memoryCost,
        },
      });
    } else {
      setTabValidationAction(1, false);
      setIsPreBuiltSelected(false);
      setTabStateAction([4], false);
      delete costEstimate.cpuCore;
      delete costEstimate.memory;
    }
  }, [insti]);

  const selectPlatform = (pform: any) => {
    const data = { ...lanchScreenData };
    data.image.title = pform.title;
    data.image.description = pform.description;
    data.image.imageTypes[0].type = data.image.imageTypes[0].type
      ? pform.imageTypes.find((item: any) => item.selected).type
      : '64-bit (x86)';
    setSelPlatform(pform);
  };

  const setSelectedTabAction = (tab: number) => {
    setSelectedTab(tab);
  };

  const setCostEstimateAction = (newCost: any) => {
    setCostEstimate({
      ...costEstimate,
      ...newCost,
    });
  };

  const setNetworkBandwidthPrice = () => {
    let cost = 0;
    if (outboundTraffic >= 512 && outboundTraffic < 1024) {
      cost = 5;
    } else if (outboundTraffic >= 1024 && outboundTraffic < 1536) {
      cost = 10;
    } else if (outboundTraffic >= 1536 && outboundTraffic <= 2048) {
      cost = 20;
    }
    if (cost) {
      setCostEstimateAction({
        bandwidth: { title: 'Network Bandwidth', cost },
      });
    }
  };

  useEffect(() => {
    setNetworkBandwidthPrice();
  }, [outboundTraffic]);

  const platforms = platformData.images.map(( platform, index) => (
    <Platform
      key={index}
       platform={ platform}
      clickHandler={selectPlatform}
      selectedPlatform={selPlatform}
      setSelectedTabAction={setSelectedTabAction}
      setCostEstimateAction={setCostEstimateAction}
      setTitleAction={setTitle}
      oppo={oppo}
      selectedRegion={selectedRegion}
      setSelectedImageType={setSelectedImageType}
      selectedImageType={selectedImageType}
    />
  ));

  const instanceHadler = (instanceIndex: number) => {
    const networkOptimised = instanceIndex === 3 ? true : false;
    const launchScrData = { ...lanchScreenData };
    if (!networkOptimised && outboundTraffic > 1023) {
      setOutboundTraffic(1024);
    }
    launchScrData.instance.name = insti.instances[instanceIndex].title;
    setLaunchScreenData(launchScrData);
    setIsInstanceNetwork(networkOptimised);
    setSelectedInstance(instanceIndex);
  };

  const memoryHandler = (memory: any) => {
    const launchScrData = { ...lanchScreenData };
    launchScrData.instance.memory = memory.name;
    setLaunchScreenData(launchScrData);
  };

  const cpuCoreHandler = (cpuCore: any) => {
    const launchScrData = { ...lanchScreenData };
    launchScrData.instance.cpuCore = `${cpuCore.name.split(' ')[0]} CPU`;
    setLaunchScreenData(launchScrData);
  };

  const back = () => {
    if (selectedTab !== 0) {
      let scrIndex = selectedTab - 1;
      if (selectedTab === 4 && isPreBuiltSelected) {
        scrIndex = 1;
      }
      setSelectedTab(scrIndex);
      setTitle(navbarData.tabs[scrIndex].value);
    }
  };

  const proceed = () => {
    let scrIndex = selectedTab + 1;
    switch (selectedTab) {
      case 1:
        if (!costEstimate.hasOwnProperty('cpuCore') || !costEstimate.hasOwnProperty('memory')) {
          oppo('Warning', 'Please select the configurations to proceed');
          return;
        }
        scrIndex = isPreBuiltSelected ? 4 : scrIndex;
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        oppo('Success', 'VM launched successfully');
        return;
    }
    setTabValidationAction(selectedTab, true);
    setTabStateAction([scrIndex], true);
    setSelectedTab(scrIndex);
    setTitle(navbarData.tabs[scrIndex].value);
  };

  const regionSelected = (item: any) => {
    setSelectedRegion(item);
  };

  const cardClicked = (cardData: any, cardIndex: number) => {
    const launchScrData = { ...lanchScreenData };
    const instanceData = { ...insti };
    const instanceIndex = instanceData.instances.findIndex(
      instance => instance.title === cardData.name,
    );
    instanceData.instances[instanceIndex].prebuiltConfiguration.map((item, index) => {
      if (cardIndex !== index) {
        instanceData.instances[instanceIndex].prebuiltConfiguration[index].selected = false;
      }
    });
    instanceData.instances[instanceIndex].prebuiltConfiguration[cardIndex].selected = !instanceData
      .instances[instanceIndex].prebuiltConfiguration[cardIndex].selected;
    launchScrData.instance = instanceData.instances[instanceIndex].prebuiltConfiguration[cardIndex];
    setLaunchScreenData(launchScrData);
    setInsti(instanceData);
  };

  
  const goToScreen = (scrIndex: number) => {
    setSelectedTab(scrIndex);
    setTitle(navbarData.tabs[scrIndex].value);
  };

  const setInstanceNo = (instanceCount: number) => {
    setNoOfInstances(instanceCount);
  };

  const downloadJSON = () => {
    const jsonData = {
      region: selectedRegion.name,
      image: selPlatform,
      instance: insti.instances[selectedInstance],
      networkBandwidth: outboundTraffic,
      cost: costEstimate,
    };
    download(jsonData);
  };
  
  
  const download = (content: any) => {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(content)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'vm.json';
    a.click();
  };
  
  const getContent = () => {
    let content: any = platforms;
    switch (selectedTab) {
      case 0:
        content = platforms;
        break;
      case 1:
        content = (
          <InstanceContainer
            selectedInstance={selectedInstance}
            instanceData={insti}
            cardClicked={cardClicked}
            instanceHadler={instanceHadler}
            setCostEstimateAction={setCostEstimateAction}
            memoryHandler={memoryHandler}
            cpuCoreHandler={cpuCoreHandler}
            oppo={oppo}
          />
        );
        break;
      case 2:
      case 3:
      case 4:
        content = (
          <ReviewAndLaunch
            setInstanceNo={setInstanceNo}
            noOfInstances={noOfInstances}
            goToScreen={goToScreen}
            lanchScreenData={lanchScreenData}
            isPreBuiltSelected={isPreBuiltSelected}
            download={downloadJSON}
            selectedImageType={selectedImageType}
          />
        );
        break;
    }
    return content;
  };

  const getFooter = () => {
    const footer = (
      <div className="footer-container">
        {selectedTab === 4 && <Button type="danger" title="Cancel" onClick={goBackToTab1} />}
        {selectedTab !== 0 && <Button type="secondary" title="Back" onClick={back} />}
        {selectedTab !== 4 && selectedTab !== 0 && (
          <Button type="primary" title="Proceed" onClick={proceed} />
        )}
        {selectedTab === 4 && <Button type="success" title="Launch" onClick={proceed} />}
      </div>
    );
    return footer;
  };

  const clickHandler = (title: string, itemIndex: number): void => {
    setTitle(title);
    setSelectedTab(itemIndex);
  };
  const navbarItems = navbarData.tabs.map((item, index) => (
    <div key={index} className="navbar-item">
      <NavbarItem
        item={item}
        selTab={selectedTab}
        itemIndex={index}
        clickHandler={clickHandler}
        isEnabled={tabs[index]}
      />
    </div>
  ));
  return (
    <div>
      <header className="appHeader">
      <h1>HVC</h1>
    </header>
      <main className="main-container">
        <section>
          <Header
            region={selectedRegion}
            title={title}
            selectRegion={(e: any) => regionSelected(e)}
          />
          <div className="navbar-container">{navbarItems}</div>
          {getContent()}
          {getFooter()}
        </section>
        <Estimates costEstimateData={costEstimate} />
        <Modal
          show={showModal}
          text={modalMessage}
          onClose={onClose}
          title={modalTitle}
          okAction={modalOkAction}
        />
      </main>
    </div>
  );
};
export default App;
