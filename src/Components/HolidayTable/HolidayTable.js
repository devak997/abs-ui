import React from "react";
import "./HolidayTable.css";
const tableList = props => {
  return props.holidays.map((element, i) => {
    return (
      <tr key={element.date}>
        <td>{++i}</td>
        <td>{element.date}</td>
        <td>
          <button
            className="ui basic icon button"
            onClick={() => {
              props.delete(element.date);
            }}
          >
            <i className="trash icon" />
          </button>
        </td>
      </tr>
    );
  });
};

const HolidayTable = props => {
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
      <table className="ui orange compact table holiday-table-container">
        <thead>
          <tr>
            <th>S NO.</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            style={{ display: `${props.holidays.length === 0 ? "" : "none"}` }}
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

export default HolidayTable;
