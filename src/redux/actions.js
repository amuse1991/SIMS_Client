import ActionType from "./constants";
import {v4} from "uuid";

/*
 아래 함수는 액션 생성 함수로써, 액션 페이로드 데이터를 만들어서 반환한다.
*/

export const addTask = (satelliteId) => {
    return ({
        type: ActionType.ADD_TASK,
        id: v4(),
        satelliteId
    });
}

export const removeTask = (id) => {
    return ({
        type: ActionType.REMOVE_TASK,
        id
    })
}

export const activateTask = (id) => {
    return ({
        type: ActionType.ACTIVE_TASK,
        activatedTask
    })
}

export const deactivateTask = (id) => {
    return ({
        type: ActionType.ACTIVE_TASK,
        activatedTask
    })
}
