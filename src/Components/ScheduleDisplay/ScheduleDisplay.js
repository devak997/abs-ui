import React from "react";
import ScheduleTable from "../ScheduleTable/ScheduleTable";
import ScheduleForm from "../ScheduleForm/ScheduleForm";
import "./ScheduleDisplay.css";
import Raspberry from "../.././api/Raspberry";
import Loader from "../Loader/Loader";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import addTime from "../../Images/addTime.png";

class ScheduleDisplay extends React.Component {
  state = {
    schedule: null,
    status: "",
    loading: true,
    error: "",
    formSubmitted: false,
    submitStatus: "",
    submitError: false,
    showMessage: false
  };

  componentDidMount() {
    this.getSchedule();
  }

  getSchedule = () => {
    Raspberry.get("/currentSchedule")
      .then(response => {
        this.setState({
          schedule: response.data.result,
          status: `Last updated at ${new Date().toLocaleTimeString()}`,
          loading: false,
          error: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: `${error}`
        });
      });
  };

  restoreToDefault = () => {
    Raspberry.get("/RestoreDefaults")
      .then(() => {
        this.getSchedule();
      })
      .catch(error => {
        console.log(error);
      });
  };

  clearSchedule = () => {
    Raspberry.get("/clearSchedule")
      .then(() => {
        this.getSchedule();
      })
      .catch(error => {
        console.log(error);
      });
  };

  submitForm = (time, delay, isEndBell) => {
    this.setState({ submitStatus: "Loading...", formSubmitted: true });
    const data = { time: time + ":00", delay: delay, isEndBell: isEndBell };
    Raspberry.post("/addBell", { data })
      .then(response => {
        if (response.status === 200) {
          this.setState({ showMessage: true });
          this.setState({ submitStatus: response.data.status });
        } else {
          this.setState({ submitError: true });
          this.setState({ submitStatus: "Unable to send data to API" });
        }
        this.getSchedule();
      })
      .catch(error => {
        this.setState({ submitError: true });
        this.setState({ submitStatus: error.message });
        this.getSchedule();
      });
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

  handleDelete = time => {
    const data = { time: time };
    Raspberry.post("/deleteBell", { data })
      .then(() => {
        this.getSchedule();
      })
      .catch(err => console.log(err));
  };

  handleXClick = e => {
    this.setState({ showMessage: false, formSubmitted: false });
  };

  tryAgain = () => {
    this.setState({loading: true});
    this.getSchedule();
  }

  displayData = () => {
    if (this.state.loading === true) {
      return <Loader message="Contacting Server" />;
    } else if (this.state.error !== "" && this.state.error !== false) {
      return <ErrorDisplay message={this.state.error} tryAgain={this.tryAgain} />;
    } else {
      return (
        <ScheduleTable
          schedule={this.state.schedule}
          status={this.state.status}
          restore={this.restoreToDefault}
          clear={this.clearSchedule}
          update={this.getSchedule}
          delete={this.handleDelete}
        />
      );
    }
  };

  render() {
    return (
      <div className="schedule-display">
        <div className="schedule-form-display">
          <img
            src={addTime}
            style={{ width: "80px", height: "80px" }}
            alt="Add Time"
          />
          <div className="header-display">
            <h3>Add Time</h3>
          </div>
          <ScheduleForm submitForm={this.submitForm} />
          <div className="message-display">{this.displayMessage()}</div>
        </div>
        <div className="table-display">
          <div className="header-display">
            <h3>Current Schedule</h3>
          </div>
          {this.displayData()}
        </div>
      </div>
    );
  }
}

export default ScheduleDisplay;
