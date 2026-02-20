import { useQuery } from "@tanstack/react-query";
import CreateTaskBtn from "../../components/createTaskBtn/CreateTaskBtn";
import ContainerTask from "../../components/taskCard/ContainerTask";
import { useUserStore } from "../../store/userSession.store";
import styles from "./home.module.css";
import { getTasks } from "../../services/task.service";
import useDelayLoading from "../../hooks/useDelayLoading";
import LoadingTask from "../../components/loadingTask/LoadingTask";
import DropdownHeader from "../../components/dropdownHeader/DropdownHeader";

const Home = () => {
  const user = useUserStore((state) => state.user);

  const { data, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    enabled: !!user,
  });
  const { showLoading } = useDelayLoading(isLoading, 300);

  if (isLoading && !showLoading) return null;
  if (isLoading) return <LoadingTask />;

  return (
    <>
      <header className={styles.header}>
        <DropdownHeader />
      </header>
      <main className={styles.main}>
        <h1 className={styles.welcome_title}>
          <span>Olá</span>, {user?.firstName}!
        </h1>
        <section className={styles.tasks_section}>
          <div className={styles.container_section}>
            <CreateTaskBtn />
            {data?.length === 0 && (
              <div className={styles.container_guidance}>
                <p className={styles.newTask_guidance}>
                  Clique no <span className={styles.more_guidance}>+</span> e
                  crie sua próxima tarefa!
                </p>
              </div>
            )}
            {data?.map((task) => (
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
