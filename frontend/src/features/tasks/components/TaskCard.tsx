import styles from "./taskCard.module.css";
import { CreateTaskPayload, StatusTask } from "../types/task.types";
import EditTaskBtn from "./EditTaskBtn";
import DeleteTaskBtn from "./DeleteTaskBtn";

const TaskCard = ({
  taskId,
  title,
  description,
  status,
}: CreateTaskPayload & { taskId: number }) => {
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
        <div className={styles.container_btn_mobile}>
          <EditTaskBtn
            variant="mobile_button"
            data={{ title, description, status }}
            taskId={taskId}
          />

          <DeleteTaskBtn variant="mobile_button" taskId={taskId} />
        </div>
      </div>
      <div className={styles.container_btn_desktop}>
        {
          <EditTaskBtn
            variant="desktop_button"
            data={{ title, description, status }}
            taskId={taskId}
          />
        }
        <DeleteTaskBtn variant="desktop_button" taskId={taskId} />
      </div>
    </div>
  );
};

export default TaskCard;
