import React from "react";
import { Link } from "react-router-dom";
class NavBar extends React.Component {
  state = { active: 1 };
  render() {
    return (
      <div className="ui  pointing  menu">
        <Link
          to="/"
          className={`item ${this.state.active === 1 ? "active" : ""}`}
          onClick={() => this.setState({ active: 1 })}
        >
          Home
        </Link>

        <Link
          to="/schedule"
          className={`item ${this.state.active === 2 ? "active" : ""}`}
          onClick={() => this.setState({ active: 2 })}
        >
          Schedule
        </Link>

        <Link
          to="/holidays"
          className={`item ${this.state.active === 3 ? "active" : ""}`}
          onClick={() => this.setState({ active: 3 })}
        >
          Holidays
        </Link>
        <Link
          to="/logs"
          className={`item ${this.state.active === 4 ? "active" : ""}`}
          onClick={() => this.setState({ active: 4 })}
        >
          Logs
        </Link>

        <div className="right menu">
          <Link
            to="/"
            className={`item ${this.state.active === 5 ? "active" : ""}`}
            onClick={() => this.setState({ active: 5 })}
          >
            Documentation
          </Link>
        </div>
      </div>
    );
  }
}

export default NavBar;
