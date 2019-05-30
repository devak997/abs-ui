import React from "react";
import HolidayForm from "../HolidayForm/HolidayForm";
import HolidayTable from "../HolidayTable/HolidayTable";
import Raspberry from "../../api/Raspberry";
import "./HolidayDisplay.css";
import Loader from "../Loader/Loader";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import holidays from "../../Images/holidays.png";

class HolidayDisplay extends React.Component {
  state = {
    holidays: [],
    status: "",
    loading: true,
    error: "",
    formSubmitted: false,
    submitStatus: "",
    submitError: false,
    showMessage: false
  };

  onFormSubmit = (date,endDate) => {
    let data;
    this.setState({ submitStatus: "Loading...", formSubmitted: true });
    if(endDate === undefined){
    data = { date: date };
    }
    else{
      data = {date:date, endDate:endDate}
    }
    Raspberry.post("/addHoliday", { data })
      .then(response => {
        if (response.status === 200) {
          this.setState({ showMessage: true });
          this.setState({ submitStatus: response.data.status });
        } else {
          this.setState({ submitError: true });
          this.setState({ submitStatus: "Unable to send data to API" });
        }
        this.getHolidays();
      })
      .catch(error => {
        this.setState({ submitError: true });
        this.setState({ submitStatus: error.message });
        this.getHolidays();
      });
  };

  getHolidays = () => {
    Raspberry.get("/getHolidays")
      .then(response => {
        if (response.status === 200) {
          this.setState({
            holidays: response.data.result,
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

  deleteHoliday = date => {
    const data = { date: date };
    Raspberry.post("/deleteHoliday", { data })
      .then(() => this.getHolidays())
      .catch(err => console.log(err));
  };

  clearHolidayList = () => {
    Raspberry.post("/clearHolidays")
      .then(() => {
        this.getHolidays();
      })
      .catch(error => console.log(error));
  };

  tryAgain = () => {
    this.setState({loading: true});
    this.getHolidays();
  }

  displayData = () => {
    if (this.state.loading === true) {
      return <Loader message="Contacting Server" />;
    } else if (this.state.error !== "" && this.state.error !== false) {
      return <ErrorDisplay message={this.state.error} tryAgain={this.tryAgain}/>;
    } else {
      return (
        <HolidayTable
          holidays={this.state.holidays}
          delete={this.deleteHoliday}
          status={this.state.status}
          clear={this.clearHolidayList}
          update={this.getHolidays}
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
    this.getHolidays();
  }
  render() {
    return (
      <div className="holiday-display">
        <div className="holiday-form">
          <img
            src={holidays}
            style={{ width: "250px", height: "150px" }}
            alt="Happy Holidays"
          />
          <div className="header-display">
            <h3>Add Holiday</h3>
          </div>
          <HolidayForm onFormSubmit={this.onFormSubmit} />
          <div className="message-display">{this.displayMessage()}</div>
        </div>
        <div className="holiday-table">
          <div className="header-display">
            <h3>Current Holiday List</h3>
          </div>
          {this.displayData()}
        </div>
      </div>
    );
  }
}

export default HolidayDisplay;
