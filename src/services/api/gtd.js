import axios from "axios";
import {serverConfig} from "../../configure/app.config"
const serverPath = `http://${serverConfig.host}:${serverConfig.serverApiPort}`;

export function getAllOrbitData(){
    return axios.get(`${serverPath}/gtd/orbitData/all`);
}

export function getOrbitDataBySatCode(satelliteCode){
    return axios.post(`${serverPath}/gtd/orbitData`,{
        satelliteCode:satelliteCode
    });
}