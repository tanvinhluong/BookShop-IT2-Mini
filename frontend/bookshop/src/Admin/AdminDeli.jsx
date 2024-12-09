import {
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { Routes, useNavigate, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Auth/Action";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import OrdersTable from "./components/OrdersTable";
import OrderDetails from "./components/OrderDetails";
import "./components/CSS/Admin.css";
import dashBoardImg from "./components/assets/dashboard-color.png";
import checkListImg from "./components/assets/checklist.png";
import Header from "./components/Header";
import OrderDeli from "./components/OrderDeli";
import { PowerCircleIcon } from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    path: "/admindeli",
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
    name: "Orders",
    path: "/admindeli/orders",
    icon: (
      <img
        src={checkListImg}
        alt="Orders"
        style={{ width: 24, height: 24 }}
      />
    ),
    requiredPermission: "Order_Delivery",
  },
];

const AdminDeli = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPermission = localStorage.getItem("adminpermissions");

  useEffect(() => {
      if (!userPermission) {
      navigate("/admindeli/login");
    }
  }, [userPermission, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("adminpermissions");
    navigate("/admindeli/login");
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
          (item) =>
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

        <ListItem disablePadding onClick={handleLogout}>
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
          {userPermission?.includes("Order_Delivery") && (
            <Route
              path="/"
              element={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#f0f8ff",
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    fontSize: "36px",
                    color: "#333",
                    textAlign: "center",
                    borderRadius: "15px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                    margin: "20px",
                  }}
                >
                  Welcome To Admin Delivery Dashboard
                </div>
              }
            />
          )}
          {userPermission?.includes("Order_Delivery") && (
            <Route path="/orders" element={<OrderDeli />} />
          )}
          {userPermission?.includes("Order_Delivery") && (
            <Route path="/orders/:orderId" element={<OrderDetails />} />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default AdminDeli;
