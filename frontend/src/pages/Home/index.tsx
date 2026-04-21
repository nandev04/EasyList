import CreateTaskBtn from "../../components/createTaskBtn/CreateTaskBtn";
import ContainerTask from "../../components/taskCard/ContainerTask";
import styles from "./home.module.css";
import useDelayLoading from "../../hooks/React/useDelayLoading";
import LoadingTask from "../../components/loadingTask/LoadingTask";
import DropdownHeader from "../../components/dropdownHeader/DropdownHeader";
import { useState } from "react";
import { StatusTask } from "../../types/task.types";
import DropdownFilter from "../../components/dropDownFilter/DropdownFilter";
import { useGetUser } from "../../hooks/React/useUser";
import useTasks from "../../hooks/React/useTasks";

const Home = () => {
  const user = useGetUser();
  const tasks = useTasks(!!user.data);

  const { showLoading } = useDelayLoading(tasks.isLoading, 300);
  const [selectedStatus, setSelectedStatus] = useState<StatusTask | null>(null);
  const statusLabel: Record<StatusTask, string> = {
    [StatusTask.PENDING]: "Pendente",
    [StatusTask.IN_PROGRESS]: "Em progresso",
    [StatusTask.COMPLETED]: "Concluído",
  };

  const filters = Object.values(StatusTask);

  if (tasks.isLoading && !showLoading) return null;
  if (tasks.isLoading) return <LoadingTask />;

  const filteredTasks = (tasks.data ?? []).filter((task) =>
    selectedStatus ? task.status === selectedStatus : true,
  );

  return (
    <>
      <header className={styles.header}>
        <DropdownHeader />
      </header>
      <main className={styles.main}>
        <h1 className={styles.welcome_title}>
          <span>Olá</span>, {user.data?.username}!
        </h1>
        <section className={styles.tasks_section}>
          <div className={styles.container_section}>
            <div className={styles.actions_container}>
              <CreateTaskBtn />
              <div className={styles.filter_container}>
                <div className={styles.filter_buttons_container}>
                  {(selectedStatus ? [selectedStatus] : filters).map(
                    (status) => (
                      <button
                        key={status}
                        className={`${styles.filter_button} ${selectedStatus === status ? styles.active : ""}`}
                        onClick={() => {
                          setSelectedStatus((prev) =>
                            prev === status ? null : status,
                          );
                        }}
                      >
                        {statusLabel[status]}
                      </button>
                    ),
                  )}
                </div>
                <div className={styles.dropdown_filter_container}>
                  <DropdownFilter
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    statusLabel={statusLabel}
                    filter={filters}
                  />
                </div>
              </div>
            </div>
            {tasks.data?.length === 0 && (
              <div className={styles.container_guidance}>
                <p className={styles.newTask_guidance}>
                  Clique no <span className={styles.more_guidance}>+</span> e
                  crie sua próxima tarefa!
                </p>
              </div>
            )}

            {tasks.data &&
              tasks.data.length > 0 &&
              filteredTasks?.length === 0 && (
                <div className={styles.container_guidance}>
                  <p className={styles.newTask_guidance}>
                    Sem tarefas, clique no{" "}
                    <span className={styles.more_guidance}>+</span> e crie sua
                    próxima tarefa!
                  </p>
                </div>
              )}

            {filteredTasks.map((task) => (
              <ContainerTask
                key={task.id}
                updateAt={tasks.dataUpdatedAt}
                taskId={task.id}
                title={task.title}
                status={task.status}
                description={task.description}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
