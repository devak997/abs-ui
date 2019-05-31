import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class HolidayForm extends React.Component {
  state = {
    selectedDate: new Date(),
    endDate: new Date(),
    selectedOpt: ""
  };

  onSubmitClicked = e => {
    e.preventDefault();
    this.props.onFormSubmit(
      this.state.selectedDate.toLocaleDateString("en-GB")
    );
  };

  onVacationSubmitClicked = e => {
    e.preventDefault();
    if (this.state.endDate !== new Date()) {
      this.props.onFormSubmit(
        this.state.selectedDate.toLocaleDateString("en-GB"),
        this.state.endDate.toLocaleDateString("en-GB")
      );
    }
  };

  handleChange = e => {
    this.setState({ selectedOpt: e.target.value})
    
  };

  render() {
    return (
      <div>
        <form className="ui form">
          <div className="field">
            <lable>
              <i className="calendar icon" />
              Select Holiday Type
            </lable>
          </div>
          <div className="field">
            <select
              class="ui dropdown"
              id="selectHoliday"
              value={this.state.selectedOpt}
              onChange={this.handleChange}
            >
              <option value="">Select Type</option>
              <option value="1">Single Holiday</option>
              <option value="2">Vacation</option>
            </select>
          </div>
        </form>

        <br/>

        <div className="field" id="single" style={{ display: this.state.selectedOpt === "1" ? "" : "none" }}>
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
        <div className="field" id="vacation" style={{ display: this.state.selectedOpt === "2" ? "" : "none" }}>
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
            <div className="field">
              <label>
                <i className="calendar icon" />
                Date
              </label>
              <div className="ui input">
                <DatePicker
                  dateFormat="dd/MM/YYYY"
                  selected={this.state.endDate}
                  onChange={date => this.setState({ endDate: date })}
                />
              </div>
            </div>
            <button
              className={`ui secondary button`}
              type="submit"
              onClick={this.onVacationSubmitClicked}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default HolidayForm;
