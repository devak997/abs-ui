import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import { Route, Switch } from "react-router-dom";
import ScheduleDisplay from "./Components/ScheduleDisplay/ScheduleDisplay";
import HolidayDisplay from "./Components/HolidayDisplay/HolidayDisplay";
import LogDisplay from "./Components/LogDisplay/LogDisplay";
import Documentation from "./Components/Documentation/Documentation";
import Home from "./Components/Home/Home";
import LoginPage from "./Components/LoginPage/LoginPage";
import HomeDisplay from "./Components/HomeDisplay/HomeDisplay";
import Raspberry from "./api/Raspberry";
import ErrorDisplay from "./Components/ErrorDisplay/ErrorDisplay";
import "./App.css";

class App extends React.Component {
  state = {
    schedule: [],
    invalidLogin: false,
    error: ''
  };

  componentDidMount() {
    this.getNextTime();
<<<<<<< HEAD
    // sessionStorage.setItem("login", false);
=======
    sessionStorage.setItem("login", false);
>>>>>>> 09732c90f4fa9495e867951fc106c97fbcefe453
  }

  getNextTime = () => {
    Raspberry.get("/currentSchedule")
      .then(response => {
        if (response.status === 200) {
          this.setState({
            schedule: response.data.result
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  loginUser = data => {
    Raspberry.post("/login", { data })
      .then(response => {
        if (response.data.login === true) {
          sessionStorage.setItem("login", true);
          window.location.reload();
        } else {
          this.setState({ invalidLogin: true });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({error: err.message})
      });
  };

  displayContent = () => {
    if (JSON.parse(sessionStorage.getItem("login")) === true) {
      return (
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/schedule" component={ScheduleDisplay} />
            <Route path="/holidays" component={HolidayDisplay} />
            <Route path="/logs" component={LogDisplay} />
            <Route path="/docs" component={Documentation} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="app-login">
          <h1 class="ui centered header">Welcome To Automated Bell System</h1>
          <div className="login-form">
            <LoginPage loginUser={this.loginUser} />
            <p>{ this.state.invalidLogin ? <ErrorDisplay headerData="Unable to Login" message="Invalid Creditnals" />: ""}</p>
            <p>{this.state.error !== '' ?  <ErrorDisplay headerData="Unable to Login" message={this.state.error} /> : ""}</p>
          </div>
          <div className="home-display">
            <HomeDisplay schedule={this.state.schedule} />
          </div>
        </div>
      );
    }
  };
  render() {
    return this.displayContent();
  }
}

export default App;
