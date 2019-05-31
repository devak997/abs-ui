import React from "react";

const ErrorDisplay = (props) => {
  return (
    <div className="ui negative message">
      <i className="close icon" onClick={props.handleXClick} />
<<<<<<< HEAD
      <div className="header">{props.headerData}</div>
      <p>{props.message}</p>
=======
<<<<<<< HEAD
      <div className="header">{props.headerData || "We're sorry we can't connect to the server!"}</div>
      <p>{props.message || "UnKnown Error"}</p>
=======
      <div className="header">{props.headerData}</div>
      <p>{props.message}</p>
>>>>>>> 304fab7fa2386a3242a7c15143e8c4600bf3a7a3
>>>>>>> 09732c90f4fa9495e867951fc106c97fbcefe453
      <div className="ui blue button" onClick={props.tryAgain} style={{display: props.showTry ? "" : "none"}}>Try Again</div>
    </div>
  );
};

<<<<<<< HEAD
// const defaultProps = {
//   showTry: true,
//   headerData: "We're sorry we can't connect to the server!"
// }
=======
const defaultProps = {
  showTry: true,
  headerData: "We're sorry we can't connect to the server!"
}
>>>>>>> 09732c90f4fa9495e867951fc106c97fbcefe453
export default ErrorDisplay;
