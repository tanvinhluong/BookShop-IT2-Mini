import React from 'react'
import {Routes,Route} from 'react-router-dom'
import AdminDeli from '../Admin/AdminDeli'

const AdminDeliRouters = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<AdminDeli/>}></Route>
      </Routes>
    </div>
  )
}

export default AdminDeliRouters