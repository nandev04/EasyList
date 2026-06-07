import CreateTaskBtn from "../components/CreateTaskBtn";
import TaskCard from "../components/TaskCard";
import styles from "./homePage.module.css";
import DropdownHeader from "../../../shared/components/DropdownHeader";
import { useMemo, useState } from "react";
import { StatusTask } from "../types/task.types";
import useDelayLoading from "../../../shared/hooks/useDelayLoading";
import LoadingTask from "../components/LoadingTask";
import DropdownFilter from "../components/DropdownFilter";
import { useUserStore } from "../../../shared/store/useUserStore";
import { useGetTasks } from "../hooks/useTask.query";
import LoadingInfiniteScroll from "../../../shared/components/ui/LoadingInfiniteScroll";
import useObserverInfiniteScroll from "../../../shared/hooks/useObserverInfiniteScroll";
import Footer from "../../../shared/components/ui/Footer/Footer";

const Home = () => {
  const user = useUserStore((s) => s.user);
  const [filterStatus, setfilterStatus] = useState<StatusTask | null>(null);
  const { data, isLoading, fetchNextPage, hasNextPage, isFetching } =
    useGetTasks(!!user, { status: filterStatus ?? undefined });

  const { sentinelRef } = useObserverInfiniteScroll({
    fetchNextPage,
    hasNextPage,
  });

  const dataMemo = useMemo(
    () => data?.pages.flatMap((pages) => pages.data.tasks) ?? [],
    [data],
  );

  const { showLoading: showLoadingTask } = useDelayLoading(isLoading, 300);
  const { showLoading: showLoadingFetching } = useDelayLoading(isFetching, 200);

  const statusLabel: Record<StatusTask, string> = {
    [StatusTask.PENDING]: "Pendente",
    [StatusTask.IN_PROGRESS]: "Em progresso",
    [StatusTask.COMPLETED]: "Concluído",
  };

  const filters = Object.values(StatusTask);

  const hasNoTasksAtAll = !filterStatus && dataMemo.length === 0;
  const hasNoTasksForFilter = !!filterStatus && dataMemo.length === 0;

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
          <div className={styles.general_container}>
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
            {isLoading && showLoadingTask && <LoadingTask />}
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
            <div className={styles.section_container}>
              {!isLoading &&
                dataMemo.map((task) => (
                  <TaskCard
                    key={task.id}
                    taskId={task.id}
                    title={task.title}
                    status={task.status}
                    description={task.description}
                  />
                ))}
              <span ref={sentinelRef}>
                {showLoadingFetching && <LoadingInfiniteScroll />}
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
