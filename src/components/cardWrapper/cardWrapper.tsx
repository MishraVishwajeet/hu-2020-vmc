import React from 'react';
import './cardWrapper.styles.scss';

const CardWrapper = (props: any): JSX.Element => {
  const { customClassName, children } = props;
  const classNames = `card-wrapper ${customClassName}`;
  return <div className={classNames}>{children}</div>;
};

export default CardWrapper;
