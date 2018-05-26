import { observable, action } from "mobx";

class TaskStore {
    @observable
    activeTask; // : Task
    @observable 
    tasks; // : Array<Task>

    constructor(){
        this.activeTask = null;
        this.tasks = [];
    }

    @action
    activateTask(task){
        this.activeTask = task;
    }

    @action
    deactivateTask(taskId){
        //TODO : deactivate task
    }

    @action
    addTask(task){
        this.tasks.push(task);
    }
}

export const taskStore = new TaskStore();