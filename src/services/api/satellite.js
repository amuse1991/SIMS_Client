import axios from "axios";
import {serverConfig} from "../../configure/app.config"
const serverPath = `http://${serverConfig.host}:${serverConfig.serverApiPort}`;

/*
{
  // `data` 는 서버에서 반환한 데이터입니다. 
  data: {},

  // `status` 는 서버에서 반환한 HTTP 상태입니다
  status: 200,

  // `statusText` 는 HTTP 상태 메시지입니다
  statusText: 'OK',

  // `headers` 는 서버에서 반환한 헤더값입니다
  headers: {},

  // `config` 는 axios 요청시 전달했던 설정값입니다
  config: {}
}
*/

export function getSatelliteList(){
    return axios.get(`${serverPath}/satellite/list`);
}

export function getInfo(satelliteCode){
  return axios.post(`${serverPath}/satellite/info`,{
    satelliteCode:satelliteCode
  });
}

export function getTMmetaListBySatCode(satelliteCode){
  return axios.post(`${serverPath}/satellite/tm/meta/list`,{
    satelliteCode:satelliteCode
  });
}

export function getTCmetaListBySatCode(satelliteCode){
  return axios.post(`${serverPath}/satellite/tc/meta/list`,{
    satelliteCode:satelliteCode
  });
}

export function getSatCount(){
  return axios.get(`${serverPath}/satellite/count`);
}