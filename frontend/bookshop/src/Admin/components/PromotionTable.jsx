import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CSS/PromotionTable.css'
import { API_BASE_URL, api, API_TOKEN } from '../../config/apiConfig'
import { format } from 'date-fns'

const PromotionTable = () => {
  const [promotions, setPromotions] = useState([])
  const jwt = localStorage.getItem('jwt')

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${API_TOKEN}
`,
        },
      }
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/promotion/`,
        config
      )
      setPromotions(response.data)
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
      <h1>All Promotion OPEN</h1>
      <div className="table-header">
        <p>ID</p>
        <p>Product</p>
        <p>Category</p>
        <p>Promotion Name</p>
        <p>Promotion Type</p>
        <p>Promotion Code</p>
        <p>Start Date</p>
        <p>End Date</p>
        <p>Percent(%)</p>
      </div>
      <div className="table-body">
        <hr />
        {promotions.map((promotion, index) => (
          <React.Fragment key={index}>
            <div className="table-row">
              <p>{promotion?.id}</p>
              <p>{promotion?.product?.productName}</p>
              <p>{promotion?.category?.name}</p>
              <p>{promotion?.promotionName}</p>
              <p>{promotion?.promotionType}</p>
              <p>{promotion?.promotionCode}</p>
              <p>{format(new Date(promotion?.startDate), 'yyyy-MM-dd')}</p>
              <p>{format(new Date(promotion?.endDate), 'yyyy-MM-dd')}</p>
              <p>{promotion?.percentage}</p>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default PromotionTable
