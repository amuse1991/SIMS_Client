import axios from "axios";
import {serverConfig} from "../../configure/app.config"
const serverPath = `http://${serverConfig.host}:${serverConfig.serverApiPort}`;

export function getAllOrbitData(time){
    return axios.get(`${serverPath}/gtd/orbitData/all/${time}`);
}

export function getOrbitDataBySatCode(satelliteCode, time){
    return axios.post(`${serverPath}/gtd/orbitData`,{
        satelliteCode:satelliteCode,
        time:time
    });
}