import React, {useEffect, useState} from 'react';
import SelectCurd from '../select/index';
import './anchor.css';

const Anchor = () => {
  const [domain, setDomain] = useState();
  const [flow, setFlow] = useState();
  const [user, setUser] = useState();

  return (
    <div>
      {domain ? (
        <div className="anchor">
          <b>Domain Anchor:{domain.anchor}</b>
        </div>
      ) : null}
      {flow ? (
        <div className="anchor">
          <b>Flow Anchor:{flow.anchor}</b>
        </div>
      ) : null}
      {user ? (
        <div className="anchor">
          <b>user Anchor:{user.anchor}</b>
        </div>
      ) : null}
      <SelectCurd anchorType={'DomainAnchor'} setDomain={setDomain} />
      <SelectCurd anchorType={'FlowAnchor'} setFlow={setFlow} />
      <SelectCurd anchorType={'UserAnchor'} setUser={setUser} />
    </div>
  );
};
export default Anchor;
