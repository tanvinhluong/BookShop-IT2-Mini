import React from 'react'
import { Grid } from '@mui/material'
import AdjustIcon from '@mui/icons-material/Adjust'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

const OrderCard = ({ order }) => {
  const navigate = useNavigate()

  const orderStatusMap = {
    0: 'Đang chờ duyệt đơn',
    2: 'Đã giao hoàn tất',
    3: 'Đang đợi nhận đơn',
    4: 'Đang giao',
    5: 'Đã hủy',
  };


  const today = dayjs();


  const deliveryDate = dayjs(order.deliveryDate);


  const renderDeliveryDateMessage = () => {
    if (order.orderStatus === 5) {
      return `Đơn hàng đã bị hủy`;
    }

    if (order.orderStatus === 4) { 
      if (deliveryDate.isAfter(today)) {
        return `Đơn hàng của bạn sẽ đến vào ngày ${deliveryDate.format("DD/MM/YYYY")}`;
      } else if (deliveryDate.isSame(today, 'day')) {
        return `Đơn hàng của bạn đang trên đường giao trong ngày hôm nay`;
      } else {
        return `Đơn hàng đã đến vào ngày ${deliveryDate.format("DD/MM/YYYY")}`;
      }
    }

    return null;
  };

  return (
    <div
      onClick={() => navigate(`/account/order/${order.id}`)}
      className="p-5 shadow-md shadow-black hover:shadow-2xl border"
    >
      <Grid spacing={2} container sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={5}>
          <div className="flex cursor-pointer">
            <img
              style={{ 'object-fit': 'contain' }}
              src="https://pos.nvncdn.com/cba2a3-7534/album/albumCT/20201007_ZRyZBFbsULoNtIeiPPPxt8k8.jpg"
              className="w-[5rem] h-[5rem] object-cover object-top"
              alt=""
            />
            <div className="ml-5 spacy-y-2">
              <p className="">Hóa đơn mua hàng</p>
              <p className="opacity-50 text-xs font-semibold">
                Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="opacity-50 text-xs font-semibold">
                Trạng thái: {orderStatusMap[order.orderStatus] || 'Không xác định'}
              </p>
              <p className="opacity-50 text-xs font-semibold">
                Giao tới địa chỉ:{' '}
                {order?.user?.address.find(
                  (addr) => addr.id === order.shippingAddressId
                )?.streetAddress +
                  ' - ' +
                  order?.user?.address.find(
                    (addr) => addr.id === order.shippingAddressId
                  )?.city}
              </p>
            </div>
          </div>
        </Grid>
        <Grid item xs={3}>
          <p>Tạm tính: {order.totalPrice}đ</p>
          <p>Giảm giá: {order.discountPrice || 0}đ</p> 
          <p>Tổng tiền: {order.totalPrice - (order.discountPrice || 0)}đ</p>
        </Grid>
        <Grid item xs={4}>
          {order.orderStatus === 5 && (
            <div>
              <p>
                <AdjustIcon
                  sx={{ width: '15px', height: '15px' }}
                  className="text-red-600 p-0 mr-2 text-sm"
                />
                <span>Đơn hàng đã bị hủy</span>
              </p>
            </div>
          )}

          {order.orderStatus === 2 && (
            <div>
              <p>
                <AdjustIcon
                  sx={{ width: '15px', height: '15px' }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Đã giao hoàn tất</span>
              </p>
            </div>
          )}

          {order.orderStatus === 4 && (
            <div>
              <p>
              <AdjustIcon
                sx={{ width: '15px', height: '15px' }}
                className="text-yellow-600 p-0 mr-2 text-sm"
              />
              <span>{renderDeliveryDateMessage()}</span>
              </p>
            </div>
          )}

          {order.orderStatus !== 2 && order.orderStatus !== 4 && order.orderStatus !== 5 && (
            <p className="text-xs">Không có thông tin giao hàng</p>
          )}
          
          <br></br>
          <button style={{ backgroundColor: 'aqua' }}>Xem chi tiết</button>
        </Grid>
      </Grid>
    </div>
  )
}

export default OrderCard
