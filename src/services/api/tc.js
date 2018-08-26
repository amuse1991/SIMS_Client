import axios from "axios";
import {serverConfig} from "../../configure/app.config"
const serverPath = `http://${serverConfig.host}:${serverConfig.serverApiPort}`;

export function getMeta(telecommandCode, showColumns){
    return axios.post(`${serverPath}/tc/meta`,{
        telecommandCode:telecommandCode,
        showColumns:showColumns
    });
}

export function getData(telecommandCode,startDate,endDate){
    return axios.post(`${serverPath}/tc/archived`,{
        telecommandCode:telecommandCode,
        startDate:startDate,
        endDate:endDate
    });
}

export function getChartType(telecommandCode,selectOption){
    return axios.post(`${serverPath}/tc/chart/type`,{
        telecommandCode:telecommandCode,
        selectOption:selectOption
    });
}

export function getDataForCharting(telecommandCode,startDate,endDate){
    return axios.post(`${serverPath}/tc/chart/data`,{
        telecommandCode:telecommandCode,
        startDate:startDate,
        endDate:endDate
    });
}