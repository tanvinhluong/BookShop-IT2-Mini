import React, {useEffect, useState} from 'react'
import CartItem from '../Cart/CartItem'
import {Button, Input} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {ChevronDown, ChevronUp, Ticket} from "lucide-react";
import {API_BASE_URL, API_TOKEN} from "../../../config/apiConfig";
import axios from "axios";
import {getCart} from "../../../State/Cart/Action";

function OrderSummary() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart); // state.cart chứa danh sách sản phẩm
  const jwt = localStorage.getItem('jwt');

  const [isOpen, setIsOpen] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [promoCode, setPromoCode] = useState([]);
  const [latestAddress, setLatestAddress] = useState(null);

  useEffect(() => {
    dispatch(getCart());
  }, [cart.removeCartItem, cart.updateCartItem]);

  const handlePayment = async () => {
    try {
      const config = {
        headers: {Authorization: `Bearer ${jwt}`},
      };
      const formattedPromoCode = Array.isArray(promoCode) ? promoCode : [promoCode];
      const cleanedPromoCode = formattedPromoCode.map(code => code.replace(/[\[\]']+/g, '').trim());
      const orderPayload = {
        cartId: cart.cart?.id,
        addressId: latestAddress?.id,
        promotionCode: cleanedPromoCode,
      };

      const response = await axios.post(`${API_BASE_URL}/api/orders/create`, orderPayload, config);
      console.log('Order api:' ,orderPayload)
      console.log('Order created:', response.data);
      if (response?.data?.id) {
        console.log('Order created successfully:', response.data);
        // Chuyển sang bước tiếp theo với orderId
        navigate({ search: `step=4&orderId=${response.data.id}` });
      } else {
        console.error('API did not return orderId:', response.data);
        alert('Đơn hàng không được tạo thành công. Vui lòng thử lại!');
      }
    } catch (error) {
      console.error('Error during order creation:', error);
      alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!');
    }
  }

  const calculateDiscount = () => {
    if (!selectedPromotion || !cart.cart?.totalPrice) return 0;

    if (selectedPromotion.promotionType === 1) {
      // Khuyến mãi toàn đơn hàng
      return Math.floor((cart.cart.totalPrice * selectedPromotion.percentage) / 100);
    } else if (selectedPromotion.promotionType === 2) {
      // Khuyến mãi theo sản phẩm

      const productIdFromPromotion = selectedPromotion.product.id;
      if (!productIdFromPromotion) {
        console.error("Missing product ID in promotion:", selectedPromotion);
        return 0;
      } else {

      }

      const matchingProducts = cart.cart?.cartItems.filter(item => {
        if (!item.productDetail) {
          return false;
        }
        if (!item.productDetail.product) {
          return false;
        }
        if (item.productDetail.product.id !== selectedPromotion.product.id) {
          console.log(
              `Product ID mismatch: ${item.productDetail.product.id} !== ${selectedPromotion.product.id}`
          );
          return false;
        }
        return true;
      });
      const productDiscount = matchingProducts.reduce((total, item) => {
        return total + Math.floor((item.price * selectedPromotion.percentage) / 100);
      }, 0);

      return productDiscount;
    }
    console.log("No matching promotion type.");
    return 0;
  };


  const calculateFinalTotal = () => {
    const discount = calculateDiscount();
    return cart.cart?.totalPrice ? cart.cart.totalPrice - discount : 0;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const fetchData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      };
      const results = await axios.get(`${API_BASE_URL}/api/admin/promotion/`, config);
      setPromotions(results.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleApplyPromotion = (promotion) => {
    if (promotion?.promotionType === 1) {
    setSelectedPromotion(selectedPromotion?.id === promotion.id ? null : promotion);
    setPromoCode(selectedPromotion?.id === promotion.id ? '' : promotion.promotionCode);
    setInputCode(selectedPromotion?.id === promotion.id ? '' : promotion.promotionCode);
    } else if (promotion?.promotionType === 2) {
      const hasMatchingProduct = cart.cart?.cartItems.some(
          item => item.productDetail.product.id === promotion.product.id
      );

      console.log('Promotion Details:', promotion);
      console.log('Cart Items:', cart.cart?.cartItems);
      console.log('Matching Product Check:', hasMatchingProduct);

      if (hasMatchingProduct) {
        setSelectedPromotion(selectedPromotion?.id === promotion.id ? null : promotion);
        setPromoCode(selectedPromotion?.id === promotion.id ? '' : promotion.promotionCode);
        setInputCode(selectedPromotion?.id === promotion.id ? '' : promotion.promotionCode);
      } else {
        alert('Mã khuyến mãi này không áp dụng cho sản phẩm trong giỏ hàng');
      }
    }
  };

  const handleApplyPromoCodeInput = () => {
    const matchingPromotion = promotions.find(
        promo => promo.promotionCode.toLowerCase() === inputCode.toLowerCase()
    );
    if (matchingPromotion) {
      handleApplyPromotion(matchingPromotion);
    } else {
      alert('Mã giảm giá không hợp lệ');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Lấy địa chỉ mới nhất
  useEffect(() => {
    const fetchLatestAddress = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
        };
        const response = await axios.get(`${API_BASE_URL}/api/address/get/latest`, config);
        setLatestAddress(response.data);
      } catch (error) {
        console.error('Error fetching latest address:', error);
      }
    };

    fetchLatestAddress();
  }, [jwt]);


  return (
    <div className="space-y-5">
      <div className="p-5 shadow-lg rounded-s-md border">
        <h3>Địa chỉ giao hàng:</h3>
        {latestAddress ? (
          <div key={latestAddress.id}>
            <p>Đường: {latestAddress.streetAddress}</p>
            <p>Thành phố: {latestAddress.city}</p>
            <p>Quốc gia: {latestAddress.state}</p>
            <p>Mã bưu điện: {latestAddress.zipCode}</p>
            <p>Số điện thoại: {latestAddress.mobile}</p>
          </div>
        ) : (
          <p>Không có địa chỉ giao hàng nào.</p>
        )}
      </div>

      <div className="lg:grid grid-cols-3  relative justify-between">
        <div className="lg:col-span-2">
          <div className="space-y-3">
            {cart.cart?.cartItems.map((item) => (
              <>
                <CartItem item={item} showButton={false} />
              </>
            ))}
          </div>
        </div>

        <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="uppercase font-bold opacity-60 pb-4">
              Billing Details
            </p>
            <hr />
            <div className="space-y-3 font-semibold mb-10">
              <div className="flex justify-between pt-3 text-black">
                <span>Price ({cart.cart?.totalItem} item)</span>
                <span>{cart?.cart?.totalPrice} đ</span>
              </div>

              <div className="flex justify-between pt-3 text-black">
                <span>Discount</span>
                <span className="text-green-600">
                  -{calculateDiscount()} đ
                </span>
              </div>

              <div className="flex justify-between pt-3 text-black">
                <span>Delivery Charges</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between pt-3 text-black">
                <span className="font-bold">Total Amount</span>
                <span className="font-bold ">
                  {calculateFinalTotal()}
                </span>
              </div>
            </div>
            <hr/>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-blue-600 font-medium mb-2"
            >
              <Ticket size={20}/>
              <span>Sử dụng mã giảm giá</span>
              {isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
            </button>
            {isOpen && (
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex gap-2">
                    <Input
                        placeholder="Nhập mã giảm giá/Phiếu mua hàng"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="flex-1"
                    />
                    <Button
                        variant="default"
                        onClick={handleApplyPromoCodeInput}
                    >
                      Áp dụng
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {promotions.map((promotion) => (
                        <div
                            key={promotion.id}
                            className="border rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Ticket className="text-blue-600" size={24} />
                            </div>
                            <div>
                              <div className="font-semibold flex items-center gap-2">
                                Giảm {promotion.percentage}%
                              </div>
                              <div className="text-sm text-gray-600">{promotion.promotionName}</div>
                              <div className="text-xs text-gray-500">
                                HSD: {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
                              </div>
                              <div className="text-xs text-gray-500">Mã: {promotion.promotionCode}</div>
                            </div>
                          </div>
                          <Button
                              variant={selectedPromotion?.id === promotion.id ? "secondary" : "default"}
                              onClick={() => handleApplyPromotion(promotion)}
                              className="flex-shrink-0"
                          >
                            {selectedPromotion?.id === promotion.id ? 'Bỏ chọn' : 'Áp dụng'}
                          </Button>
                        </div>
                    ))}
                  </div>
                </div>
            )}
            {/* CUSTOM THÊM THANH THÊM BỚT SẢN PHẨM TRONG TRANG NÀY, REMOVE NỮA! */}
            <Button
              variant="contained"
              className="w-full mt-5"
              onClick={() => handlePayment()}
              sx={{
                padding: '.8rem 2rem',
                marginTop: '2rem',
                width: '100%',
                bgcolor: '#9155fd',
              }}
            >
              Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
