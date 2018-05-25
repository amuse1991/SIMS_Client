import { v4 } from "uuid";

export default class Task{
    _id;
    _satelliteId;
    _satelliteName;
    _isActivated;

    constructor(satlliteId, activate){
        this._id = v4();
        this._satelliteId = satlliteId;
        this._satelliteName = "TEST01"; //TODO : satllite ID로 name찾도록 구현
        this._isActivated = activate;
    }
}