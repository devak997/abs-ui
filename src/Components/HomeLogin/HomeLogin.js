import React from "react";

class HomeLogin extends React.Component {

  onSubmit = e => {
    e.preventDefault();
    sessionStorage.setItem('login',false);
    window.location.reload();
  };

  render() {
    return (
      <div class="welcome">
        <h2 class="ui center aligned icon header">
          <i className="user huge user circle icon " /> Welcome Admin
        </h2>
        <button className="logout ui secondary button" type="submit" onClick={this.onSubmit}>Log Out</button>
      </div>
    );
  }
}

export default HomeLogin;
