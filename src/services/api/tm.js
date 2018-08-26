import axios from "axios";
import {serverConfig} from "../../configure/app.config"
const serverPath = `http://${serverConfig.host}:${serverConfig.serverApiPort}`;

export function getMeta(telemetryCode, showColumns){
    return axios.post(`${serverPath}/tm/meta`,{
        telemetryCode:telemetryCode,
        showColumns:showColumns
    });
}

export function getData(telemetryCode,startDate,endDate){
    return axios.post(`${serverPath}/tm/archived`,{
        telemetryCode:telemetryCode,
        startDate:startDate,
        endDate:endDate
    });
}

export function getChartType(telemetryCode,selectOption){
    return axios.post(`${serverPath}/tm/chart/type`,{
        telemetryCode:telemetryCode,
        selectOption:selectOption
    });
}

export function getDataForCharting(telemetryCode,startDate,endDate){
    return axios.post(`${serverPath}/tm/chart/data`,{
        telemetryCode:telemetryCode,
        startDate:startDate,
        endDate:endDate
    });
}