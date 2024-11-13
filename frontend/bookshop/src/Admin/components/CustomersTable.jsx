import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CSS/CustomersTable.css'
import { API_BASE_URL, api, API_TOKEN } from '../../config/apiConfig'

const CustomersTable = () => {
  const [users, setUsers] = useState([])
  const jwt = localStorage.getItem('jwt')

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${API_TOKEN}
`,
        },
      }
      const response = await axios.get(`${API_BASE_URL}/api/users/`, config)
      setUsers(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="customers-table">
      <h1>All Customers List</h1>
      <div className="table-header">
        <p>ID</p>
        <p>First Name</p>
        <p>Last Name</p>
        <p>Email</p>
        <p>Mobile</p>
        <p>Active</p>
        <p>Created</p>
      </div>
      <div className="table-body">
        <hr />
        {users.map((user, index) => (
          <React.Fragment key={index}>
            <div className="table-row">
              <p>{user?.id}</p>
              <p>{user?.firstName}</p>
              <p>{user?.lastName}</p>
              <p>{user?.email}</p>
              <p>{user?.mobile}</p>
              <p>{user?.active}</p>
              <p>{user?.createdAt}</p>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default CustomersTable
