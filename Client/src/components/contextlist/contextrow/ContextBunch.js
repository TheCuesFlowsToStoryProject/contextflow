import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import "../context_flow.css";
import ContextEntry from "./ContextEntry";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  updateContextFlowByDrag,
  removeAttentionEntities,
} from "../../../client-api/contextflow";
import { UserContext } from "../../../provider/UserProvider";
const ContextBunch = ({
  context,
  addModule,
  // atn,
  setAddModule,
  contexts,
  setRefresh,
}) => {
  const value = useContext(UserContext);
  const [userData, setUserData] = value.user;
  const user = userData.user !== undefined ? userData.user : userData.user2;
  const [drag, setDrag] = useState(false);
  var contxts = context.atttentionentities;
  const saveDragValue = () => {
    if (user._id === context.owner) {
      var draggedArray = {
        drag: contxts,
        user: user._id,
        contextId: context._id,
      };
      updateContextFlowByDrag(draggedArray)
        .then((res) => {
          setDrag(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("only owner can update");
    }
  };

  const removeEntity = (attention) => {
    if (window.confirm("Do you really want to delete?")) {
      if (user._id === context.owner) {
        var entityRemove = {
          atttentionentity: attention,
          user: user._id,
          contextId: context._id,
        };
        removeAttentionEntities(entityRemove).then((res) => {
          setRefresh(res);
        });
      } else {
        alert("only owner can make change");
      }
    }
  };
  return (
    <div>
      <DragDropContext
        onDragEnd={(param) => {
          setDrag(true);
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            contxts.splice(desI, 0, contxts.splice(srcI, 1)[0]);
          }
        }}
      >
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {contxts.map((attention, i) => (
                <ul className="module-containers" key={i}>
                  <div> {"  "}</div>
                  <div>{"  "}</div>

                  <div>
                    <Draggable key={i} draggableId={"draggable-" + i} index={i}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            boxShadow: snapshot.isDragging
                              ? "0 0 .4rem #666"
                              : "none",
                          }}
                        >
                          <div className="wp-holder">
                            <li {...provided.dragHandleProps}>{attention}</li>{" "}
                            <div className="button-container">
                              <Button
                                variant="success"
                                className="change-button"
                              >
                                C
                              </Button>
                              <Button
                                onClick={() => removeEntity(attention)}
                                variant="danger"
                              >
                                D
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  </div>
                </ul>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {drag ? (
        <Button
          onClick={() => saveDragValue()}
          variant="success"
          style={{ marginLeft: "37.7%" }}
        >
          save
        </Button>
      ) : null}

      {addModule ? (
        <>
          <ContextEntry
            contextData={contexts}
            // atn={atn}
            setAddModule={setAddModule}
            setRefresh={setRefresh}
          />
        </>
      ) : null}
    </div>
  );
};
export default ContextBunch;

// import React from "react";
// import { Button } from "react-bootstrap";
// import "../context_flow.css";
// import ContextEntry from "./ContextEntry";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// const ContextBunch = ({
//   context,
//   addModule,
//   atn,
//   setAddModule,
//   contexts,
//   setRefresh,
// }) => {
//   var contxts = context.atttentionentities;

//   return (
//     <div>
//       <DragDropContext
//         onDragEnd={(param) => {
//           const srcI = param.source.index;
//           const desI = param.destination?.index;
//           if (desI) {
//             contxts.splice(desI, 0, contxts.splice(srcI, 1)[0]);
//           }
//         }}
//       >
//         <Droppable droppableId="droppable-1">
//           {(provided, _) => (
//             <div ref={provided.innerRef} {...provided.droppableProps}>
//               {contxts.map((attention, index) => (
//                 <ul className="module-containers" key={index}>
//                   <div></div>
//                   <div></div>

//                   <div>
//                     <Draggable
//                       key={index}
//                       draggableId={"draggable-" + index}
//                       index={index}
//                     >
//                       {(provided, snapshot) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           style={{
//                             ...provided.draggableProps.style,
//                             boxShadow: snapshot.isDragging
//                               ? "0 0 .4rem #666"
//                               : "none",
//                           }}
//                         >
//                           <div className="wp-holder">
//                             <li {...provided.dragHandleProps}>{attention}</li>{" "}
//                             <div className="button-container">
//                               <Button
//                                 variant="success"
//                                 className="change-button"
//                               >
//                                 C
//                               </Button>
//                               <Button variant="danger">D</Button>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </Draggable>
//                   </div>
//                 </ul>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>

//       {addModule ? (
//         <>
//           <ContextEntry
//             contextData={contexts}
//             atn={atn}
//             setAddModule={setAddModule}
//             setRefresh={setRefresh}
//           />
//         </>
//       ) : null}
//     </div>
//   );
// };
// export default ContextBunch;
