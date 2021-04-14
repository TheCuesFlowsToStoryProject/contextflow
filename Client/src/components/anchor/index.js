import React, { useEffect, useState } from "react";
import SelectCurd from "../select/index";
import "./anchor.css";
import ErrorNotice from "../Notify/ErrorNotice";
import { saveResolutionPattern } from "../../client-api/anchor";
import { getResolutionPattern } from "../../client-api/anchor";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Anchor = () => {
  const [domain, setDomain] = useState();
  const [resolution, setResolution] = useState(false);
  const [flow, setFlow] = useState();
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [ResolutionPattern, setResolutionPattern] = useState();
  const [savePattern, setPattern] = useState(false);
  const [data, setData] = useState([]);
  const [domainValue, setDomainValue] = useState();
  const [flowValue, setFlowValue] = useState();
  const savePatternToDb = () => {
    if (domain && flow && ResolutionPattern && user) {
      setPattern(true);
      var obj = {
        domainAnchor: domain.anchor,
        flowAnchor: flow.anchor,
        resolutionPattern: ResolutionPattern.anchor,
        userAnchor: user.anchor,
      };
      saveResolutionPattern(obj)
        .then((res) => {
          setError(res.data.err);
          setResolution(false);
        })
        .catch((err) => {
          console.log(err);
          setResolution(false);
        });
    } else {
      alert("please select all the field");
    }
  };
  useEffect(() => {
    (async () => {
      if (user && ResolutionPattern) {
        const userAnchor = {
          user_anchor: user.anchor,
          resolution: ResolutionPattern.anchor,
        };
        const list = await getResolutionPattern(userAnchor);
        setData(list.data);
      } else {
        setDomainValue(null);
        setFlowValue(null);
      }
    })();
  }, [user, ResolutionPattern]);
  useEffect(() => {
    if (data.length > 0) {
      const d = data[0];
      const domainObj = {
        anchor: d.domain_anchor,
        label: d.domain_anchor,
      };
      const flowObj = {
        anchor: d.flow_anchor,
        label: d.flow_anchor,
      };

      setDomainValue(domainObj);
      setFlowValue(flowObj);
    }
  }, [data]);

  return (
    <Container fluid>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      {user ? (
        <div className="anchor">
          <b>user Anchor:{user.anchor}</b>
        </div>
      ) : null}
      {ResolutionPattern ? (
        <div className="anchor">
          <b>Resolution Pattern:{ResolutionPattern.anchor}</b>
        </div>
      ) : null}
      {domain ? (
        <div className="anchor">
          <b>Domain Anchor:{domain.anchor}</b>
        </div>
      ) : null}
      {flow ? (
        <div className="anchor">
          <b>Flow Anchor:{flow.anchor}</b>
        </div>
      ) : null}
      <Row>
        <Col xs={12} lg={12}>
          <SelectCurd
            setResolution={setResolution}
            anchorType={"UserAnchor"}
            setUser={setUser}
          />
        </Col>
        <Col xs={12} lg={12}>
          <SelectCurd
            anchorType={"ResolutionPattern"}
            setResolutionPattern={setResolutionPattern}
            setResolution={setResolution}
          />
        </Col>
        <Col xs={12} lg={12}>
          <SelectCurd
            anchorType={"DomainAnchor"}
            setDomain={setDomain}
            setResolution={setResolution}
            domainValue={domainValue}
          />
        </Col>
        <Col xs={12} lg={12}>
          <SelectCurd
            anchorType={"FlowAnchor"}
            setFlow={setFlow}
            setResolution={setResolution}
            flowValue={flowValue}
          />
        </Col>
        <div className="anchor">
          {resolution ? (
            <>
              <Button
                variant="success"
                style={{ margin: "5px" }}
                form="edit-form"
                type="submit"
                onClick={() => {
                  savePatternToDb();
                }}
              >
                save
              </Button>
              <Button variant="danger" onClick={() => setResolution(false)}>
                cancel
              </Button>
            </>
          ) : null}
        </div>
      </Row>
    </Container>
  );
};
export default Anchor;
