import axios from "axios";
import {serverConfig} from "../../configure/app.config"
const serverPath = `http://${serverConfig.host}:${serverConfig.serverApiPort}`;

export function connect(rtdType){
    return axios.get(`${serverPath}/rtd/connect/${rtdType}`);
}

export function disconnect(rtdType){
    return axios.get(`${serverPath}/rtd/disconnect/${rtdType}`);
}

export function getTMlistBySatCode(satelliteCode){
    return axios.post(`${serverPath}/rtd/tm/list`,{
        satelliteCode:satelliteCode
    });
}

export function getTClistBySatCode(satelliteCode){
    return axios.post(`${serverPath}/rtd/tc/list`,{
        satelliteCode:satelliteCode
    });
}