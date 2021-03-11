import React, {useEffect, useState} from 'react';
import AddContext from './AddContext';
import {getAllContextFlow} from '../../client-api/contextflow';
import './context_flow.css';
import {Button} from 'react-bootstrap';
import AddModuleEntity from './AddModuleEnity';
import ErrorNotice from '../Notify/ErrorNotice';
const ContextFlow = () => {
  const [error, setError] = useState();
  const [contextData, setContextData] = useState([]);
  const [add, setAdd] = useState(false);
  const [addModule, setAddModule] = useState(false);
  useEffect(() => {
    (async () => {
      const data = await getAllContextFlow();
      setContextData(data.data.arr);
    })();
  }, [setAdd, add]);
  var flow_anchor = JSON.parse(sessionStorage.getItem('FlowAnchor'));
  var domain_anchor = JSON.parse(sessionStorage.getItem('DomainAnchor'));
  var user_anchor = JSON.parse(sessionStorage.getItem('UserAnchor'));
  const Context = () => {
    setAdd(true);
  };
  return (
    <div>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <div>
        {user_anchor ? (
          <div className="user_anchor">
            <b>{user_anchor.anchor}</b>
          </div>
        ) : null}
      </div>
      {addModule ? (
        <>
          <AddModuleEntity setAddModule={setAddModule} />
        </>
      ) : null}

      {add ? <AddContext setError={setError} setAdd={setAdd} /> : null}

      <div className="context-wrapper">
        <div className="head-wrapper">
          <p>{domain_anchor ? domain_anchor.anchor : 'Domain'}</p>
          <p>{flow_anchor ? flow_anchor.anchor : 'Flow'}</p>
          <div className="sub-head">
            <p>Module Entity</p>
            <div className="button-container">
              {!add && !addModule ? (
                <Button onClick={() => Context()}>+</Button>
              ) : null}
            </div>
          </div>
        </div>
        <hr />

        {contextData.map((context, index) => (
          <ul atn={index} className="module-container">
            {' '}
            <div>
              <li>{context.domain}</li>
            </div>
            <div>
              <li>{context.flow}</li>
            </div>
            <div>
              <div className="wp-holder">
                {context.atn1 ? (
                  <>
                    {' '}
                    <li>{context.atn1}</li>{' '}
                    <div className="button-container">
                      <Button
                        variant="warning"
                        onClick={() => {
                          setAddModule(true);
                          console.log(context);
                        }}
                        className="change-button"
                      >
                        +
                      </Button>
                      <Button variant="success" className="change-button">
                        C
                      </Button>
                      <Button variant="danger">D</Button>
                    </div>
                  </>
                ) : null}
              </div>
              <div className="wp-holder">
                {context.atn2 ? (
                  <>
                    {' '}
                    <li>{context.atn2}</li>{' '}
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
                {context.atn3 ? (
                  <>
                    {' '}
                    <li>{context.atn3}</li>{' '}
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
                {context.atn4 ? (
                  <>
                    {' '}
                    <li>{context.atn4}</li>{' '}
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
