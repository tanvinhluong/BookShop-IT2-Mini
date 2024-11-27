import {
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Routes, useNavigate, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../State/Auth/Action";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateProductForm from "./components/CreateProductForm";
import ProductsTable from "./components/ProductsTable";
import OrdersTable from "./components/OrdersTable";
import CustomersTable from "./components/CustomersTable";
import AdminDashboard from "./components/Dashboard";
import EditProduct from "./components/EditProduct";
import OrderDetails from "./components/OrderDetails";
import "./components/CSS/Admin.css";
import dashBoardImg from "./components/assets/dashboard-color.png";
import checkListImg from "./components/assets/checklist.png";
import newProductImg from "./components/assets/new-product.png";
import customerImg from "./components/assets/rating.png";
import promotionImg from "./components/assets/shopping-online.png";
import Header from "./components/Header";
import PromotionTable from "./components/PromotionTable";
import { PowerCircleIcon } from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: (
      <img
        src={dashBoardImg}
        alt="Dashboard"
        style={{ width: 24, height: 24 }}
      />
    ),
    requiredPermission: "",
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: (
      <img
        src={newProductImg}
        alt="Dashboard"
        style={{ width: 24, height: 24 }}
      />
    ),
    requiredPermission: "All",
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: (
      <img
        src={customerImg}
        alt="Dashboard"
        style={{ width: 24, height: 24 }}
      />
    ),
    requiredPermission: "All",
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: (
      <img
        src={checkListImg}
        alt="Dashboard"
        style={{ width: 24, height: 24 }}
      />
    ),
    requiredPermission: "Order Manager",
  },
  {
    name: "Promotion",
    path: "/admin/promotion",
    icon: (
      <img
        src={promotionImg}
        alt="Dashboard"
        style={{ width: 24, height: 24 }}
      />
    ),
    requiredPermission: "All",
  },
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPermission = localStorage.getItem("adminpermissions");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
      className="box"
    >
      <List>
        {menu.map(
          (item, index) =>
            !!userPermission?.includes(item.requiredPermission) && (
              <ListItem
                key={item.name}
                disablePadding
                onClick={() => navigate(item.path)}
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding onClick={() => handleLogout()}>
          <ListItemButton>
            <ListItemIcon>
              <PowerCircleIcon />
            </ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="flex h-[100vh]">
      <CssBaseline />
      <div className="box">{drawer}</div>
      <div className="content">
        <Header />
        <Routes>
          {userPermission?.includes("All") && (
            <Route path="/" element={<AdminDashboard />} />
          )}
          {userPermission?.includes("All") && (
            <Route path="/products" element={<ProductsTable />} />
          )}
          {userPermission?.includes("Order Manager") && (
            <Route path="/orders" element={<OrdersTable />} />
          )}
          {userPermission?.includes("All") && (
            <Route path="/customers" element={<CustomersTable />} />
          )}
          {userPermission?.includes("All") && (
            <Route path="/products/edit/:productId" element={<EditProduct />} />
          )}
          {userPermission?.includes("Order Manager") && (
            <Route path="/orders/:orderId" element={<OrderDetails />} />
          )}
          {userPermission?.includes("All") && (
            <Route path="/promotion" element={<PromotionTable />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
