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
    findTaskByTaskId = (taskId)=>{
        let resultTask;
        this.tasks.forEach((task)=>{
            if(task.taskId === taskId){
                resultTask = task;
            }
        });
        return resultTask;
    }

    @action
    activateTask(task){
        this.activeTask = task;
    }

    @action
    replaceTask = async (taskId)=>{
        //task Id에 해당하는 task객체 검색
        let readyTask;
        await this.tasks.forEach(task => { //foreach가 비동기로 실행돼서 await해주었음
            if(task.taskId === taskId){
                readyTask = task;
            }
        });
        console.log(readyTask);
        this.activeTask = readyTask;
    }

    @action
    deactivateTask = async (taskId)=>{
        let rmvIdx;
        //let rmvTask;
        let nextTask;
        await this.tasks.forEach((task,idx,tasks)=>{
            if(task.taskId === taskId){
                rmvIdx = idx;
                //rmvTask = task;
                if(rmvIdx === (tasks.length-1)){
                    nextTask = null;
                }else{
                    nextTask = tasks[rmvIdx+1];
                }
            }
        });
        this.tasks.splice(rmvIdx,1); //삭제
        return nextTask; //삭제한 task가 작업중인 화면이었던 경우 화면 전환을 위해 다음 작업을 반환
    }

    @action
    addTask(task){
        this.tasks.push(task);
    }

    @action
    setActiveTaskPage(pageName){ //active task의 페이지를 전환한다. (초기값은 GTD)
        this.activeTask.currentPage = pageName;
    }
}

export const taskStore = new TaskStore();