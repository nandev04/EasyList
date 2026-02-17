import styles from "./containerTask.module.css";
import { CreateTaskPayload, StatusTask } from "../../types/task.types";
import EditTaskBtn from "../editTaskBtn/EditTaskBtn";
import DeleteTaskBtn from "../deleteTaskBtn/DeleteTaskBtn";

const ContainerTask = ({
  taskId,
  title,
  description,
  status,
}: CreateTaskPayload & { taskId: number; updateAt: number }) => {
  const statusColorMap: Record<StatusTask, string> = {
    [StatusTask.COMPLETED]: "var(--task-completed)",
    [StatusTask.IN_PROGRESS]: "var(--task-inProgress)",
    [StatusTask.PENDING]: "var(--task-pending)",
  };

  const bgCard = statusColorMap[status];

  return (
    <div className={styles.task_container}>
      <div style={{ backgroundColor: bgCard }} className={styles.wrapper_card}>
        <h3 className={styles.task_title}>{title}</h3>
        <p className={styles.task_description}>{description}</p>
      </div>
      <div className={styles.container_btn}>
        {<EditTaskBtn data={{ title, description, status }} taskId={taskId} />}
        <DeleteTaskBtn taskId={taskId} />
      </div>
    </div>
  );
};

export default ContainerTask;
