import React, {useState, useEffect, useContext} from 'react';
import CreatableSelect from 'react-select/creatable';
import WordPhraseClientApi from '../../client-api/word-phrase';
import {UserContext} from '../../provider/UserProvider';
import {Form, Button} from 'react-bootstrap';
import toastr from 'toastr';

const WordPhrase = ({
  name,
  setModule,
  setDomain,
  setFlow,
  isMulti,
  setAddModuleData,
}) => {
  const user_data = useContext(UserContext);
  const [userData, setUserData] = user_data.user;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [Label, setLabel] = useState([]);
  const [edit, setEdit] = useState(false);
  const [dataToBeChange, setDataChange] = useState();
  const [selected, isSelected] = useState(false);
  const [IsDelete, SetDelete] = useState(false);

  useEffect(() => {
    if (value !== null) {
      setDataChange(value.wp);
    } else {
      setDataChange(null);
    }
  }, [value, setLoading]);

  //hendle onchange for select creatable form and saving the selected data to session storage
  const handleChange = (data) => {
    var c_data = {};
    var key_name = name;
    isSelected(true);
    setValue(data);
    if (data) {
      c_data[key_name] = data.wp;
    }
    if (setDomain) {
      setDomain(c_data);
    }
    if (setFlow) {
      setFlow(c_data);
    }
    if (setModule) {
      setModule(data);
    }
    if (setAddModuleData) {
      setAddModuleData(data);
    }
  };
  //creating new anchor and saving to the db
  const handleCreate = (data) => {
    setLoading(true);

    let d = {wp: data, owner: userData.user._id};

    WordPhraseClientApi.saveWordPhrase(d).then((res) => {
      setLoading(false);
    });
  };

  //handle ooChange function for edit data form
  const handleAnchorChange = (e) => {
    setDataChange(e.target.value);
  };

  //getting all data from db
  useEffect(() => {
    (async () => {
      await WordPhraseClientApi.getAllWordPhrase().then((result) => {
        setData(result.data);
      });
    })();
  }, [loading, setLoading]);

  //passing an extra attribute named "label" to the array of obects as it needed by creatable components
  useEffect(() => {
    (async () => {
      let wdata = data.map((e) => {
        e.label = e.wp;
        e.value = e.wp;
        return e;
      });

      setLabel(wdata);
    })();
  }, [data]);

  //updating the anchor value in the DB
  const updateAnchor = (e) => {
    e.preventDefault();
    setLoading(true);
    setEdit(false);
    const d = {
      id: value._id,
      data: dataToBeChange,
      owner: userData.user._id,
    };
    WordPhraseClientApi.updateWordPhraseById(d).then((res) => {
      if (res.data.err) {
        toastr.warning(`${res.data.err}`);
        setLoading(false);
      } else {
        var sd = {
          _id: res.data.data._id,
          wp: res.data.data.wp,
          __v: res.data.data.__v,
          owner: res.data.data.owner,
          label: res.data.data.wp,
        };
        setValue(sd);
        setLoading(false);
      }
    });
  };

  //deleting the anchor from db
  const deleteAnchor = (e) => {
    e.preventDefault();
    setLoading(true);
    SetDelete(false);
    var d = {
      id: value._id,
      owner: userData.user._id,
    };
    WordPhraseClientApi.deleteWordPhraseById(d).then((res) => {
      setValue(null);
      if (res.data.err) {
        toastr.warning(`${res.data.err}`);
      }
      if (res.data.msg) {
        toastr.success(`${res.data.msg}`);
      }
      setLoading(false);
      setEdit(false);
    });
  };
  return (
    <div>
      <div className="select-wrapper">
        <div>
          <div className="form-wrapper">
            <p>{name ? name : 'word phrase'}</p>
            {/* this is the form where we can update the value this will appear when we click on the edit button by setEdit(true) */}
            {edit && value ? (
              <>
                <Form id="edit-form" onSubmit={updateAnchor}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="component"
                      onChange={handleAnchorChange}
                      value={dataToBeChange ? dataToBeChange : ''}
                      placeholder="Edit Anchor"
                    />
                  </Form.Group>

                  <Button
                    variant="success"
                    style={{margin: '5px'}}
                    form="edit-form"
                    type="submit"
                  >
                    save
                  </Button>

                  <Button variant="danger" onClick={() => setEdit(false)}>
                    cancel
                  </Button>
                </Form>
              </>
            ) : null}

            {IsDelete && value ? (
              <>
                {' '}
                <Form id="delete-form" onSubmit={deleteAnchor}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="components"
                      value={dataToBeChange ? dataToBeChange : ''}
                      placeholder="Edit Anchor"
                      disabled
                    />
                  </Form.Group>
                  <Button
                    variant="danger"
                    style={{margin: '5px'}}
                    form="delete-form"
                    type="submit"
                  >
                    confirm delete
                  </Button>
                  <Button variant="success" onClick={() => SetDelete(false)}>
                    cancel
                  </Button>
                </Form>
              </>
            ) : null}
          </div>
          {/* this is the creatable components with some basic inline css */}
          <div className="select-inner-wrapper">
            <div style={{marginBottom: '30px'}}>
              {isMulti ? (
                <CreatableSelect
                  maxMenuHeight={200}
                  isMulti
                  isClearable
                  isDisabled={false}
                  isLoading={loading}
                  onChange={handleChange}
                  onCreateOption={handleCreate}
                  options={data}
                  value={value}
                />
              ) : (
                <CreatableSelect
                  maxMenuHeight={200}
                  isClearable
                  isDisabled={false}
                  isLoading={loading}
                  onChange={handleChange}
                  onCreateOption={handleCreate}
                  options={data}
                  value={value}
                />
              )}
            </div>
            <div>
              {isMulti ? null : (
                <>
                  {selected && !edit && !IsDelete && value ? (
                    <>
                      <Button
                        variant="success"
                        style={{margin: '5px'}}
                        onClick={() => setEdit(true)}
                      >
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => SetDelete(true)}>
                        Delete
                      </Button>
                    </>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WordPhrase;
