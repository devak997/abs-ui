import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import addTime from '../../Images/addTime.png'
import './HomeDisplay.css'

class HomeDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.timeList = [];
        this.prevList = [];
        this.currentTime = new Date();
        this.state = {
            currentHour: this.currentTime.getHours(),
            currentMinutes: this.currentTime.getMinutes(),
            currentTime: this.currentTime.getHours() + ":" + this.currentTime.getMinutes() + ":" + "00"
        }
    }
    nextBell = () => {
        let nextTime = ''
        let i;
        for (i = 0; i < this.props.schedule.length; i++) {
            this.timeList.push(this.props.schedule[i].time);
        }
        console.log(this.timeList);
        
        setInterval(this.tick, 30000);
        for (i = 0; i < this.timeList.length; i++) {
            if (this.timeList[i] > this.state.currentTime) {
                nextTime = this.timeList[i];
                break;
            }
        }
        if (nextTime === '') {
            nextTime = "No times in schedule"
        }
        return (<p>{nextTime}</p>)
    };

    prevBell = () =>{
        let prevTime = ''
        let i;
        setInterval(this.tick, 30000);
        for (i = 0; i < this.timeList.length; i++) {
            if (this.timeList[i] < this.state.currentTime) {
                this.prevList.push(this.timeList[i])
            }
        }
        
        prevTime = this.prevList[this.prevList.length-1];
        if (prevTime === '' || prevTime === undefined) {
            prevTime = "No Previous Bells";
        }
        return (<p>{prevTime}</p>)
    }

    tick = () => {
        const newCurrentTime = new Date();
        this.setState({ currentHour: newCurrentTime.getHours() });
        this.setState({ currentMinutes: newCurrentTime.getMinutes() });
        this.setState({ currentTime: this.state.currentHour + ":" + this.state.currentMinutes + ":" + "00" })
    }
    render() {
        return (
            <div>
                <div className="NextTime">
                    <Card raised={true} fluid={true}>
                        <Card.Content>
                            <Image floated='left' width='80px' src={addTime} />
                            <Card.Header textAlign='center'>Next Time</Card.Header>
                            <div className="abc">
                                <Card.Header>{this.nextBell()}</Card.Header>
                            </div>
                        </Card.Content>
                    </Card>
                </div>
                <div className="prevTime">
                    <Card raised={true} fluid={true}>
                        <Card.Content>
                            <Image floated='left' width='80px' src={addTime} />
                            <Card.Header textAlign='center'>Previous Time</Card.Header>
                            <div className="abc">
                                <Card.Header>{this.prevBell()}</Card.Header>
                            </div>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        );
    }
}

export default HomeDisplay