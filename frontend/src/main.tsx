import { createRoot } from "react-dom/client";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/reactQuery";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);
