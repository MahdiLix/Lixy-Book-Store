import { Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import PublicRoutes from "./routes/PublicRoutes";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <CartProvider>
      <Routes>
        {PublicRoutes()}
        {AdminRoutes()}
      </Routes>
    </CartProvider>
  );
}
