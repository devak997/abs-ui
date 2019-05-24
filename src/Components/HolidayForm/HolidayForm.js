import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class HolidayForm extends React.Component {
  state = { selectedDate: new Date() };

  onSubmitClicked = e => {
    e.preventDefault();
    this.props.onFormSubmit(
      this.state.selectedDate.toLocaleDateString("en-GB")
    );
  };

  render() {
    return (
      <div>
        <form className="ui form">
          <div className="field">
            <label>
              <i className="calendar icon" />
              Date
            </label>
            <div className="ui input">
              <DatePicker
                dateFormat="dd/MM/YYYY"
                selected={this.state.selectedDate}
                onChange={date => this.setState({ selectedDate: date })}
              />
            </div>
          </div>
          <button
            className={`ui secondary button`}
            type="submit"
            onClick={this.onSubmitClicked}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default HolidayForm;
