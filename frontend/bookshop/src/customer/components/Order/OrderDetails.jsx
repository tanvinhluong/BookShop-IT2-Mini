import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTraker from './OrderTraker'
import { Grid, Box } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarIcon from '@mui/icons-material/Star'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../config/apiConfig'

const OrderDetails = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState([])
  const jwt = localStorage.getItem('jwt')
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const fecthData = async (id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      }
      const results = await axios.get(
        `${API_BASE_URL}/api/orders/${orderId}`,
        config
      )
      setOrder(results.data)
      console.log(results.data)
      console.log(order.orderItems)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fecthData()
  }, [])

  return (
    <div className="px-5 lg:px-20">
      <button
        onClick={handleBack}
        style={{
          background: 'none',
          border: 'none',
          color: 'blue',
          textDecoration: 'underline',
          cursor: 'pointer',
        }}
      >
        Quay lại trang trước
      </button>
      <div>
        <h1 className="font-bold text-lg py-7">
          Địa chỉ giao hàng: {order?.user?.firstName} {order?.user?.lastName} -{' '}
          {order?.user?.address.find(
            (addr) => addr.id === order.shippingAddressId
          )?.streetAddress +
            ' - ' +
            order?.user?.address.find(
              (addr) => addr.id === order.shippingAddressId
            )?.city}
        </h1>
        <AddressCard
          address={order?.user?.address.find(
            (addr) => addr.id === order.shippingAddressId
          )}
        />
        <p>Tổng tiền đơn hàng: {order.totalPrice}</p>
      </div>
      <div className="py-20">
        <OrderTraker activeStep={3} />
      </div>
      <Grid className="space-y-5" container>
        {order.orderItems?.map((item, index) => (
          <Grid
            key={`orderItems#${index}`}
            item
            container
            className="shadow-xl rouded-md p-5 border"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Grid item xs={6}>
              <div className="flex  items-center ">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item?.productDetail?.imageUrl}
                  alt=""
                />
                <div className="ml-5 space-y-2">
                  <p>{item?.productDetail?.name}</p>
                  <p className="opacity-70 text-xs font-semibold space-x-5">
                    <span>Đơn giá: {item?.productDetail?.price}đ</span>
                    <span>Số lượng: {item.quantity}</span>
                  </p>
                  <p>Tạm tính: {item?.price}đ</p>
                  <p>Giảm giá còn: {order?.totalPrice}đ</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              {
                <Box
                  sx={{ color: deepPurple[500] }}
                  className="flex items-center cursor-pointer"
                >
                  <StarIcon
                    sx={{ fontSize: '2rem' }}
                    className="px-2 text-5xl"
                  />
                  <span>Rate & Review Product</span>
                </Box>
              }
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default OrderDetails
