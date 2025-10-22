import "./App.css";
import MainRoutes from "./routes/MainRoutes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <MainRoutes />
    </>
  );
}

export default App;
