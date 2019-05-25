import axios from 'axios';

export default axios.create({
    baseURL: "http://raspberrypi.mshome.net:8000"
});