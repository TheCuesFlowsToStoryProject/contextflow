import React from 'react';
import WordPhrase from '../word-phrase/index';
import {Button} from 'react-bootstrap';

const AddModuleEntity = ({setAddModule}) => {
  return (
    <div>
      <WordPhrase />
      <div style={{width: '200px', margin: 'auto', marginTop: '10px'}}>
        <Button variant="danger" onClick={() => setAddModule(false)}>
          cancel
        </Button>
        <Button style={{marginLeft: '10px'}}> confirm add</Button>
      </div>
    </div>
  );
};
export default AddModuleEntity;
