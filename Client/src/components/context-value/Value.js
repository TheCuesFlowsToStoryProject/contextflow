import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const Value = ({ post, contextvalueadress, getUpdatedValue, posts }) => {
  const [postValue, setPostValue] = useState([]);
  const [drag, setDrag] = useState(false);
  useEffect(() => {
    setPostValue(post);
  }, [post]);
  return (
    <div>
      <DragDropContext
        onDragEnd={(param) => {
          setDrag(true);
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            postValue.splice(desI, 0, postValue.splice(srcI, 1)[0]);
            postValue[srcI].position = srcI + 1;
            postValue[desI].position = desI + 1;
          }
          getUpdatedValue({ value: postValue, adress: contextvalueadress });
        }}
      >
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {postValue.map((value, i) => (
                <ul key={i}>
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
                        <div
                          className="content-div"
                          {...provided.dragHandleProps}
                        >
                          <li>
                            {value.type === "button" ? (
                              <button
                                onClick={() => console.log("button clicked")}
                                style={{
                                  height: `${value.height}px`,
                                  width: `${value.width}px`,
                                }}
                              >
                                {value.cValue}
                              </button>
                            ) : null}
                          </li>
                          <li>
                            {value.type === "text" ? <input></input> : null}
                          </li>
                          <li>
                            {value.type === "label" ? (
                              <label
                                style={{
                                  borderStyle: "ridge",
                                  height: `${value.height}px`,
                                  width: `${value.width}px`,
                                }}
                              >
                                {value.cValue}
                              </label>
                            ) : null}
                          </li>
                          <li>
                            {value.type === "invalid" ? (
                              <label
                                style={{
                                  height: "50px",
                                  width: "200px",
                                }}
                              >
                                {value.cValue}
                              </label>
                            ) : null}
                          </li>
                        </div>
                      </div>
                    )}
                  </Draggable>
                </ul>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default Value;
