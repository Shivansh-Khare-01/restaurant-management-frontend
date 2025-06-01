import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Analytics } from "./analytics";
import { Table } from "./table";
import { OrderListing } from "./orderList";
import { Sidebar } from "./sideBar";
import "./style.css";
import { useEffect } from "react";
import { ProductMenu } from "./menu";
import { CartPage } from "./cartpage";
import { Toaster } from "react-hot-toast";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/menu" || location.pathname === "/cart") {
      document.body.classList.add("menu-page");
    } else {
      document.body.classList.remove("menu-page");
    }
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== "/menu" && location.pathname !== "/cart" ? (
        <div id="content">
          {<Sidebar />}
          <Routes>
            <Route path="/" element={<Analytics />} />
            <Route path="/table" element={<Table />} />
            <Route path="/orderlist" element={<OrderListing />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/menu" element={<ProductMenu />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
