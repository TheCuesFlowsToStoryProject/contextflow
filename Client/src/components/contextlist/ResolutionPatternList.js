import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getResolutionPattern } from "../../client-api/anchor";

const ResolutionPatternList = ({ setRefresh, refresh }) => {
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  // const [update, setUpdate] = useState(false);
  var user_anchor = JSON.parse(sessionStorage.getItem("UserAnchor"));
  var resolution_pattern = JSON.parse(
    sessionStorage.getItem("ResolutionPattern")
  );

  useEffect(() => {
    (async () => {
      const userAnchor = {
        user_anchor: user_anchor.anchor,
      };
      const list = await getResolutionPattern(userAnchor);
      setData(list.data);
      var d = list.data;
      if (d && resolution_pattern !== null) {
        var newArray = d.filter(function (item) {
          return item.resolution_pattern === resolution_pattern.anchor;
        });

        saveTosession(newArray[0]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let wdata = data.map((e) => {
        e.label = e.resolution_pattern;
        return e;
      });
      if (resolution_pattern !== null) {
        setLabel(wdata);
        var ar = wdata.filter(function (item) {
          return item.resolution_pattern === resolution_pattern.anchor;
        });
        if (ar.length === 0) {
          setDefaultValue(wdata[0]);
          setRefresh(!refresh);
        } else {
          setDefaultValue(resolution_pattern);
          setRefresh(!refresh);
        }
      }
    })();
  }, [data]);
  const saveTosession = (data) => {
    if (data !== undefined) {
      const FlowAnchor = {
        anchor: data.flow_anchor,
        label: data.flow_anchor,
      };
      const DomainAnchor = {
        anchor: data.domain_anchor,
        label: data.domain_anchor,
      };
      const EntityAnchor = {
        anchor: data.entity_anchor,
        label: data.entity_anchor,
      };
      sessionStorage.setItem("FlowAnchor", JSON.stringify(FlowAnchor));
      sessionStorage.setItem("DomainAnchor", JSON.stringify(DomainAnchor));
      sessionStorage.setItem("Entity_Anchor", JSON.stringify(EntityAnchor));
      setRefresh(!refresh);
    }
  };
  const handleChange = (data) => {
    saveTosession(data);
    setDefaultValue(data);
  };

  return <Select onChange={handleChange} options={data} value={defaultValue} />;
};
export default ResolutionPatternList;
