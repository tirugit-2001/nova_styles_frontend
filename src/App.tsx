import { useEffect } from "react";
import { Toaster } from "sonner";
import MainRoutes from "./routes/MainRoutes";

import useCartStore from "./store/useCartStore";
import useAuthStore from "./store/useAuthStore";

function App() {
  const { checkAuth } = useAuthStore((state) => state);
  const { loadCart } = useCartStore((state) => state);

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      await loadCart();
    };
    init();
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <MainRoutes />
    </>
  );
}

export default App;
