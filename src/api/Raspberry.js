import axios from 'axios';

export default axios.create({

    baseURL: "http://raspberrypi:8000/"
});