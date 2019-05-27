import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import { Route, Switch } from "react-router-dom";
import ScheduleDisplay from "./Components/ScheduleDisplay/ScheduleDisplay";
import HolidayDisplay from "./Components/HolidayDisplay/HolidayDisplay";
import LogDisplay from "./Components/LogDisplay/LogDisplay";
import Documentation from './Components/Documentation/Documentation'
import Home from "./Components/Home/Home";
import Helmet from 'react-helmet'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Helmet>
                <style>{'body { background-color: rgb(245,235,245) }'}</style>
            </Helmet>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/schedule" component={ScheduleDisplay} />
          <Route path="/holidays" component={HolidayDisplay} />
          <Route path="/logs" component={LogDisplay}/>
          <Route path='/docs' component={Documentation}/>
        </Switch>
      </div>
    );
  }
}

export default App;
