import React from 'react';
import SelectCurd from '../select/index';

const Anchor = () => {
  return (
    <div>
      <SelectCurd anchorType={'DomainAnchor'} />
      <SelectCurd anchorType={'FlowAnchor'} />
    </div>
  );
};
export default Anchor;
