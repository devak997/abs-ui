import React from "react";
import { Link } from "react-router-dom";
class NavBar extends React.Component {
  constructor(){
    super();
    if(sessionStorage.getItem("activePage") === null)
    {
      sessionStorage.setItem("activePage",1);
    }
    this.state = { active: parseInt(sessionStorage.getItem("activePage")) } ;
  }

  render() {
    return (
      <div className="ui inverted pointing menu">
        <Link
          to="/"
          className={`item ${this.state.active === 1 ? "active" : ""}`}
          onClick={() => {this.setState({ active: 1 });sessionStorage.setItem("activePage",1);}}
        >
          Home
        </Link>

        <Link
          to="/schedule"
          className={`item ${this.state.active === 2 ? "active" : ""}`}
          onClick={() => {this.setState({ active: 2 });sessionStorage.setItem("activePage",2)}}
        >
          Schedule
        </Link>

        <Link
          to="/holidays"
          className={`item ${this.state.active === 3 ? "active" : ""}`}
          onClick={() => {this.setState({ active: 3 });sessionStorage.setItem("activePage",3)}}
        >
          Holidays
        </Link>
        <Link
          to="/logs"
          className={`item ${this.state.active === 4 ? "active" : ""}`}
          onClick={() => {this.setState({ active: 4 });sessionStorage.setItem("activePage",4)}}
        >
          Logs
        </Link>
        <div className='right menu'>
      <Link
            to="/docs"
            className={`item ${this.state.active === 5 ? "active" : ""}`}
            onClick={() => {this.setState({ active: 5 });sessionStorage.setItem("activePage",5)}}
        >
           Documentation
        </Link>
        </div>
      </div>
    );
  }
}

export default NavBar;
