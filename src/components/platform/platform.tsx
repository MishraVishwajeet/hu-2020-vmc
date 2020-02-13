import React, { useState } from 'react';
import './platformStyle.scss';
import Button from '../button/button';
import { BtnType } from '../button/button';
import CardWrapper from '../cardWrapper/cardWrapper';
import RadioInput from '../radioInput/radioInput';
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

interface Platform {
  title: string;
  description: string;
  imageTypes?: any;
  id?: string;
  cost?: any;
  regions?: any;
}

interface PlatformProps {
   platform: Platform;
  clickHandler: (selectedPlatform: Platform) => void;
  key: number;
  selectedPlatform?: any;
  setSelectedTabAction?: (tab: number) => void;
  setCostEstimateAction?: (newCost: any) => void;
  setTitleAction?: (title: string) => void;
  oppo?: (title: string, text: string, action?: any) => void;
  selectedRegion?: any;
  setSelectedImageType?: any;
  selectedImageType?: string;
  showSelectedImageType?: string;
}

const Platform: React.FC<PlatformProps> = (props: PlatformProps) => {
  const {
     platform,
    selectedPlatform,
    setSelectedTabAction,
    setTitleAction,
    oppo,
    selectedRegion,
    setSelectedImageType,
  } = props;
  const { title, description, imageTypes } =  platform;

  const [imageTypeState, setImageTypeState] = useState(imageTypes);
  const [imgType, setImgType] = useState('64-bit (x86)');

  const onRadioInputChange = (value: string) => {
    const imageTypeCopy = [...imageTypeState];
    for (const imgType of imageTypeCopy) {
      if (imgType.type === value) {
        imgType.selected = true;
        setImgType(imgType.type);
      } else {
        imgType.selected = false;
      }
    }
    setImageTypeState(imageTypeCopy);
  };

  const getRadioButtons = () => {
    if (props.showSelectedImageType) {
      return props.showSelectedImageType;
    }
    if (!imageTypeState) return null;
    if (imageTypeState.length === 1) {
      return <span style={{ fontSize: '14px' }}>{imageTypeState[0].type}</span>;
    }
    return imageTypeState.map((imageType: any, index: number) => {
      return (
        <RadioInput
          name={title}
          label={imageType.type}
          key={index}
          checked={imageType.selected}
          onChange={onRadioInputChange}
          value={imageType.type}
        />
      );
    });
  };

  const isSelected = () => {
    if (!selectedPlatform) return false;
    return selectedPlatform.id ===  platform.id;
  };

  const getClassNames = () => {
    return `platformOuterContainer ${isSelected() ? 'border-style' : ''}`;
  };

  const onImageSelectHandler = () => {
    if (!selectedRegion) {
      oppo && oppo('Warning', 'Please select the Region first');
      return;
    }
    if (! platform.regions.includes(selectedRegion.id)) {
      oppo && oppo('Warning', 'This image is not available in the selected region');
      return;
    }
    props.clickHandler( platform);
    setSelectedImageType && setSelectedImageType(imgType);
    setSelectedTabAction && setSelectedTabAction(1);
    setTitleAction && setTitleAction(navbarData.tabs[1].value);
  };

  return (
    <CardWrapper customClassName={getClassNames()}>
      <div className="flexContent">
        <div className="platformImage"></div>
        <div className="platformDetailContainer">
          <p className="platformTitle">{title}</p>
          <p className="platformDesc">{description}</p>
        </div>
      </div>
      <div>
        <div>{getRadioButtons()}</div>
        <div className="paltform-btn">
          <Button
            title={isSelected() ? 'Selected' : 'Select'}
            onClick={onImageSelectHandler}
            type={BtnType.PRIMARY}
            disabled={isSelected()}
          />
        </div>
      </div>
    </CardWrapper>
  );
};

export default Platform;
