import MainRoutes from "./routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App() {
  return (
    <>
      <MainRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
