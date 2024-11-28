import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import { API_BASE_URL } from '../../../config/apiConfig';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Profile = () => {
  const [user, setUser] = useState({});
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editAddressMode, setEditAddressMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [updatedAddress, setUpdatedAddress] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const jwt = localStorage.getItem('jwt');



  const fetchData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, config);
      setUser(response.data);
      setUpdatedUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const response = await axios.get(`${API_BASE_URL}/api/address/get`, config);
      setAddresses(response.data);

      if (user.default_address_id) {
        const defaultAddr = response.data.find((addr) => addr.id === user.default_address_id);
        setDefaultAddress(defaultAddr || {});
        setUpdatedAddress(defaultAddr || {});
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };


  const handleUpdate = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const response = await axios.put(`${API_BASE_URL}/api/users/edit`, updatedUser, config);
      setUser(response.data);
      setEditMode(false);
      if (updatedUser.email !== user.email) {
        alert('Email đã thay đổi. Vui lòng đăng nhập lại!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  


  const handleAddressUpdate = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const newAddress = {
        ...updatedAddress,
        mobile: user.mobile,
      };
      const addressResponse = await axios.post(`${API_BASE_URL}/api/address/create`, newAddress, config);
      const updatedUserInfo = { ...user, default_address_id: addressResponse.data.id };
      const userUpdateResponse = await axios.put(`${API_BASE_URL}/api/users/edit`, updatedUserInfo, config);

      setDefaultAddress(addressResponse.data);
      setUser(userUpdateResponse.data);
      setEditAddressMode(false);
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };


  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }
  
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
  
      const passwordPayload = {
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      };
  
      await axios.put(`${API_BASE_URL}/api/users/change-password`, passwordPayload, config);
      alert('Đổi mật khẩu thành công!');
      setChangePasswordMode(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
  
      alert('Mật khẩu đã thay đổi. Vui lòng đăng nhập lại!');
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Đổi mật khẩu thất bại.');
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (user.default_address_id) {
      fetchAddresses();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAddress({ ...updatedAddress, [name]: value });
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Thông tin cá nhân</h1>
      <div className="profile-content">
        {editMode ? (
          <>
            <div className="profile-row">
              <label className="profile-label">Họ và tên đệm:</label>
              <input
                type="text"
                name="firstName"  
                value={updatedUser.firstName || ''}
                onChange={handleInputChange}
                className="profile-input"
              />
            </div>
            <div className="profile-row">
              <label className="profile-label">Tên:</label>
              <input
                type="text"
                name="lastName"
                value={updatedUser.lastName || ''}
                onChange={handleInputChange}
                className="profile-input"
              />
            </div>
            <div className="profile-row">
              <label className="profile-label">Email:</label>
              <input
                type="email"
                name="email"
                value={updatedUser.email || ''}
                onChange={handleInputChange}
                className="profile-input"
              />
            </div>
            <div className="profile-row">
              <label className="profile-label">Số điện thoại:</label>
              <input
                type="text"
                name="mobile"
                value={updatedUser.mobile || ''}
                onChange={handleInputChange}
                className="profile-input"
              />
            </div>
            <div className="profile-actions">
              <button className="profile-button profile-button-save" onClick={handleUpdate}>
                Lưu
              </button>
              <button className="profile-button profile-button-cancel" onClick={() => setEditMode(false)}>
                Hủy
              </button>
            </div>
          </>
        ) : editAddressMode ? (
          <>
            <div className="profile-row">
              <label className="profile-label">Địa chỉ:</label>
              <input
                type="text"
                name="streetAddress"
                value={updatedAddress.streetAddress || ''}
                onChange={handleAddressChange}
                className="profile-input"
              />
            </div>
            <div className="profile-row">
              <label className="profile-label">Thành phố:</label>
              <input
                type="text"
                name="city"
                value={updatedAddress.city || ''}
                onChange={handleAddressChange}
                className="profile-input"
              />
            </div>
            <div className="profile-row">
              <label className="profile-label">Quận/Huyện:</label>
              <input
                type="text"
                name="state"
                value={updatedAddress.state || ''}
                onChange={handleAddressChange}
                className="profile-input"
              />
            </div>
            <div className="profile-row">
              <label className="profile-label">Mã bưu chính:</label>
              <input
                type="text"
                name="zipCode"
                value={updatedAddress.zipCode || ''}
                onChange={handleAddressChange}
                className="profile-input"
              />
            </div>
            <div className="profile-actions">
              <button className="profile-button profile-button-save" onClick={handleAddressUpdate}>
                Lưu địa chỉ
              </button>
              <button className="profile-button profile-button-cancel" onClick={() => setEditAddressMode(false)}>
                Hủy
              </button>
            </div>
          </>
        ) : changePasswordMode ? (
          <>
            <div className="profile-row">
              <label className="profile-label">Mật khẩu cũ:</label>
              <input
                type={showPassword.currentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordInputChange}
                className="profile-input"
              />
              <button type="button" onClick={() => togglePasswordVisibility('currentPassword')}>
                {showPassword.currentPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="profile-row">
              <label className="profile-label">Mật khẩu mới:</label>
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
                className="profile-input"
              />
              <button type="button" onClick={() => togglePasswordVisibility('newPassword')}>
                {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="profile-row">
              <label className="profile-label">Xác nhận mật khẩu:</label>
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
                className="profile-input"
              />
              <button type="button" onClick={() => togglePasswordVisibility('confirmPassword')}>
                {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="profile-actions">
              <button className="profile-button profile-button-save" onClick={handleChangePassword}>
                Đổi mật khẩu
              </button>
              <button className="profile-button profile-button-cancel" onClick={() => setChangePasswordMode(false)}>
                Hủy
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="profile-row">
              <label className="profile-label">Họ và Tên:</label>
              <span className="profile-value">{`${user.firstName || ''} ${user.lastName || ''}`}</span>
            </div>
            <div className="profile-row">
              <label className="profile-label">Email:</label>
              <span className="profile-value">{user.email || ''}</span>
            </div>
            <div className="profile-row">
              <label className="profile-label">Số điện thoại:</label>
              <span className="profile-value">{user.mobile || ''}</span>
            </div>
            <div className="profile-row">
              <label className="profile-label">Địa chỉ mặc định:</label>
              <span className="profile-value">
                  {defaultAddress?.streetAddress ? `${defaultAddress.streetAddress}, ` : ''}
                  {defaultAddress?.city ? `${defaultAddress.city}, ` : ''}
                  {defaultAddress?.state ? defaultAddress.state : 'Chưa có địa chỉ'}
              </span>
            </div>
            <div className="profile-actions">
              <button className="profile-button profile-button-edit" onClick={() => setEditMode(true)}>
                Chỉnh sửa thông tin
              </button>
              <button className="profile-button profile-button-address" onClick={() => setEditAddressMode(true)}>
                Chỉnh sửa địa chỉ
              </button>
              <button className="profile-button profile-button-password" onClick={() => setChangePasswordMode(true)}>
                Đổi mật khẩu
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
  