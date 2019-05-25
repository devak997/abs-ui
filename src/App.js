import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import { Route, Switch } from "react-router-dom";
import ScheduleDisplay from "./Components/ScheduleDisplay/ScheduleDisplay";
import HolidayDisplay from "./Components/HolidayDisplay/HolidayDisplay";
import LogDisplay from "./Components/LogDisplay/LogDisplay";
import Home from "./Components/Home/Home";

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/schedule" component={ScheduleDisplay} />
          <Route path="/holidays" component={HolidayDisplay} />
          <Route path="/logs" component={LogDisplay}/>
        </Switch>
      </div>
    );
  }
}

export default App;
