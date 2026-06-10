import style from "./loadingScreen.module.css";
import { GiNotebook } from "react-icons/gi";

const LoadingScreen = () => {
  return (
    <div className={style.page_wrapper}>
      <div className={style.container_loading}>
        <div className={style.wrapper_loading}>
          <GiNotebook />
        </div>
      </div>
      <div className={style.container_title}>
        <p className={style.title_app}>
          Easy<span>List</span>
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
