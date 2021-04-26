import React, { useState, useEffect, useContext } from "react";
import CreatableSelect from "react-select/creatable";
import WordPhraseClientApi from "../../client-api/word-phrase";
import { UserContext } from "../../provider/UserProvider";
import { Row, Form } from "react-bootstrap";
import toastr from "toastr";
import "./Wordphrase.css";

const WordPhrase = ({
  name,
  setModel,
  setDomain,
  setFlow,
  isMulti,
  setAddModulesData,
  heading,
  selectValue,
  setSelectDomain,
  setSelectFlow,
  setSelectmodelEntity,
  // model_entity,
  background,
}) => {
  const user_data = useContext(UserContext);
  const [userData] = user_data.user;
  const user = userData.user !== undefined ? userData.user : userData.user2;

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
  useEffect(() => {
    if (value) {
      if (setSelectDomain) {
        const obj = { domain: value.wp };
        setSelectDomain(obj);
      }
      if (setSelectFlow) {
        const obj = { flow: value.wp };
        setSelectFlow(obj);
      }
      if (setSelectmodelEntity) {
        const obj = { model_entity: value.wp };
        setSelectmodelEntity(obj);
      }
      if (setDomain) {
        const obj = { domain: value.wp };
        setDomain(obj);
      }
      if (setFlow) {
        const obj = { flow: value.wp };
        setFlow(obj);
      }
      if (setAddModulesData) {
        setAddModulesData(value);
      }
    }
  }, [
    value,
    setLoading,
    setAddModulesData,
    setDomain,
    setFlow,
    setSelectDomain,
    setSelectFlow,
    setSelectmodelEntity,
  ]);

  useEffect(() => {
    if (selectValue) {
      const selectObj = { wp: selectValue, label: selectValue };
      setValue(selectObj);
      if (setSelectDomain) {
        const setObj = { domain: selectObj.wp };
        setSelectDomain(setObj);
      }
      if (setSelectFlow) {
        const setObj = { flow: selectObj.wp };
        setSelectFlow(setObj);
      }
      if (setSelectmodelEntity) {
        const setObj = { model_entity: selectObj.wp };
        setSelectmodelEntity(setObj);
      }
    }
  }, [selectValue, setSelectDomain, setSelectFlow, setSelectmodelEntity]);

  //hendle onchange for select creatable form and saving the selected data to session storage
  const handleChange = (data) => {
    var c_data = {};
    var key_name = name;
    isSelected(true);
    if (data) {
      c_data[key_name] = data.wp;
    }
    setValue(data);
    if (setModel) {
      setModel(data);
    }
  };
  //creating new anchor and saving to the db
  const handleCreate = (data) => {
    if (user) {
      setLoading(true);

      let d = { wp: data, owner: user._id };

      WordPhraseClientApi.saveWordPhrase(d).then((res) => {
        var sd = {
          _id: res.data.data._id,
          wp: res.data.data.wp,
          __v: res.data.data.__v,
          owner: res.data.data.owner,
          label: res.data.data.wp,
          value: res.data.data.wp,
        };
        setLoading(false);
        setValue(sd);
        setLoading(false);
      });
    } else {
      alert("Please log in");
    }
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
      owner: user._id,
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
      owner: user._id,
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
  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      width: "260px",
    }),
  };
  return (
    <div
      className="select-wrapper-2"
      style={{ background: background ? background : "blue" }}
    >
      <div>
        <div className="form-wrapper-2">
          <p>
            {heading ? (
              <>
                <b> {heading}</b>
              </>
            ) : (
              "word phrase"
            )}
          </p>
          {/* this is the form where we can update the value this will appear when we click on the edit button by setEdit(true) */}
          {edit && value ? (
            <>
              <Form id="edit-form" onSubmit={updateAnchor}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="component"
                    onChange={handleAnchorChange}
                    value={dataToBeChange ? dataToBeChange : ""}
                    placeholder="Edit Anchor"
                  />
                </Form.Group>
                <button
                  className="border-button"
                  style={{ margin: "5px" }}
                  form="edit-form"
                  type="submit"
                >
                  save
                </button>

                <button
                  className="border-button"
                  onClick={() => setEdit(false)}
                >
                  cancel
                </button>
              </Form>
            </>
          ) : null}

          {IsDelete && value ? (
            <>
              {" "}
              <Form id="delete-form" onSubmit={deleteAnchor}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="components"
                    value={dataToBeChange ? dataToBeChange : ""}
                    placeholder="Edit Anchor"
                    disabled
                  />
                </Form.Group>
                <button
                  className="border-button"
                  style={{ margin: "5px" }}
                  form="delete-form"
                  type="submit"
                >
                  confirm delete
                </button>
                <button
                  className="border-button"
                  onClick={() => SetDelete(false)}
                >
                  cancel
                </button>
              </Form>
            </>
          ) : null}
        </div>
        {/* this is the creatable components with some basic inline css */}
        {/* <div className="select-inner-wrapper"> */}
        <Row>
          <div className="creatable-2">
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
                styles={customStyles}
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
                styles={customStyles}
              />
            )}
          </div>
          <div className="button-wrapper-2">
            {/* <div> */}
            {isMulti ? null : (
              <>
                {selected && !edit && !IsDelete && value ? (
                  <>
                    <button
                      className="trnsparent-button"
                      style={{ margin: "5px" }}
                      onClick={() => setEdit(true)}
                    >
                      C
                    </button>
                    <button
                      className="trnsparent-button"
                      onClick={() => SetDelete(true)}
                    >
                      D
                    </button>
                  </>
                ) : null}
              </>
            )}
          </div>
        </Row>
        {/* </div> */}
      </div>
    </div>
  );
};
export default WordPhrase;

// import React, { useState, useEffect, useContext } from "react";
// import CreatableSelect from "react-select/creatable";
// import WordPhraseClientApi from "../../client-api/word-phrase";
// import { UserContext } from "../../provider/UserProvider";
// import { Form, Button } from "react-bootstrap";
// import toastr from "toastr";
// import "./Wordphrase.css";

// const WordPhrase = ({
//   name,
//   setModel,
//   setDomain,
//   setFlow,
//   isMulti,
//   setAddModulesData,
//   heading,
//   selectValue,
//   setSelectDomain,
//   setSelectFlow,
//   setSelectmodelEntity,
// }) => {
//   const user_data = useContext(UserContext);
//   const [userData, setUserData] = user_data.user;
//   const user = userData.user !== undefined ? userData.user : userData.user2;

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [value, setValue] = useState([]);
//   const [Label, setLabel] = useState([]);
//   const [edit, setEdit] = useState(false);
//   const [dataToBeChange, setDataChange] = useState();
//   const [selected, isSelected] = useState(false);
//   const [IsDelete, SetDelete] = useState(false);
//   useEffect(() => {
//     if (value !== null) {
//       setDataChange(value.wp);
//     } else {
//       setDataChange(null);
//     }
//   }, [value, setLoading]);

//   useEffect(() => {
//     if (selectValue) {
//       const selectObj = { wp: selectValue, label: selectValue };
//       setValue(selectObj);
//       if (setSelectDomain) {
//         const setObj = { domain: selectObj.wp };
//         setSelectDomain(setObj);
//       }
//       if (setSelectFlow) {
//         const setObj = { flow: selectObj.wp };
//         setSelectFlow(setObj);
//       }
//       if (setSelectmodelEntity) {
//         const setObj = { model_entity: selectObj.wp };
//         setSelectmodelEntity(setObj);
//       }
//     }
//   }, [selectValue, setSelectDomain, setSelectFlow, setSelectmodelEntity]);

//   //hendle onchange for select creatable form and saving the selected data to session storage
//   const handleChange = (data) => {
//     var c_data = {};
//     var key_name = name;
//     isSelected(true);
//     setValue(data);
//     if (data) {
//       c_data[key_name] = data.wp;
//     }
//     if (setDomain) {
//       setDomain(c_data);
//     }
//     if (setFlow) {
//       setFlow(c_data);
//     }
//     if (setModel) {
//       setModel(data);
//     }
//     if (setAddModulesData) {
//       setAddModulesData(data);
//     }
//     if (setSelectDomain) {
//       setSelectDomain(c_data);
//     }
//     if (setSelectFlow) {
//       setSelectFlow(c_data);
//     }
//     if (setSelectmodelEntity) {
//       setSelectmodelEntity(c_data);
//     }
//   };
//   //creating new anchor and saving to the db
//   const handleCreate = (data) => {
//     if (user) {
//       setLoading(true);

//       let d = { wp: data, owner: user._id };

//       WordPhraseClientApi.saveWordPhrase(d).then((res) => {
//         var sd = {
//           _id: res.data.data._id,
//           wp: res.data.data.wp,
//           __v: res.data.data.__v,
//           owner: res.data.data.owner,
//           label: res.data.data.wp,
//           value: res.data.data.wp,
//         };
//         if (setDomain) {
//           setValue(sd);
//           const obj = { domain: sd.wp };
//           setDomain(obj);
//         }
//         if (setFlow) {
//           setValue(sd);
//           const obj = { flow: sd.wp };
//           setFlow(obj);
//         }
//         if (setAddModulesData) {
//           setValue(sd);
//           setAddModulesData(sd);
//         }
//         if (setSelectDomain) {
//           setValue(sd);
//           const obj = { domain: sd.wp };
//           setSelectDomain(obj);
//         }
//         if (setSelectFlow) {
//           setValue(sd);
//           const obj = { flow: sd.wp };
//           setSelectFlow(obj);
//         }
//         if (setSelectmodelEntity) {
//           setValue(sd);
//           const obj = { model_entity: sd.wp };
//           setSelectmodelEntity(obj);
//         }
//         setLoading(false);
//       });
//     } else {
//       alert("Please log in");
//     }
//   };

//   //handle ooChange function for edit data form
//   const handleAnchorChange = (e) => {
//     setDataChange(e.target.value);
//   };

//   //getting all data from db
//   useEffect(() => {
//     (async () => {
//       await WordPhraseClientApi.getAllWordPhrase().then((result) => {
//         setData(result.data);
//       });
//     })();
//   }, [loading, setLoading]);

//   //passing an extra attribute named "label" to the array of obects as it needed by creatable components
//   useEffect(() => {
//     (async () => {
//       let wdata = data.map((e) => {
//         e.label = e.wp;
//         e.value = e.wp;
//         return e;
//       });

//       setLabel(wdata);
//     })();
//   }, [data]);

//   //updating the anchor value in the DB
//   const updateAnchor = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setEdit(false);
//     const d = {
//       id: value._id,
//       data: dataToBeChange,
//       owner: user._id,
//     };
//     WordPhraseClientApi.updateWordPhraseById(d).then((res) => {
//       if (res.data.err) {
//         toastr.warning(`${res.data.err}`);
//         setLoading(false);
//       } else {
//         var sd = {
//           _id: res.data.data._id,
//           wp: res.data.data.wp,
//           __v: res.data.data.__v,
//           owner: res.data.data.owner,
//           label: res.data.data.wp,
//         };
//         if (setDomain) {
//           setValue(sd);
//           const obj = { domain: sd.wp };
//           setDomain(obj);
//         }
//         if (setFlow) {
//           setValue(sd);
//           const obj = { flow: sd.wp };
//           setFlow(obj);
//         }
//         if (setSelectDomain) {
//           setValue(sd);
//           const obj = { domain: sd.wp };
//           setSelectDomain(obj);
//         }
//         if (setSelectFlow) {
//           setValue(sd);
//           const obj = { flow: sd.wp };
//           setSelectFlow(obj);
//         }
//         if (setSelectmodelEntity) {
//           setValue(sd);
//           const obj = { model_entity: sd.wp };
//           setSelectmodelEntity(obj);
//         }
//         setValue(sd);
//         setLoading(false);
//       }
//     });
//   };

//   //deleting the anchor from db
//   const deleteAnchor = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     SetDelete(false);
//     var d = {
//       id: value._id,
//       owner: user._id,
//     };
//     WordPhraseClientApi.deleteWordPhraseById(d).then((res) => {
//       setValue(null);
//       if (res.data.err) {
//         toastr.warning(`${res.data.err}`);
//       }
//       if (res.data.msg) {
//         toastr.success(`${res.data.msg}`);
//       }
//       setLoading(false);
//       setEdit(false);
//     });
//   };
//   const customStyles = {
//     control: (styles) => ({
//       ...styles,
//       backgroundColor: "white",
//       width: "290px",
//     }),
//   };
//   return (
//     <div>
//       <div className="select-wrapper">
//         <div>
//           <div className="form-wrapper">
//             <p>
//               {heading ? (
//                 <>
//                   <b> {heading}</b>
//                 </>
//               ) : (
//                 "word phrase"
//               )}
//             </p>
//             {/* this is the form where we can update the value this will appear when we click on the edit button by setEdit(true) */}
//             {edit && value ? (
//               <>
//                 <Form id="edit-form" onSubmit={updateAnchor}>
//                   <Form.Group>
//                     <Form.Control
//                       type="text"
//                       name="component"
//                       onChange={handleAnchorChange}
//                       value={dataToBeChange ? dataToBeChange : ""}
//                       placeholder="Edit Anchor"
//                     />
//                   </Form.Group>

//                   <Button
//                     variant="success"
//                     style={{ margin: "5px" }}
//                     form="edit-form"
//                     type="submit"
//                   >
//                     save
//                   </Button>

//                   <Button variant="danger" onClick={() => setEdit(false)}>
//                     cancel
//                   </Button>
//                 </Form>
//               </>
//             ) : null}

//             {IsDelete && value ? (
//               <>
//                 {" "}
//                 <Form id="delete-form" onSubmit={deleteAnchor}>
//                   <Form.Group>
//                     <Form.Control
//                       type="text"
//                       name="components"
//                       value={dataToBeChange ? dataToBeChange : ""}
//                       placeholder="Edit Anchor"
//                       disabled
//                     />
//                   </Form.Group>
//                   <Button
//                     variant="danger"
//                     style={{ margin: "5px" }}
//                     form="delete-form"
//                     type="submit"
//                   >
//                     confirm delete
//                   </Button>
//                   <Button variant="success" onClick={() => SetDelete(false)}>
//                     cancel
//                   </Button>
//                 </Form>
//               </>
//             ) : null}
//           </div>
//           {/* this is the creatable components with some basic inline css */}
//           <div className="select-inner-wrapper">
//             <div style={{ marginBottom: "30px" }}>
//               {isMulti ? (
//                 <CreatableSelect
//                   maxMenuHeight={200}
//                   isMulti
//                   isClearable
//                   isDisabled={false}
//                   isLoading={loading}
//                   onChange={handleChange}
//                   onCreateOption={handleCreate}
//                   options={data}
//                   value={value}
//                   styles={customStyles}
//                 />
//               ) : (
//                 <CreatableSelect
//                   maxMenuHeight={200}
//                   isClearable
//                   isDisabled={false}
//                   isLoading={loading}
//                   onChange={handleChange}
//                   onCreateOption={handleCreate}
//                   options={data}
//                   value={value}
//                   styles={customStyles}
//                 />
//               )}
//             </div>
//             <div>
//               {isMulti ? null : (
//                 <>
//                   {selected && !edit && !IsDelete && value ? (
//                     <>
//                       <button
//                         className="trnsparent-button"
//                         variant="success"
//                         style={{ margin: "5px" }}
//                         onClick={() => setEdit(true)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         variant="danger"
//                         className="trnsparent-button"
//                         onClick={() => SetDelete(true)}
//                       >
//                         Delete
//                       </button>
//                     </>
//                   ) : null}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default WordPhrase;
