import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import { API_BASE_URL } from '../../../config/apiConfig';

const Profile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
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
      console.error('Error fetching data:', error);
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
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Thông tin cá nhân</h1>
      <div className="profile-content">
        {editMode ? (
          <>
            <div className="profile-row">
              <label className="profile-label">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={updatedUser.firstName || ''}
                onChange={handleInputChange}
                className="profile-input"
              />
            </div>
            <div className="profile-row">
              <label className="profile-label">Last Name:</label>
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
              <label className="profile-label">Mobile:</label>
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
        ) : (
          <>
            <div className="profile-row">
              <p className="profile-label">First Name:</p>
              <p className="profile-value">{user.firstName}</p>
            </div>
            <div className="profile-row">
              <p className="profile-label">Last Name:</p>
              <p className="profile-value">{user.lastName}</p>
            </div>
            <div className="profile-row">
              <p className="profile-label">Email:</p>
              <p className="profile-value">{user.email}</p>
            </div>
            <div className="profile-row">
              <p className="profile-label">Mobile:</p>
              <p className="profile-value">{user.mobile}</p>
            </div>
            <div className="profile-actions">
              <button className="profile-button profile-button-edit" onClick={() => setEditMode(true)}>
                Chỉnh sửa
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
