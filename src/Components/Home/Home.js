import React from "react";
import HomeDisplay from "../HomeDisplay/HomeDisplay";
import Raspberry from "../../api/Raspberry";
import HomeLogin from "../HomeLogin/HomeLogin";
import './Home.css'

class Home extends React.Component {
  state = {
    schedule: [],
    loading: true,
    error: ""
  };
  componentDidMount() {
    this.getNextTime();
  }

  getNextTime = () => {
    Raspberry.get("/currentSchedule")
      .then(response => {
        if (response.status === 200) {
          this.setState({
            schedule: response.data.result,
            loading: false,
            error: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: `${error}`
        });
      });
  };

  render() {
    return (
      <div className="home-login">
          <div className="login-display">
            <HomeLogin/>
      </div>
      <div className='home-display'>
      <HomeDisplay schedule={this.state.schedule} />
      </div>
      </div>
    );
  }
}

export default Home;
