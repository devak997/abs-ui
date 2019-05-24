import React from "react";

const ErrorDisplay = props => {
  return (
    <div className="ui negative message">
      <i className="close icon" onClick={props.handleXClick} />
      <div className="header">We're sorry we can't connect to the server!</div>
      <p>{props.message}</p>
    </div>
  );
};

export default ErrorDisplay;
