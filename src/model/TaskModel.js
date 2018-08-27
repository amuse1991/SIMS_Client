import { v4 } from "uuid";

export default class TaskModel {
    constructor(satelliteCode,satelliteName, tmList, tcList, rtdTmType, rtdTcType, currentPage){
        this.taskId = v4();
        this.satelliteCode = satelliteCode;
        this.satelliteName = satelliteName;
        this.tmList = tmList;
        this.tcList = tcList;
        this.rtdTmType = rtdTmType;
        this.rtdTcType = rtdTcType;
        this.currentPage = currentPage;
    }
}