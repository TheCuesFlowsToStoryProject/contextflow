import { useEffect, useState } from "react";
import Pagination from "./Pagination";
// import "./ContextValueList.css";
import { Row, Col } from "react-bootstrap";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import parse from "html-react-parser";
function ContextValueList({ contextAllvalue, context, atn, contxts }) {
  const [contextValue, setContextValue] = useState([]);
  const [showPerPage, setShowPerPage] = useState(1);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  useEffect(() => {
    setContextValue(contextAllvalue);
  }, [contextAllvalue]);
  var newArray =
    contextValue.length > 0
      ? contextValue.filter(function (el) {
          return el.wp === atn;
        })
      : [];

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  var flippy = 7;
  return (
    <div>
      <div className="container py-4">
        <Row>
          <Col>
            {contextValue.length > 0
              ? contextValue
                  .slice(pagination.start, pagination.end)
                  .map((post) => (
                    <Col xs={12} key={post.id}>
                      <p>{post.wp}</p>
                      <Flippy
                        flipOnHover={false}
                        flipOnClick={true}
                        flipDirection="horizontal"
                        ref={(r) => (flippy = r)}
                        style={{ width: "auto", height: "auto" }}
                      >
                        <FrontSide
                          style={{
                            backgroundColor: "#F39C12 ",
                            color: "white",
                          }}
                        >
                          {parse(post.value)}
                        </FrontSide>
                        <BackSide
                          style={{ backgroundColor: "#EC7063", color: "white" }}
                        >
                          Flow: {context.flow}
                          <br />
                          Domain:{context.domain}
                          <br />
                          UserAnchor:{context.UserAnchor}
                          <br />
                          FlowAnchor: {context.FlowAnchor}
                        </BackSide>
                      </Flippy>
                    </Col>
                  ))
              : contxts.slice(pagination.start, pagination.end).map((post) => (
                  <Col xs={12} key={post.id}>
                    <p>{post}</p>
                    <Flippy
                      flipOnHover={false}
                      flipOnClick={true}
                      flipDirection="horizontal"
                      ref={(r) => (flippy = r)}
                      style={{ width: "auto", height: "auto" }}
                    >
                      <FrontSide
                        style={{
                          width: "400px",
                          height: "150px",
                          backgroundColor: "#F39C12 ",
                          color: "white",
                        }}
                      ></FrontSide>
                      <BackSide
                        style={{
                          backgroundColor: "#EC7063",
                          color: "white",
                        }}
                      >
                        Flow: {context.flow}
                        <br />
                        Domain:{context.domain}
                        <br />
                        UserAnchor:{context.UserAnchor}
                        <br />
                        FlowAnchor: {context.FlowAnchor}
                      </BackSide>
                    </Flippy>
                  </Col>
                ))}
          </Col>
          <Col xs={12}>
            <Pagination
              showPerPage={showPerPage}
              onPaginationChange={onPaginationChange}
              total={
                contextAllvalue.length !== 0
                  ? contextAllvalue.length
                  : contxts.length
              }
              serialNo={newArray.length !== 0 ? newArray[0].sno : 1}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ContextValueList;

// import { useState } from "react";
// import Pagination from "./Pagination";
// // import "./ContextValueList.css";
// import { Container, Row, Col, Button } from "react-bootstrap";
// import parse from "html-react-parser";
// function ContextValueList({ contextAllvalue }) {
//   const [showPerPage, setShowPerPage] = useState(1);
//   const [pagination, setPagination] = useState({
//     start: 0,
//     end: showPerPage,
//   });

//   const onPaginationChange = (start, end) => {
//     setPagination({ start: start, end: end });
//   };
//   return (
//     <div>
//       <div className="container py-4">
//         <Row>
//           <Col>
//             {contextAllvalue
//               .slice(pagination.start, pagination.end)
//               .map((post) => (
//                 <Col xs={12} key={post.id}>
//                   <div className="card">
//                     <div className="card-body">
//                       <h5>{parse(post.value)}</h5>
//                     </div>
//                   </div>
//                 </Col>
//               ))}
//           </Col>
//           <Col xs={12}>
//             <Pagination
//               showPerPage={showPerPage}
//               onPaginationChange={onPaginationChange}
//               total={contextAllvalue.length}
//             />
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// }

// export default ContextValueList;
