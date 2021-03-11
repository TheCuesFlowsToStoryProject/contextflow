import React, {useState} from 'react';
import WordPhrase from '../word-phrase/index';
import {Button} from 'react-bootstrap';
import {updateContextFlowById} from '../../client-api/contextflow';
import ErrorNotice from '../Notify/ErrorNotice';

const AddModuleEntity = ({setAddModule, atn, context}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState();

  const AddModuleEntity = async () => {
    if (data) {
      const arrl = Object.entries(context);
      var arr = [];
      arrl.filter(([key, value]) => {
        if (key.includes('atn')) {
          arr.push(value);
        }
      });

      var n = arr.includes(data.wp);
    }
    if (!n) {
      if (data && context && atn) {
        var index = atn + 1;
        const obj1 = {
          value: data._id,
          contextId: context._id,
          owner: context.uid,
          key: `atn${index}`,
        };

        updateContextFlowById(obj1)
          .then((res) => {
            setAddModule(false);
            setError(res.data.err);
          })
          .catch((err) => {
            setAddModule(false);
          });
      } else {
        alert('please select one module entity');
      }
    } else {
      alert('This Module Entity already exist');
    }
  };
  return (
    <div>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <WordPhrase setAddModuleData={setData} name={'add module entity'} />
      <div style={{width: '200px', margin: 'auto', marginTop: '10px'}}>
        <Button variant="danger" onClick={() => setAddModule(false)}>
          cancel
        </Button>
        <Button style={{marginLeft: '10px'}} onClick={() => AddModuleEntity()}>
          {' '}
          confirm add
        </Button>
      </div>
    </div>
  );
};
export default AddModuleEntity;
