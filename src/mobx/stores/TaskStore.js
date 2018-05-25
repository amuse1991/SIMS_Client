import { observable, action } from "mobx";
import Task from '../../classes/Task';

export default class TaskStore {
    @observable
    _activeTaskId;
    @observable
    _tasks;

    constructor(){
        this._activeTaskId = null;
        this._tasks = [];
    }

    getActivateTaskId(){
        return this._activeTaskId;
    }

    @action
    setActivateTaskId(taskId){
        this._activeTaskId = taskId
    }

    @action
    addTask(satelliteId){
        //TODO : satelliteID로 위성 이름 정보 가져오기
        //TODO : task 객체 생성하기
        this._tasks.push(new Task('01',true));
    }
}