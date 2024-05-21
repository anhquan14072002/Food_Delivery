import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import NavbarAdmin from "./NavbarAdmin/NavbarAdmin";
import Sidebar from "./Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Order from "./pages/Order/Order";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const temp = true;
  return (
    <>
      {temp ? (
        
        <>
    <ToastContainer position="top-right"
          autoClose={500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover/>
          <NavbarAdmin />
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/order" element={<Order />} />
            </Routes>
          </div>
        </>
      ) : (
        <>
          {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
          <div className="app">
            <Navbar setShowLogin={setShowLogin} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<PlaceOrder />} />
            </Routes>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
