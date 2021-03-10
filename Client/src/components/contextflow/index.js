import React, {useEffect, useState} from 'react';
import AddContext from './AddContext';
import {getAllContextFlow} from '../../client-api/contextflow';
import './context_flow.css';
import {Button} from 'react-bootstrap';
import SelectCurd from '../select/index';
import ErrorNotice from '../Notify/ErrorNotice';
const ContextFlow = () => {
  const [error, setError] = useState();
  const [contextData, setContextData] = useState([]);
  const [add, setAdd] = useState(false);
  useEffect(() => {
    (async () => {
      const data = await getAllContextFlow();
      setContextData(data.data.arr);
    })();
  }, [setAdd, add]);
  var flow_anchor = JSON.parse(sessionStorage.getItem('FlowAnchor'));
  var domain_anchor = JSON.parse(sessionStorage.getItem('DomainAnchor'));
  const Context = () => {
    setAdd(true);
  };
  return (
    <div>
      {console.log(contextData)}
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <div>
        <SelectCurd anchorType={'UserAnchor'} />
      </div>
      <div>
        {add ? <AddContext setError={setError} setAdd={setAdd} /> : null}
      </div>

      <div className="context-wrapper">
        <div className="head-wrapper">
          <p>{domain_anchor ? domain_anchor.anchor : 'Domain'}</p>
          <p>{flow_anchor ? flow_anchor.anchor : 'Flow'}</p>
          <div className="sub-head">
            <p>Module Entity</p>
            <div className="button-container">
              <Button onClick={() => Context()}>+</Button>
            </div>
          </div>
        </div>
        <hr />
        {contextData.map((context, index) => (
          <ul key={index} className="module-container">
            {' '}
            <div>
              <li>{context.domain}</li>
            </div>
            <div>
              <li>{context.flow}</li>
            </div>
            <div>
              <div className="wp-holder">
                {context.key1 ? (
                  <>
                    {' '}
                    <li>{context.key1}</li>{' '}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.key2 ? (
                  <>
                    {' '}
                    <li>{context.key2}</li>{' '}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.key3 ? (
                  <>
                    {' '}
                    <li>{context.key3}</li>{' '}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.key4 ? (
                  <>
                    {' '}
                    <li>{context.key4}</li>{' '}
                    <div className="button-container">
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};
export default ContextFlow;
