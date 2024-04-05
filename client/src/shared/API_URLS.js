
const ipAddress = "http://localhost:8800";

const userBase = ipAddress + "/userService/api";
const taskBase = ipAddress + "/taskService/api";

export const API_URL = {
    User: {
        POST_USER_LOGIN:  userBase + "/login",
        POST_USER_SIGNUP: userBase + "/signup",
    },

    Task: {
        PUT_TASKS_BY_USER_ID: taskBase + "/getTasksbyUserId/{userId}",
        PUT_NEW_TASK: taskBase + "/addNewTask",
        DELETE_TASKS_BY_ID: taskBase + "/deleteTaskbyId/{taskId}",
        PUT_UPDATE_TASK_BY_ID: taskBase + "/updateTaskbyId/{taskId}",
    },
};
