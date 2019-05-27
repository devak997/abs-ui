import React from "react";
import { Link } from "react-router-dom";
class NavBar extends React.Component {

  state = { active: parseInt(localStorage.getItem("activePage")) } ;
  render() {
    return (
      <div className="ui inverted pointing menu">
        <Link
          to="/"
          className={`item ${this.state.active === 1 ? "active" : ""}`}
          onClick={() => {this.setState({ active: 1 });localStorage.setItem("activePage",1);console.log(localStorage.getItem("activePage"));}}
        >
          Home
        </Link>

        <Link
          to="/schedule"
          className={`item ${this.state.active === 2 ? "active" : ""}`}
          onClick={() => {this.setState({ active: 2 });localStorage.setItem("activePage",2)}}
        >
          Schedule
        </Link>

        <Link
          to="/holidays"
          className={`item ${this.state.active === 3 ? "active" : ""}`}
          onClick={() => {this.setState({ active: 3 });localStorage.setItem("activePage",3)}}
        >
          Holidays
        </Link>
        <Link
          to="/logs"
          className={`item ${this.state.active === 4 ? "active" : ""}`}
          onClick={() => {this.setState({ active: 4 });localStorage.setItem("activePage",4)}}
        >
          Logs
        </Link>
        <div className='right menu'>
      <Link
            to="/docs"
            className={`item ${this.state.active === 5 ? "active" : ""}`}
            onClick={() => {this.setState({ active: 5 });localStorage.setItem("activePage",5)}}
        >
           Documentation
        </Link>
        </div>
      </div>
    );
  }
}

export default NavBar;
