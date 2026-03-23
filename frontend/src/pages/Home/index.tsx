import { useQuery } from "@tanstack/react-query";
import CreateTaskBtn from "../../components/createTaskBtn/CreateTaskBtn";
import ContainerTask from "../../components/taskCard/ContainerTask";
import { useUserStore } from "../../store/userSession.store";
import styles from "./home.module.css";
import { getTasks } from "../../services/task.service";
import useDelayLoading from "../../hooks/useDelayLoading";
import LoadingTask from "../../components/loadingTask/LoadingTask";
import DropdownHeader from "../../components/dropdownHeader/DropdownHeader";
import { useState } from "react";
import { StatusTask } from "../../types/task.types";
import DropdownFilter from "../../components/dropDownFilter/DropdownFilter";

const Home = () => {
  const user = useUserStore((state) => state.user);

  const { data, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    enabled: !!user,
  });
  const { showLoading } = useDelayLoading(isLoading, 300);
  const [selectedStatus, setSelectedStatus] = useState<StatusTask | null>(null);
  const statusLabel: Record<StatusTask, string> = {
    [StatusTask.PENDING]: "Pendente",
    [StatusTask.IN_PROGRESS]: "Em progresso",
    [StatusTask.COMPLETED]: "Concluído",
  };

  const filters = Object.values(StatusTask);

  if (isLoading && !showLoading) return null;
  if (isLoading) return <LoadingTask />;

  const filteredTasks = (data ?? []).filter((task) =>
    selectedStatus ? task.status === selectedStatus : true,
  );

  return (
    <>
      <header className={styles.header}>
        <DropdownHeader />
      </header>
      <main className={styles.main}>
        <h1 className={styles.welcome_title}>
          <span>Olá</span>, {user?.username}!
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
            {data?.length === 0 && (
              <div className={styles.container_guidance}>
                <p className={styles.newTask_guidance}>
                  Clique no <span className={styles.more_guidance}>+</span> e
                  crie sua próxima tarefa!
                </p>
              </div>
            )}

            {filteredTasks?.length === 0 && (
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
                updateAt={dataUpdatedAt}
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
