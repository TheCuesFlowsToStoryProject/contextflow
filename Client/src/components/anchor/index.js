import React from 'react';
import SelectCurd from '../select/index';

const Anchor = () => {
  return (
    <div>
      <SelectCurd anchorType={'UserAnchor'} />
      <SelectCurd anchorType={'DomainAnchor'} />
      <SelectCurd anchorType={'FlowAnchor'} />
      <SelectCurd anchorType={'Titan.DemoAnchor'} />
    </div>
  );
};
export default Anchor;
