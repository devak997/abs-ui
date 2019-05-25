import React from "react";
import HomeDisplay from '../HomeDisplay/HomeDisplay'
import Loader from "../Loader/Loader";
import Raspberry from '../../api/Raspberry'
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";

class Home extends React.Component {
  state={
    schedule : [],
    loading: true,
    error: "",
  }
  componentDidMount () {
    this.getNextTime();
  }

  getNextTime = () =>{
    Raspberry.get('/currentSchedule')
      .then(response => {
        if (response.status === 200) {
            console.log(response)
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
  }
  displayData = () =>{
    if (this.state.loading === true) {
      return <Loader message="Contacting Server" />;
    } else if (this.state.error !== "" && this.state.error !== false) {
      return <ErrorDisplay message={this.state.error} />;}
    else{

    }};

  render() {
    return (
      <div>
      <HomeDisplay
      schedule ={this.state.schedule}></HomeDisplay>
      </div>
      );
  }
}

export default Home;
