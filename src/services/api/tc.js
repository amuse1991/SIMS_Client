import axios from "axios";
import {serverConfig} from "../../configure/app.config"
const serverPath = `http://${serverConfig.host}:${serverConfig.serverApiPort}`;

export function getMeta(telecommandCode){
    return axios.post(`${serverPath}/tc/meta`,{
        telecommandCode:telecommandCode
    });
}

export function getData(telecommandCode,selectOption){
    return axios.post(`${serverPath}/tc/archived`,{
        telecommandCode:telecommandCode,
        selectOption:selectOption
    });
}

export function getChartType(telecommandCode,selectOption){
    return axios.post(`${serverPath}/tc/chart/type`,{
        telecommandCode:telecommandCode,
        selectOption:selectOption
    });
}