import { taskStatus } from '../types/tasks.js';
const validateTaskStatus = (req, _res, next) => {
    const { status } = req.body;
    if (status && !Object.values(taskStatus).includes(status)) {
        const error = new Error(`Status inválido. Valores permitidos: ${Object.values(taskStatus).join(', ')}`);
        error.status = 400;
        return next(error);
    }
    next();
};
export default validateTaskStatus;
