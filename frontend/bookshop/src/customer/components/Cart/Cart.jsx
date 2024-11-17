import React, {useEffect, useState} from 'react'
import CartItem from './CartItem'
import { Button, Input } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../../State/Cart/Action'
import { useTranslation } from 'react-i18next'
import {ChevronDown, ChevronUp, Ticket} from "lucide-react";
import axios from "axios";
import {API_BASE_URL, API_TOKEN} from "../../../config/apiConfig";
const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart } = useSelector((store) => store)
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false);
  const [inputCode, setInputCode] = useState('');

  const [promotions, setPromotions] = useState([])
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [promoCode, setPromoCode] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  const fetchData = async (value) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      }
      const results = await axios.get(`${API_BASE_URL}/api/admin/promotion/`, config)
      setPromotions(results.data)
      console.log(results.data);
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleApplyPromotion = (promotion) => {
    setSelectedPromotion(selectedPromotion?.id === promotion.id ? null : promotion);
    setPromoCode(selectedPromotion?.id === promotion.id ? '' : promotion.promotionCode);
  };

  useEffect(() => {
    fetchData()
  }, [])


  useEffect(() => {
    dispatch(getCart())
  }, [cart.removeCartItem, cart.updateCartItem])

  const isCartEmpty = cart.cart?.totalItem === 0

  return (
    <div>
      {isCartEmpty ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-xl font-bold">{t('emptyCart')}</h2>
          <p className="text-gray-600">{t('goToHome')}</p>
          <Button
            onClick={() => navigate('/')}
            variant="contained"
            className="mt-5"
            sx={{
              bgcolor: '#9155fd',
            }}
          >
            {t('backToHome')}
          </Button>
        </div>
      ) : (
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          <div className="lg:col-span-2 lg:px-5 bg-white">
            <div className="space-y-3">
              {(cart.cartItems ?? []).map((item, index) => (
                <CartItem
                  item={item}
                  key={`cartitem#${index}`}
                  showButton={true}
                />
              ))}
            </div>
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="uppercase font-bold opacity-60 pb-4">
                {t('billingDetails')}
              </p>
              <hr/>
              <div className="space-y-3 font-semibold mb-10">
                <div className="flex justify-between pt-3 text-black">
                  <span>
                    {t('price')} ({cart.cart?.totalItem} {t('item')})
                  </span>
                  <span>{cart.cart?.totalPrice} VND</span>
                </div>

                <div className="flex justify-between pt-3 text-black">
                  <span>{t('discount')}</span>
                  <span className="text-green-600">- VND</span>
                </div>

                <div className="flex justify-between pt-3 text-black">
                  <span>{t('deliveryCharges')}</span>
                  <span className="text-green-600">Free</span>
                </div>

                <div className="flex justify-between pt-3 text-black">
                  <span className="font-bold">{t('totalAmount')}</span>
                  <span className="font-bold ">
                    {cart.cart?.totalPrice} VND
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
                      <Button variant="default">Áp dụng</Button>
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
              <hr/>
              <Button
                  onClick={() => navigate('/checkout?step=2')}
                  variant="contained"
                  className="w-full mt-5"
                  sx={{
                    padding: '.8rem 2rem',
                    marginTop: '2rem',
                    width: '100%',
                    bgcolor: '#9155fd',
                  }}
              >
                {t('checkout')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
