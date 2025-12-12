// interface TaskType {
//   title: string;
//   description?: string;
//   userId: number;
//   date?: string;
//   status?: taskStatus;
// }
var taskStatus;
(function (taskStatus) {
    taskStatus["PENDING"] = "PENDING";
    taskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    taskStatus["COMPLETED"] = "COMPLETED";
})(taskStatus || (taskStatus = {}));
export { taskStatus };
