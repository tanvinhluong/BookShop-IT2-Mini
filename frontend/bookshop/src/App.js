import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./customer/components/Cart/Cart";
import CheckOut from "./customer/components/Checkout/CheckOut";
import Footer from "./customer/components/Footer/Footer";
import Navigation from "./customer/components/Navigation/Navigation";
import ProductDetails from "./customer/components/ProductDetail/ProductDetails";
import HomePage from "./customer/pages/HomePage/HomePage";
import Order from "./customer/components/Order/Order";
import OrderDetails from "./customer/components/Order/OrderDetails";
import CustomerRouters from "./Routers/CustomerRouters";
import AdminRouters from "./Routers/AdminRouters";
import AdminDeliRouters from "./Routers/AdminDeliRouters";
import AdminLogin from "./Admin/AdminLogin";

function App() {
  return (
    <Router>
      <div className="container 2xl m-auto">
        <Routes>
          <Route path="/*" element={<CustomerRouters />}></Route>
          <Route path="/admin/*" element={<AdminRouters />}></Route>
          <Route path="/admindeli/*" element={<AdminDeliRouters />}></Route>
          <Route path="/admin/login*" element={<AdminLogin />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
