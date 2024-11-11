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
} from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { Routes, useNavigate, Route } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CreateProductForm from './components/CreateProductForm'
import ProductsTable from './components/ProductsTable'
import OrdersTable from './components/OrdersTable'
import CustomersTable from './components/CustomersTable'
import AdminDashboard from './components/Dashboard'
import EditProduct from './components/EditProduct'
import OrderDetails from './components/OrderDetails'
import './components/CSS/Admin.css'
import dashBoardImg from './components/assets/dashboard-color.png'
import checkListImg from './components/assets/checklist.png'
import newProductImg from './components/assets/new-product.png'
import customerImg from './components/assets/rating.png'
import Header from './components/Header'

const menu = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: (
      <img
        src={dashBoardImg}
        alt="Dashboard"
        style={{ width: 24, height: 24 }}
      />
    ),
  },
  {
    name: 'Products',
    path: '/admin/products',
    icon: (
      <img
        src={newProductImg}
        alt="Dashboard"
        style={{ width: 24, height: 24 }}
      />
    ),
  },
  {
    name: 'Customers',
    path: '/admin/customers',
    icon: (
      <img
        src={customerImg}
        alt="Dashboard"
        style={{ width: 24, height: 24 }}
      />
    ),
  },
  {
    name: 'Orders',
    path: '/admin/orders',
    icon: (
      <img
        src={checkListImg}
        alt="Dashboard"
        style={{ width: 24, height: 24 }}
      />
    ),
  }
]

const Admin = () => {
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))
  const [sideBarVisible, setSideBarVisible] = useState(false)
  const navigate = useNavigate()

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
            onClick={() => navigate(item.path)}
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
  )

  return (
    <div className="flex h-[100vh]">
      <CssBaseline />
      <div className="box">{drawer}</div>
      <div className="content">
        <Header />
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/products" element={<ProductsTable />} />
          <Route path="/orders" element={<OrdersTable />} />
          <Route path="/customers" element={<CustomersTable />} />
          <Route path="/products/edit/:productId" element={<EditProduct />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default Admin
