import axios from "axios";
import {serverConfig} from "../../configure/app.config"
const serverPath = `http://${serverConfig.host}:${serverConfig.serverApiPort}`;

export function login(id,pwd){
    return axios.post(`${serverPath}/user/login`,{
        id:id,
        pwd:pwd
    });
}

export function createUser(id,pwd,dept,pos,phone){
    return axios.post(`${serverPath}/user/create`,{
        id:id,
        pwd:pwd,
        dept:dept,
        pos:pos,
        phone:phone
    });
}

//TODO
export function updateUser(){
    return axios.post(`${serverPath}/user/update`,{

    });
}

//TODO
export function deleteUser(){
    return axios.delete(`${serverPath}/user/delete`);
}