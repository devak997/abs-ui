import React from "react";

const LoginError = props => {
  return (
    <div className="ui negative message">
      <i className="close icon" onClick={props.handleXClick} />
      <div className="header">Invalid Credentials! Username and Password doesnot match</div>
      <p>{props.message}</p>
    </div>
  );
};

export default LoginError;