import style from "./loading.module.css";
import { GiNotebook } from "react-icons/gi";

const Loading = () => {
  return (
    <div className={style.container_loading}>
      <div className={style.wrapper_loading}>
        <GiNotebook />
      </div>
      <div className={style.container_title}>
        <p className={style.title_app}>
          Easy<span>List</span>
        </p>
      </div>
    </div>
  );
};

export default Loading;
