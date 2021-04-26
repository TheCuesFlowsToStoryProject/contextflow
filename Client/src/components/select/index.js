import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import AnchorClientApi from "../../client-api/anchor";
import { Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./select.css";

const SelectCurd = ({
  anchorType,
  setDomain,
  setFlow,
  setUser,
  setContexttype,
  setResolutionPattern,
  setResolution,
  domainValue,
  flowValue,
  typeValue,
  background,
}) => {
  const check = sessionStorage.getItem(anchorType) !== null;
  const session_data = check
    ? JSON.parse(sessionStorage.getItem(anchorType) || {})
    : null;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(session_data);
  const [Label, setLabel] = useState([]);
  const [edit, setEdit] = useState(false);
  const [dataToBeChange, setDataChange] = useState();
  const [selected, isSelected] = useState(false);
  const [IsDelete, SetDelete] = useState(false);

  useEffect(() => {
    if (domainValue) {
      setValue(domainValue);
    }
    if (flowValue) {
      setValue(flowValue);
    }
    if (flowValue === null) {
      setValue(null);
    }
    if (domainValue === null) {
      setValue(null);
    }
    if (typeValue) {
      const obj = { anchor: typeValue, label: typeValue };
      setValue(obj);
    }
  }, [domainValue, flowValue, typeValue]);
  //geting data from the session storage using useEffect
  useEffect(() => {
    if (setDomain) {
      setDomain(value);
    }
    if (setFlow) {
      setFlow(value);
    }
    if (setUser) {
      setUser(value);
    }
    if (setContexttype) {
      setContexttype(value);
    }
    if (setResolutionPattern) {
      setResolutionPattern(value);
    }
    if (value !== null) {
      setDataChange(value.anchor);
    } else {
      setDataChange(null);
    }
  }, [value, setLoading]);

  //hendle onchange for select creatable form and saving the selected data to session storage
  const handleChange = (data) => {
    isSelected(true);
    if (!setContexttype) {
      sessionStorage.setItem(anchorType, JSON.stringify(data));
    }
    setValue(data);
    if (setResolution) {
      setResolution(true);
    }
  };

  //creating new anchor and saving to the db
  const handleCreate = (data) => {
    setLoading(true);
    let d = { anchor: data, anchorType: anchorType };

    AnchorClientApi.saveAnchor(d).then((res) => {
      var sd = {
        _id: res.data.data._id,
        anchor: res.data.data.anchor,
        __v: res.data.data.__v,
        label: res.data.data.anchor,
      };
      setLoading(false);
      setValue(sd);
      if (!setContexttype) {
        sessionStorage.setItem(anchorType, JSON.stringify(sd));
      }
    });
  };

  //handle ooChange function for edit data form
  const handleAnchorChange = (e) => {
    setDataChange(e.target.value);
  };

  //getting all data from db
  useEffect(() => {
    (async () => {
      const d = { anchorType: anchorType };
      await AnchorClientApi.getAllAnchor(d).then((result) => {
        setData(result.data);
      });
    })();
  }, [loading, setLoading, anchorType]);

  //passing an extra attribute named "label" to the array of obects as it needed by creatable components
  useEffect(() => {
    (async () => {
      let wdata = data.map((e) => {
        e.label = e.anchor;
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
      anchorType: anchorType,
    };
    AnchorClientApi.updateAnchorById(d).then((res) => {
      var sd = {
        _id: res.data.data._id,
        anchor: res.data.data.anchor,
        __v: res.data.data.__v,
        label: res.data.data.anchor,
      };
      setValue(sd);
      if (!setContexttype) {
        sessionStorage.setItem(anchorType, JSON.stringify(sd));
      }
      setLoading(false);
    });
  };

  //deleting the anchor from db
  const deleteAnchor = (e) => {
    e.preventDefault();
    setLoading(true);
    SetDelete(false);
    var d = {
      id: value._id,
      anchorType: anchorType,
    };
    AnchorClientApi.deleteAnchorById(d).then((res) => {
      setValue(null);
      if (!setContexttype) {
        sessionStorage.setItem(anchorType, null);
      }
      setLoading(false);
      setEdit(false);
    });
  };

  const customStyles = {
    // control: (css) => ({
    // ...css,
    // width: "300px",
    // height: "auto",
    // background: "red",
    // }),
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      width: !setContexttype ? "240px" : "200px",
    }),
  };
  return (
    <div
      className="select-wrapper"
      style={{ background: background ? background : "wheat" }}
    >
      <div>
        <div className="form-wrapper">
          <p>
            {" "}
            <b>Select {anchorType}</b>
          </p>
          {/* this is the form where we can update the value this will appear when we click on the edit button by setEdit(true) */}
          {edit && (session_data || setContexttype) ? (
            <>
              <Form id="edit-form" onSubmit={updateAnchor}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    name="component"
                    onChange={handleAnchorChange}
                    value={dataToBeChange}
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

          {IsDelete && (session_data || setContexttype) ? (
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

        <Row className="select-inner-wrapper">
          <div className="creatable" style={{ marginBottom: "30px" }}>
            {!edit && !IsDelete ? (
              <>
                <CreatableSelect
                  isClearable
                  isDisabled={false}
                  isLoading={loading}
                  onChange={handleChange}
                  onCreateOption={handleCreate}
                  options={data}
                  value={value}
                  styles={customStyles}
                />
              </>
            ) : null}{" "}
          </div>
          <div>
            {selected &&
            (session_data || setContexttype) &&
            !edit &&
            !IsDelete &&
            value ? (
              <>
                <button
                  title="change"
                  className="trnsparent-button"
                  style={{ marginRight: "3px", marginLeft: "3px" }}
                  onClick={() => setEdit(true)}
                >
                  C
                </button>
                <button
                  title="delete"
                  className="trnsparent-button"
                  onClick={() => SetDelete(true)}
                >
                  D
                </button>
              </>
            ) : null}
          </div>
        </Row>
      </div>
    </div>
  );
};
export default SelectCurd;

// import React, { useState, useEffect } from "react";
// import CreatableSelect from "react-select/creatable";
// import AnchorClientApi from "../../client-api/anchor";
// import { Form } from "react-bootstrap";
// import "./select.css";

// const SelectCurd = ({
//   anchorType,
//   setDomain,
//   setFlow,
//   setUser,
//   setContexttype,
//   setResolutionPattern,
//   setResolution,
//   domainValue,
//   flowValue,
// }) => {
//   const check = sessionStorage.getItem(anchorType) !== null;
//   const session_data = check
//     ? JSON.parse(sessionStorage.getItem(anchorType) || {})
//     : null;
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [value, setValue] = useState(session_data);
//   const [Label, setLabel] = useState([]);
//   const [edit, setEdit] = useState(false);
//   const [dataToBeChange, setDataChange] = useState();
//   const [selected, isSelected] = useState(false);
//   const [IsDelete, SetDelete] = useState(false);

//   useEffect(() => {
//     if (domainValue) {
//       setValue(domainValue);
//     }
//     if (flowValue) {
//       setValue(flowValue);
//     }
//     if (flowValue === null) {
//       setValue(null);
//     }
//     if (domainValue === null) {
//       setValue(null);
//     }
//   }, [domainValue, flowValue]);
//   //geting data from the session storage using useEffect
//   useEffect(() => {
//     if (setDomain) {
//       setDomain(value);
//     }
//     if (setFlow) {
//       setFlow(value);
//     }
//     if (setUser) {
//       setUser(value);
//     }
//     if (setContexttype) {
//       setContexttype(value);
//     }
//     if (setResolutionPattern) {
//       setResolutionPattern(value);
//     }
//     if (value !== null) {
//       setDataChange(value.anchor);
//     } else {
//       setDataChange(null);
//     }
//   }, [value, setLoading]);

//   //hendle onchange for select creatable form and saving the selected data to session storage
//   const handleChange = (data) => {
//     isSelected(true);
//     if (!setContexttype) {
//       sessionStorage.setItem(anchorType, JSON.stringify(data));
//     }
//     setValue(data);
//     if (setResolution) {
//       setResolution(true);
//     }
//   };

//   //creating new anchor and saving to the db
//   const handleCreate = (data) => {
//     setLoading(true);
//     let d = { anchor: data, anchorType: anchorType };

//     AnchorClientApi.saveAnchor(d).then((res) => {
//       var sd = {
//         _id: res.data.data._id,
//         anchor: res.data.data.anchor,
//         __v: res.data.data.__v,
//         label: res.data.data.anchor,
//       };
//       setLoading(false);
//       setValue(sd);
//       if (!setContexttype) {
//         sessionStorage.setItem(anchorType, JSON.stringify(sd));
//       }
//     });
//   };

//   //handle ooChange function for edit data form
//   const handleAnchorChange = (e) => {
//     setDataChange(e.target.value);
//   };

//   //getting all data from db
//   useEffect(() => {
//     (async () => {
//       const d = { anchorType: anchorType };
//       await AnchorClientApi.getAllAnchor(d).then((result) => {
//         setData(result.data);
//       });
//     })();
//   }, [loading, setLoading, anchorType]);

//   //passing an extra attribute named "label" to the array of obects as it needed by creatable components
//   useEffect(() => {
//     (async () => {
//       let wdata = data.map((e) => {
//         e.label = e.anchor;
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
//       anchorType: anchorType,
//     };
//     AnchorClientApi.updateAnchorById(d).then((res) => {
//       var sd = {
//         _id: res.data.data._id,
//         anchor: res.data.data.anchor,
//         __v: res.data.data.__v,
//         label: res.data.data.anchor,
//       };
//       setValue(sd);
//       if (!setContexttype) {
//         sessionStorage.setItem(anchorType, JSON.stringify(sd));
//       }
//       setLoading(false);
//     });
//   };

//   //deleting the anchor from db
//   const deleteAnchor = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     SetDelete(false);
//     var d = {
//       id: value._id,
//       anchorType: anchorType,
//     };
//     AnchorClientApi.deleteAnchorById(d).then((res) => {
//       setValue(null);
//       if (!setContexttype) {
//         sessionStorage.setItem(anchorType, null);
//       }
//       setLoading(false);
//       setEdit(false);
//     });
//   };

//   const customStyles = {
//     control: (styles) => ({
//       ...styles,
//       backgroundColor: "white",
//       width: "260px",
//     }),
//   };
//   return (
//     <div className="select-wrapper">
//       <div>
//         <div className="form-wrapper">
//           <p>
//             {" "}
//             <b>Select {anchorType}</b>
//           </p>
//           {/* this is the form where we can update the value this will appear when we click on the edit button by setEdit(true) */}
//           {edit && session_data ? (
//             <>
//               <Form id="edit-form" onSubmit={updateAnchor}>
//                 <Form.Group>
//                   <Form.Control
//                     type="text"
//                     name="component"
//                     onChange={handleAnchorChange}
//                     value={dataToBeChange}
//                     placeholder="Edit Anchor"
//                   />
//                 </Form.Group>

//                 <button
//                   className="border-button"
//                   style={{ margin: "5px" }}
//                   form="edit-form"
//                   type="submit"
//                 >
//                   save
//                 </button>

//                 <button
//                   className="border-button"
//                   onClick={() => setEdit(false)}
//                 >
//                   cancel
//                 </button>
//               </Form>
//             </>
//           ) : null}

//           {IsDelete && session_data ? (
//             <>
//               {" "}
//               <Form id="delete-form" onSubmit={deleteAnchor}>
//                 <Form.Group>
//                   <Form.Control
//                     type="text"
//                     name="components"
//                     value={dataToBeChange ? dataToBeChange : ""}
//                     placeholder="Edit Anchor"
//                     disabled
//                   />
//                 </Form.Group>
//                 <button
//                   className="border-button"
//                   style={{ margin: "5px" }}
//                   form="delete-form"
//                   type="submit"
//                 >
//                   confirm delete
//                 </button>
//                 <button
//                   className="border-button"
//                   onClick={() => SetDelete(false)}
//                 >
//                   cancel
//                 </button>
//               </Form>
//             </>
//           ) : null}
//         </div>
//         {/* this is the creatable components with some basic inline css */}
//         <div
//           className="select-inner-wrapper"
//           style={{ display: "inline-flex" }}
//         >
//           <div style={{ marginBottom: "30px" }}>
//             <CreatableSelect
//               maxMenuHeight={200}
//               isClearable
//               isDisabled={false}
//               isLoading={loading}
//               onChange={handleChange}
//               onCreateOption={handleCreate}
//               options={data}
//               value={value}
//               styles={customStyles}
//             />
//           </div>
//           <div className="button-wrapper">
//             {selected && session_data && !edit && !IsDelete && value ? (
//               <>
//                 <button
//                   title="change"
//                   className="trnsparent-button"
//                   style={{ marginRight: "3px", marginLeft: "3px" }}
//                   onClick={() => setEdit(true)}
//                 >
//                   C
//                 </button>
//                 <button
//                   title="delete"
//                   className="trnsparent-button"
//                   onClick={() => SetDelete(true)}
//                 >
//                   D
//                 </button>
//               </>
//             ) : null}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SelectCurd;
