import React from "react";
// import abstract from "../../Images/abstract.jpg"
import Raspberry from "../../api/Raspberry";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

class HomeLogin extends React.Component {
  state = {
    changePassword: false,
    prevPassword: "",
    newPassword: "",
    confirmPassword: "",
    statusCode: null,
    status: null,
    showMessage: null
  };
  onSubmit = e => {
    e.preventDefault();
    sessionStorage.setItem("login", false);
    window.location.reload();
  };

  onChangePassword = e => {
    e.preventDefault();
    this.setState({ changePassword: true });
  };

  onCancel = e => {
    e.preventDefault();
    this.setState({ changePassword: false });
  };

  onResetSubmit = e => {
    e.preventDefault();
    if (this.state.newPassword === this.state.confirmPassword) {
      Raspberry.post("/changePassword", { password: this.state.newPassword })
        .then(response => {
          if (response.status === 200) {
            this.setState({
              statusCode: response.data.code,
              status: response.data.status,
              showMessage: true
            });
            if(this.state.statusCode ===1){
            this.setState({changePassword:false});
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  displayMessage = () => {
    if (this.state.showMessage) {
      if (this.state.statusCode === 0) {
        return <ErrorDisplay message={this.state.status}  headerData='Error!'/>;
      }
    }
  };

  displayComponent = () => {
    if (this.state.changePassword === false) {
      return (
        <div className="welcome">
          <h2 className="ui center aligned icon header">
            <i className="user huge user circle icon " /> Welcome Admin
          </h2>
          <br />
          <br />
          <button
            className="logout ui secondary button"
            type="submit"
            onClick={this.onSubmit}
          >
            Log Out
          </button>
          <button
            className="logout ui secondary right floated button"
            type="submit"
            onClick={this.onChangePassword}
          >
            Change Password
          </button>
        </div>
      );
    }
    if (this.state.changePassword === true) {
      return (
        <div>
          <form className="ui form">
            <div className="field">
              <label>New Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={e => this.setState({ newPassword: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Re-enter New Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Password"
                onChange={e => {
                  this.setState({ confirmPassword: e.target.value });
                }}
              />
              <p>
                {this.state.newPassword === this.state.confirmPassword
                  ? ""
                  : "Password Mismatch"}
              </p>
            </div>
            <button
              className="ui secondary button"
              type="submit"
              onClick={this.onResetSubmit}
            >
              Submit
            </button>
            <button
              className="ui secondary right floated button"
              type="submit"
              onClick={this.onCancel}
            >
              Cancel
            </button>
          </form>
          {this.displayMessage()}
        </div>
      );
    }
  };

  render() {
    return this.displayComponent();
  }
}

export default HomeLogin;
