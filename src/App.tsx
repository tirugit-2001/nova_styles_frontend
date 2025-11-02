import { useEffect } from "react";
import { Toaster } from "sonner";
import MainRoutes from "./routes/MainRoutes";
import useUserStore from "./store/useAuthStore";
import useCartStore from "./store/useCartStore";

function App() {
  const { checkAuth } = useUserStore((state) => state);
  const { loadCart } = useCartStore((state) => state);

  useEffect(() => {
    const init = async () => {
      await checkAuth();

      const isLoggedIn = useUserStore.getState().isAuthenticated;

      if (isLoggedIn) {
        // await mergeCart();
        await loadCart();
      }
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
