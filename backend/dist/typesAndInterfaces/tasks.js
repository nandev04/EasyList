var taskStatus;
(function (taskStatus) {
    taskStatus["PENDING"] = "PENDING";
    taskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    taskStatus["DONE"] = "DONE";
})(taskStatus || (taskStatus = {}));
export { taskStatus };
