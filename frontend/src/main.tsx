import { createRoot } from "react-dom/client";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
