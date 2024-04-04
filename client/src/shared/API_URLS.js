
const ipAddress = "http://localhost:8800";

const userBase = ipAddress + "/userService/api";
const taskBase = ipAddress + "/taskService/api";

export const API_URL = {
    User: {
        POST_USER_LOGIN:  userBase + "/login",
        POST_USER_SIGNUP: userBase + "/signup"
    },

    Task: {
        GET_TASKS_BY_USER_ID: taskBase + "/getTasksbyId/{userId}",
    },
};
