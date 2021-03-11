import React, {useState, useContext} from 'react';
import WordPhrase from '../word-phrase/index';
import './context_flow.css';
import {Button} from 'react-bootstrap';
import {saveContextFlow} from '../../client-api/contextflow';
import {UserContext} from '../../provider/UserProvider';

const AddContext = ({setAdd, setError}) => {
  const [domain, setDomain] = useState();
  const [flow, setFlow] = useState();
  const [module_entity, setModule] = useState([]);
  var flow_anchor = JSON.parse(sessionStorage.getItem('FlowAnchor'));
  var domain_anchor = JSON.parse(sessionStorage.getItem('DomainAnchor'));
  var user_anchor = JSON.parse(sessionStorage.getItem('UserAnchor'));
  const value = useContext(UserContext);
  const [userData, setUserData] = value.user;

  var ModuleEntity = module_entity.map(function (item) {
    return item['wp'];
  });

  const saveContext = async () => {
    if (domain && flow && flow_anchor && domain_anchor && userData.user) {
      let d = [
        domain,
        flow,
        {FlowAnchor: flow_anchor.anchor},
        {DomainAnchor: domain_anchor.anchor},
        {UserAnchor: user_anchor.anchor},
        {uid: userData.user._id},
        ModuleEntity,
      ];

      saveContextFlow(d).then((res) => {
        console.log(res);
        setError(res.data.err);
        setAdd(false);
      });
    } else {
      alert('Plesae select all the field');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="section">
          <WordPhrase setDomain={setDomain} name={'domain'} />
        </div>
        <div className="section">
          <WordPhrase setFlow={setFlow} name={'flow'} />
        </div>
        <div className="section">
          <WordPhrase
            setModule={setModule}
            isMulti={'isMulti'}
            name={'Module_entity'}
          />
          -
        </div>
      </div>
      <div style={{width: '200px', margin: 'auto'}}>
        <Button
          variant="danger"
          onClick={() => {
            setAdd(false);
          }}
        >
          cancel
        </Button>
        <Button
          onClick={() => {
            saveContext();
          }}
          style={{marginLeft: '10px'}}
        >
          {' '}
          confirm add
        </Button>
      </div>
    </div>
  );
};
export default AddContext;
