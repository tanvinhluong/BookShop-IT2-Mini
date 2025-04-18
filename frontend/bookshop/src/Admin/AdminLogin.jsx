import React, { useState, useEffect } from "react";
import "./components/CSS/AdminLogin.css";
import { useDispatch } from "react-redux";
import { adminLogin, getAdmin } from "../State/Auth/Action";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("adminjwt");
  const userRole = localStorage.getItem("adminroles");

  useEffect(() => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    const checkJwt = async () => {
      if (jwt && (userRole?.includes("Admin") || userRole?.includes("Staff"))) {
        await delay(1000);
        navigate("/admin");
      } else {
        localStorage.removeItem("adminjwt");
        localStorage.removeItem("adminroles");
        localStorage.removeItem("adminpermissions");
        setLoading(false);
      }
    };
  
    checkJwt();
  }, [jwt, userRole, navigate]);
   

  useEffect(() => {
    const fetchAdminData = async () => {
      if (jwt) {

        dispatch(getAdmin(jwt));

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        await delay(1000);


        navigate("/admin");
      }
    };

    fetchAdminData();
  }, [jwt, dispatch, navigate]);

  const handleSubmit = async () => {
    const adminData = {
      email: email,
      password: password,
    };

    dispatch(adminLogin(adminData));
  };

  const validateEmail = (value) => {
    setEmail(value);
  };

  const validatePassword = (value) => {
    setPassword(value);
  };

  return loading ? (
    <div></div>
  ) : (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <h1 className="admin-login-title">Moji</h1>
        <p className="admin-login-subtitle">Quản lý cửa hàng văn phòng phẩm</p>
        <h2 className="admin-login-header">Đăng nhập Admin</h2>
        <div className="admin-login-form-group">
          <label className="admin-login-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
            className="admin-login-input"
            placeholder="Nhập email"
          />
        </div>
        <div className="admin-login-form-group">
          <label className="admin-login-label">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            className="admin-login-input"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <button className="admin-login-button" onClick={() => handleSubmit()}>
          Đăng nhập
        </button>
        <p className="admin-login-forgot">Quên mật khẩu</p>
      </div>
    </div>
  );
};

export default AdminLogin;
