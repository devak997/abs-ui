import React from "react";

const Loader = props => {
  return (
    <div style={{ textAlign: "center", marginTop: "30%" }}>
      <div className="ui active centered inline loader" />
      <br />
      <p>{props.message}</p>
    </div>
  );
};

Loader.defaultProps = {
  message: "Loading..."
};

export default Loader;
