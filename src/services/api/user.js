import axios from "axios";
import {serverConfig} from "../../configure/app.config"
const serverPath = `http://${serverConfig.host}:${serverConfig.serverApiPort}`;

export function login(id,pwd){
    return axios.post(`${serverPath}/user/login`,{
        id:id,
        pwd:pwd
    });
}

export function createUser(id,pwd,userName,dept,pos,mail,phone){
    return axios.post(`${serverPath}/user/create`,{
        id:id,
        pwd:pwd,
        userName:userName,
        dept:dept,
        pos:pos,
        mail:mail,
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