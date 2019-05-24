import React from "react";
import "./ScheduleTable.css";

const tableList = props => {
  return props.schedule.map((element, i) => {
    return (
      <tr key={element.time}>
        <td>{element.duration === 5 ? `${++i}*` : `${++i}`}</td>
        <td>{element.time}</td>
        <td>{element.status}</td>
        <td>
          <button
            className="ui basic icon button"
            onClick={() => {
              props.delete(element.time);
            }}
          >
            <i className="trash icon" />
          </button>
        </td>
      </tr>
    );
  });
};

const ScheduleTable = props => {
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
          <button className="ui button" onClick={props.restore}>
            Restore
          </button>
        </div>
      </div>
      <div>
        <table className="ui copmact blue small table table-container">
          <thead>
            <tr>
              <th>S NO.</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                display: `${props.schedule.length === 0 ? "" : "none"}`
              }}
            >
              <td rowSpan="4">
                <h3 style={{ textAlign: "center", padding: "10px" }}>
                  It's Lonely here
                </h3>
              </td>
            </tr>
            {tableList(props)}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ScheduleTable;
