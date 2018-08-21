import { v4 } from "uuid";

export default class TaskModel {
    constructor(satelliteCode,satelliteName){
        this.taskId = v4();
        this.satelliteCode = satelliteCode;
        this.satelliteName = satelliteName;
    }
}