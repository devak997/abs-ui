import React from "react";
import "./LogTable.css";
const tableList = props => {
  return props.logs.map((element, i) => {
    return (
      <tr key={element.time}>
        <td>{++i}</td>
        <td>{element.date}</td>
        <td>{element.time}</td>
      </tr>
    );
  });
};

const LogTable = props => {
  return (
    <div>
      <div>
        <p style={{ float: "left", marginTop: "10px" }}>{props.status}</p>
        <div
          className="ui basic buttons"
          style={{
            float: "right",
            verticalAlign: "middle",
            marginBottom: "5px"
          }}
        >
          <button className="ui button" onClick={props.update}>
            Update
          </button>
          <button className="ui button" onClick={props.clear}>
            Clear
          </button>
        </div>
      </div>
      <table className="ui orange compact table log-table-container">
        <thead>
          <tr>
            <th>S NO.</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style={{ display: `${props.logs.length === 0 ? "" : "none"}` }}
          >
            <td rowSpan="3">
              <h3 style={{ textAlign: "center", padding: "10px" }}>
                It's Lonely here
              </h3>
            </td>
          </tr>
          {tableList(props)}
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;
