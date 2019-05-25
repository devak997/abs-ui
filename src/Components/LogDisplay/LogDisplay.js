import React from "react";
import LogTable from "../LogTable/LogTable";
import Raspberry from "../../api/Raspberry";
import "./LogDisplay.css";
import Loader from "../Loader/Loader";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import database from "../../Images/database.svg";

class LogDisplay extends React.Component {
  state = {
    logs: [],
    status: "",
    loading: true,
    error: "",
    showMessage: false
  };

  getLogs = () => {
    Raspberry.get("/getLogs")
      .then(response => {
        if (response.status === 200) {
          this.setState({
            logs: response.data.result,
            status: `Last updated at ${new Date().toLocaleTimeString()}`,
            loading: false,
            error: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: `${error}`
        });
      });
  };


  clearLog = () => {
    Raspberry.post("/clearLog")
      .then(() => {
        this.getLogs();
      })
      .catch(error => console.log(error));
  };

  displayData = () => {
    if (this.state.loading === true) {
      return <Loader message="Contacting Server" />;
    } else if (this.state.error !== "" && this.state.error !== false) {
      return <ErrorDisplay message={this.state.error} />;
    } else {
      return (
        <LogTable
          logs={this.state.logs}
          status={this.state.status}
          clear={this.clearLog}
          update={this.getLogs}
        />
      );
    }
  };

  displayMessage = () => {
    if (this.state.formSubmitted) {
      if (this.state.submitError) {
        return (
          <ErrorDisplay
            message={this.state.submitStatus}
            handleXClick={this.handleXClick}
          />
        );
      } else if (this.state.showMessage) {
        return (
          <SuccessMessage
            message={this.state.submitStatus}
            handleXClick={this.handleXClick}
          />
        );
      } else {
        return <h3>Loading</h3>;
      }
    } else {
      return "";
    }
  };

  handleXClick = e => {
    this.setState({ showMessage: false, formSubmitted: false });
  };

  componentDidMount() {
    this.getLogs();
  }
  render() {
    return (
      <div className="log-display">
        <div className = "log-form">
          <img
            src={database}
            style={{ width: "350px", height: "250px" }}
            alt="Happy Holidays"
          />
          <h2>Additional Bells</h2>
          <h4>Bells excluding default are recorded</h4>
          <div className="message-display">{this.displayMessage()}</div>
      </div>
        <div className="log-table">
          <div className="header-display">
            <h3>Current Log List</h3>
          </div> 
          {this.displayData()}
        </div>
      </div>
    );
  }
}

export default LogDisplay;
