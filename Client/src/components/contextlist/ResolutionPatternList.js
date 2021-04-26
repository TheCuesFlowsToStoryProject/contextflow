import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getResolutionPattern } from "../../client-api/anchor";

const ResolutionPatternList = ({ setRefresh, refresh }) => {
  const [data, setData] = useState([]);
  const [label, setLabel] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  const [update, setUpdate] = useState(false);
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
      var newArray = d.filter(function (item) {
        return item.resolution_pattern === resolution_pattern.anchor;
      });

      saveTosession(newArray[0]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let wdata = data.map((e) => {
        e.label = e.resolution_pattern;
        return e;
      });
      setLabel(wdata);
      setDefaultValue(resolution_pattern);
    })();
  }, [data]);
  const saveTosession = (data) => {
    const FlowAnchor = {
      anchor: data.flow_anchor,
      label: data.flow_anchor,
    };
    const DomainAnchor = {
      anchor: data.domain_anchor,
      label: data.domain_anchor,
    };

    sessionStorage.setItem("FlowAnchor", JSON.stringify(FlowAnchor));
    sessionStorage.setItem("DomainAnchor", JSON.stringify(DomainAnchor));
    setRefresh(!refresh);
  };
  const handleChange = (data) => {
    saveTosession(data);
    setDefaultValue(data);
  };

  return <Select onChange={handleChange} options={data} value={defaultValue} />;
};
export default ResolutionPatternList;
