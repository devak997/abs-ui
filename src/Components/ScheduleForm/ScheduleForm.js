import React from "react";

class ScheduleForm extends React.Component {
  state = {
    selectedValue: "",
    isChecked: false,
    time: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }),
    hideTimeError: true,
    hideTypeError: true
  };

  isTimeValid() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const enteredHour = parseInt(this.state.time.split(":")[0]);
    const enteredMinute = parseInt(this.state.time.split(":")[1]);

    if (enteredHour < currentHour) {
      return false;
    } else if (enteredHour === currentHour) {
      if (enteredMinute <= currentMinute) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  isTypeValid() {
    if (this.state.selectedValue === "") {
      return false;
    } else {
      return true;
    }
  }

  onFormSubmit = e => {
    e.preventDefault();
    const delay =
      this.state.selectedValue === "2" || this.state.isChecked ? 5 : 3;
    const isEndBell = this.state.isChecked;
    this.props.submitForm(this.state.time, delay, isEndBell);
  };

  render() {
    return (
      <div>
        <form className="ui form">
          <div
            className={`field ${
              this.isTimeValid() || this.state.hideTimeError ? "" : "error"
            }`}
          >
            <label>Time</label>
            <div className="ui input error left icon  ">
              <input
                type="time"
                value={this.state.time}
                onClick={() => this.setState({ hideTimeError: false })}
                onChange={e => this.setState({ time: e.target.value })}
              />
              <i className="time icon" />
            </div>
            <p>{`${
              this.isTimeValid() || this.state.hideTimeError
                ? ""
                : "Entered time less than current time"
            }`}</p>
          </div>
          <div
            className={`field ${
              this.isTypeValid() ||
              this.state.isChecked ||
              this.state.hideTypeError
                ? ""
                : "error"
            }`}
          >
            <label>Bell Type</label>
            <select
              className={`ui search dropdown ${
                this.state.isChecked ? "disabled" : ""
              }`}
              id="mySelect"
              value={this.state.selectedValue}
              onClick={() => this.setState({ hideTypeError: false })}
              onChange={e => this.setState({ selectedValue: e.target.value })}
            >
              <option value="">Select Type</option>
              <option value="1">Short Bell</option>
              <option value="2">Long Bell</option>
            </select>
            <p>{`${
              this.isTypeValid() ||
              this.state.isChecked ||
              this.state.hideTypeError
                ? ""
                : "Please select a reason"
            }`}</p>
          </div>
          <div className="inline field">
            <div className="ui checkbox">
              <input
                type="checkbox"
                tabIndex="0"
                checked={this.state.isChecked}
                onChange={() =>
                  this.setState({ isChecked: !this.state.isChecked })
                }
              />
              <label>End Bell</label>
            </div>
          </div>
          <button
            className={`ui secondary button ${
              this.isTimeValid() && (this.isTypeValid() || this.state.isChecked)
                ? ""
                : "disabled"
            }`}
            type="submit"
            onClick={this.onFormSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ScheduleForm;
