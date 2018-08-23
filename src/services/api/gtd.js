import axios from "axios";
import {serverConfig} from "../../configure/app.config"
const serverPath = `http://${serverConfig.host}:${serverConfig.serverApiPort}`;

export function getAllOrbitData(timeString,term){
    return axios.get(`${serverPath}/gtd/orbitData/all/${timeString}/${term}`);
}

export function getOrbitDataBySatCode(satelliteCode, timeString, term){
    return axios.post(`${serverPath}/gtd/orbitData`,{
        satelliteCode:satelliteCode,
        timeString:timeString,
        term:term
    });
}