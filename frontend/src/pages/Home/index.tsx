import CreateTaskBtn from "../../components/createTaskBtn/CreateTaskBtn";
import ContainerTask from "../../components/taskCard/ContainerTask";
import styles from "./home.module.css";
import useDelayLoading from "../../shared/hooks/react/useDelayLoading";
import LoadingTask from "../../components/loadingTask/LoadingTask";
import DropdownHeader from "../../components/dropdownHeader/DropdownHeader";
import { useMemo, useState } from "react";
import { StatusTask } from "../../shared/types/task.types";
import DropdownFilter from "../../components/dropDownFilter/DropdownFilter";
import { useUserStore } from "../../shared/store/useUserStore";
import useTasks from "../../hooks/Query/useTasks";
import LoadingInfiniteScroll from "../../shared/components/ui/loadingInfiniteScroll";
import useObserverInfiniteScroll from "../../hooks/React/useObserverInfiniteScroll";

const Home = () => {
  const user = useUserStore((s) => s.user);
  const [filterStatus, setfilterStatus] = useState<StatusTask | null>(null);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } = useTasks(
    !!user,
    { status: filterStatus ?? undefined },
  );

  const { sentinelRef } = useObserverInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  const tasks = useMemo(
    () => data?.pages.flatMap((pages) => pages.data) ?? [],
    [data],
  );

  const { showLoading } = useDelayLoading(isLoading, 300);
  const statusLabel: Record<StatusTask, string> = {
    [StatusTask.PENDING]: "Pendente",
    [StatusTask.IN_PROGRESS]: "Em progresso",
    [StatusTask.COMPLETED]: "Concluído",
  };

  const filters = Object.values(StatusTask);

  const hasNoTasksAtAll = !filterStatus && tasks.length === 0;
  const hasNoTasksForFilter = !!filterStatus && tasks.length === 0;

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
                  {(filterStatus ? [filterStatus] : filters).map((status) => (
                    <button
                      key={status}
                      className={`${styles.filter_button} ${filterStatus === status ? styles.active : ""}`}
                      onClick={() => {
                        setfilterStatus((prev) =>
                          prev === status ? null : status,
                        );
                      }}
                    >
                      {statusLabel[status]}
                    </button>
                  ))}
                </div>
                <div className={styles.dropdown_filter_container}>
                  <DropdownFilter
                    filterStatus={filterStatus}
                    setfilterStatus={setfilterStatus}
                    statusLabel={statusLabel}
                    filter={filters}
                  />
                </div>
              </div>
            </div>
            {isLoading && showLoading && <LoadingTask />}
            {!isLoading && hasNoTasksAtAll && (
              <div className={styles.container_guidance}>
                <p className={styles.newTask_guidance}>
                  Clique no <span className={styles.more_guidance}>+</span> e
                  crie sua próxima tarefa!
                </p>
              </div>
            )}

            {!isLoading && hasNoTasksForFilter && (
              <div className={styles.container_guidance}>
                <p className={styles.newTask_guidance}>
                  Sem tarefas, clique no{" "}
                  <span className={styles.more_guidance}>+</span> e crie sua
                  próxima tarefa!
                </p>
              </div>
            )}

            {!isLoading &&
              tasks.map((task) => (
                <ContainerTask
                  key={task.id}
                  taskId={task.id}
                  title={task.title}
                  status={task.status}
                  description={task.description}
                />
              ))}
            <span ref={sentinelRef}>
              {isFetching && <LoadingInfiniteScroll />}
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
