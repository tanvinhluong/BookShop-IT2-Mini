import React, { useState, useEffect } from 'react';
import {Wallet, CircleDollarSign } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../../../config/apiConfig'
import { clearCart } from '../../../State/Cart/Action';
import {useDispatch} from "react-redux";

// Mock data for payment methods
const paymentMethods = [
  {
    id: 1,
    name: 'Thanh toán bằng ví Momo',
    icon: Wallet,
    description: 'MOMO'
  },
  {
    id: 2,
    name: 'Thanh toán bằng ví VNPAY',
    icon: Wallet,
    description: 'VNPAY'
  },
  {
    id: 3,
    name: 'Thanh toán khi nhận hàng',
    icon: CircleDollarSign,
    description: 'Thanh toán bằng tiền mặt khi nhận hàng'
  }
];

// Mock data for order summary
const orderSummary = {
  subtotal: 1200000,
  shipping: 30000,
  discount: 50000,
  total: 1180000
};

const PaymentInfo = ({orderId}) => {
  const [selectedMethod, setSelectedMethod] = useState(1);
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jwt = localStorage.getItem('jwt')
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
        }
        const response = await axios.get(`${API_BASE_URL}/api/orders/latest`, config);

        setOrderData(response.data);
        console.log('order data:', response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const updateOrderPayment = async (paymentId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      }

      const updatePaymentDto = {
        orderId: orderData.id,
        paymentInfoId: paymentId
      };
      console.log('Update Payment DTO:', updatePaymentDto);

      await axios.put(`${API_BASE_URL}/api/orders/update-payment`, updatePaymentDto, config);
      return true;
    } catch (error) {
      console.error('Cập nhật thông tin thanh toán thất bại', error);
      return false;
    }
  };

  const handlePayment = async () => {
    if (!orderData) return;

    const userId = orderData.user.id;
    const amount = (orderData.totalPrice -orderData.totalDiscountedPrice).toString();
    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    }

    try {
      let paymentId;
      let paymentResponse;
      if (selectedMethod === 1) { // MOMO
        paymentResponse = await axios.post(`${API_BASE_URL}/api/payments/momo`, {
          amount,
          userId
        }, config)
        console.log('Full MOMO Payment Response:', paymentResponse);
        console.log('Specific paymentInfoId:', paymentResponse.data.paymentInfoId);
        paymentId = paymentResponse.data.paymentInfoId;
      } else if (selectedMethod === 2) { // VNPay
        // paymentResponse = await axios.post(`${API_BASE_URL}/api/payments/vnpay`, {
        //   amount,
        //   userId
        // }, config);
        // paymentId = paymentResponse.data.paymentInfoId;
        // dispatch(clearCart());
        // window.location.href = paymentResponse.data.paymentUrl;
        alert('Chức năng thanh toán VNPay đang được phát triển. Vui lòng chọn hình thức thanh toán khác');
      } else { // Thanh toán khi nhận hàng
        paymentResponse = await axios.post(`${API_BASE_URL}/api/payments/cod`, {
            amount,
            userId
        }, config);
        console.log('Full COD Payment Response:', paymentResponse);
        console.log('Specific paymentInfoId:', paymentResponse.data.paymentInfoId);
        paymentId = paymentResponse.data.paymentInfoId;
      }
      const paymentUpdateSuccess = await updateOrderPayment(paymentId);
      if (paymentUpdateSuccess) {
        // Clear cart
        dispatch(clearCart());

        // Redirect based on payment method
        if (selectedMethod === 1) {
          window.location.href = paymentResponse.data.paymentUrl;
        } else {
          window.location.href = '/checkout?step=5';
        }
      } else {
        throw new Error('Failed to update order payment');
      }
    } catch (error) {
      console.error('Thanh toán thất bại', error);
      alert('Thanh toán không thành công');
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error.message}</div>;
  if (!orderData) return null;

  return (
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Thông tin thanh toán</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Details Section */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h2>

            {orderData.orderItems.map((item) => (
                <div key={item.id} className="flex items-center mb-4 pb-4 border-b">
                  <img
                      src={item.productDetail.imageUrl}
                      alt={item.productDetail.name}
                      className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.productDetail.name}</h3>
                    <p className="text-gray-600">Số lượng: {item.quantity}</p>
                    <p className="text-gray-600">Giá: {item.price.toLocaleString()}đ</p>
                  </div>
                </div>
            ))}
          </div>

          {/* Payment Methods and Summary */}
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Hình thức thanh toán</h2>

            <div className="space-y-4 mb-6">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                    <div
                        key={method.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all
                    ${selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'}`}
                        onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <Icon className="w-6 h-6 text-blue-600" />
                        <div className="flex-grow">
                          <h3 className="font-medium">{method.name}</h3>
                        </div>
                        <div
                            className={`w-5 h-5 rounded-full border-2 
                        ${selectedMethod === method.id
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'}`}
                        />
                      </div>
                    </div>
                );
              })}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span>{orderData.totalPrice.toLocaleString()}đ</span>
              </div>
              {orderData.promotion && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Khuyến mãi</span>
                    <span className="text-green-600">
                  -{orderData.totalDiscountedPrice.toLocaleString()}đ
                </span>
                  </div>
              )}
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between font-semibold">
                <span>Tổng cộng</span>
                <span className="text-lg text-blue-600">
                {(orderData.totalPrice - orderData.totalDiscountedPrice).toLocaleString()}đ
              </span>
              </div>
            </div>

            <button
                onClick={handlePayment}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
  );
};

export default PaymentInfo;