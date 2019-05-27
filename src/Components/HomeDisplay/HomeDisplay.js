import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import upcoming from '../../Images/upcoming.svg'
import prev from '../../Images/prev.jpg'
import welcome from '../../Images/welcome.png'
import './HomeDisplay.css'

class HomeDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.timeList = [];
        this.prevList = [];
        this.durationList=[];
        this.currentTime = new Date();
        this.state = {
            currentTime: this.currentTime.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'})+":00"
        }
    }
    nextBell = () => {
        console.log(this.state.currentTime);
        let nextTime = ''
        let i;
        for (i = 0; i < this.props.schedule.length; i++) {
            if(this.timeList.includes(this.timeList[i])===false)
            this.timeList.push(this.props.schedule[i].time);
        }
        
        for (i = 0; i < this.timeList.length; i++) {
            if (this.timeList[i] > this.state.currentTime) {
                nextTime = this.timeList[i];
                this.durationIndex = this.timeList.indexOf(nextTime);
                break;
            }
        }
        if (nextTime === '') {
            return('No Times in Schedule')
        }
        else{
        return (<p>Time: {nextTime}</p>)
        }
    };

    prevBell = () =>{
        
        let prevTime = ''
        let i;
        for (i = 0; i < this.timeList.length; i++) {
            if (this.timeList[i] <= this.state.currentTime && (this.prevList.includes(this.timeList[i]))===false) {
                this.prevList.push(this.timeList[i])
            }
        }

        prevTime = this.prevList[this.prevList.length-1];
        if (prevTime === '' || prevTime === undefined) {
            return <p>No Previous Bells</p>
        }
        else{
            return (<p>Time: {prevTime}</p>)
        }
    }

    duration = () =>{ 
        let i;
        for (i = 0; i < this.props.schedule.length; i++) {
            if(this.durationList.includes(this.durationList[i])===false)
            this.durationList.push(this.props.schedule[i].duration);
        }
        
        if (this.durationList[this.durationIndex] === undefined || this.nextBell()==="No Times in Schedule")
        {
            return <p></p>
        }
        else{
            return <p>Duration: {this.durationList[this.durationIndex]} sec</p>
        }
    }

    tick = () => {
        const newCurrentTime = new Date();
        this.setState({ currentTime: newCurrentTime.toLocaleTimeString('en-GB', {hour: '2-digit', minute:'2-digit'})+":00"})
    }

    componentDidMount(){
        this.interval = setInterval(this.tick, 1000);
    }

    render() {
        return (
            <div>
                <Image raised={true} src={welcome} centered='true' size='big'/>
            <div className='main'>
                <div className="prevTime">
                    <Card raised={true} fluid={true} color='black'>
                        <Card.Content>
                            <Image floated='left' width='65px' height='60px' src={prev} />
                            <Card.Header textAlign='center'>Previous Bell</Card.Header>
                            <Card.Header textAlign='center'><br></br>{this.prevBell()}</Card.Header>
                        </Card.Content>
                    </Card>
                </div>
                <div className="NextTime">
                    <Card raised={true} fluid={true} color='black'>
                        <Card.Content>
                            <Image floated='left' width='80px' src={upcoming} />
                            <Card.Header textAlign='center'>Upcoming Bell</Card.Header>
                            <Card.Header textAlign='center'><br></br>{this.nextBell()}</Card.Header>
                            <Card.Header textAlign='center'><br></br>{this.duration()}</Card.Header>
                        </Card.Content>
                    </Card>
                </div>
            </div>
            </div>
        );
    }
}

export default HomeDisplay