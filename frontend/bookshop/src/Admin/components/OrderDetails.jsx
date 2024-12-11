import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './CSS/OrderDetails.css'
import AddressCard from './AddressCard'
import { API_BASE_URL } from '../../config/apiConfig'

const OrderDetails = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const jwt = localStorage.getItem('jwt')

  const fetchData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      }
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/orders/${orderId}`,
        config
      )
      setOrder(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      }
      await axios.put(
        `${API_BASE_URL}/api/admin/orders/${orderId}/cancel`,
        null,
        config
      )
      alert('Đơn hàng đã bị hủy!')
      fetchData()
    } catch (error) {
      console.error('Error canceling order:', error)
      alert('Có lỗi xảy ra khi hủy đơn hàng.')
    }
  }

  useEffect(() => {
    fetchData()
  }, [orderId, jwt])

  if (!order) {
    return <div>Loading...</div>
  }

  const shippingAddress = order.user.address.find(
    (addr) => addr.id === order.shippingAddressId
  )

  return (
    <div className="order-details">
      <h1>Order Details</h1>
      <div className="order-details-info">
        <AddressCard address={{ ...shippingAddress, firstName: order.user.firstName, lastName: order.user.lastName }} />
        <p>
          <strong>Customer Name:</strong> {order.user.firstName} {order.user.lastName}
        </p>
        <p>
          <strong>Mobile:</strong> {shippingAddress?.mobile || 'N/A'}
        </p>
        <p>
          <strong>Total Price:</strong> {order.totalPrice} VND
        </p>
      </div>

      <h2>Order Items</h2>
      <div className="order-items">
        {order.orderItems.map((item, index) => (
          <div key={index} className="order-item">
            <img
              src={item.productDetail.imageUrl || 'default-product-image.jpg'}
              alt={item.productDetail.name}
              className="product-image"
            />
            <div className="product-details">
              <p>
                <strong>Product Name:</strong> {item.productDetail.name}
              </p>
              <p>
                <strong>Original Price:</strong> {item.productDetail.price.toFixed(2)} VND
              </p>
              <p>
                <strong>Discount Price:</strong> {item.discountedPrice.toFixed(2)} VND
              </p>
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="cancel-order">
        {order.status !== 5  && (
          <button onClick={() => handleCancelOrder(orderId)}>Hủy bỏ đơn hàng</button>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
