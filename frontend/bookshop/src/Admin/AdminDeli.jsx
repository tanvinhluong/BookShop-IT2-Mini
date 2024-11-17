import {
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Routes, useNavigate, Route } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import OrdersTable from './components/OrdersTable';
import OrderDetails from './components/OrderDetails';
import './components/CSS/Admin.css';
import dashBoardImg from './components/assets/dashboard-color.png';
import checkListImg from './components/assets/checklist.png';
import Header from './components/Header';
import OrderDeli from './components/OrderDeli'; // Đảm bảo đã import đúng

const menu = [
  {
    name: 'Dashboard',
    path: '/admindeli',
    icon: (
      <img
        src={dashBoardImg}
        alt="Dashboard"
        style={{ width: 24, height: 24 }}
      />
    ),
  },
  {
    name: 'Orders',
    path: '/admindeli/orders', // Đảm bảo đường dẫn đúng
    icon: (
      <img
        src={checkListImg}
        alt="Orders"
        style={{ width: 24, height: 24 }}
      />
    ),
  },
];

const AdminDeli = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      }}
      className="box"
    >
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)} // Chuyển hướng khi nhấn menu item
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
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
          <Route path="/orders" element={<OrderDeli />} /> {/* Hiển thị OrderDeli */}
          <Route path="/orders/:orderId" element={<OrderDetails />} /> {/* Hiển thị OrderDetails khi có orderId */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminDeli;
