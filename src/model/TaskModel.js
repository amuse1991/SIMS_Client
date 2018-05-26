import { v4 } from "uuid";

export default class TaskModel{
    id;
    satelliteId;
    satelliteName;
    isActivated;

    constructor(satelliteId, satelliteName, isActivated){
        this.id = v4();
        this.satelliteId = satelliteId;
        this.satelliteName = satelliteName;
        this.isActivated = isActivated;
    }
}