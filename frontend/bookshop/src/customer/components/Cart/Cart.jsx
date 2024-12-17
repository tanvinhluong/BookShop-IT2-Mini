import React, {useEffect, useState} from 'react';
import CartItem from './CartItem';
import { Button, Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../State/Cart/Action';
import { useTranslation } from 'react-i18next';
import {ChevronDown, ChevronUp, Ticket} from "lucide-react";
import axios from "axios";
import {API_BASE_URL, API_TOKEN} from "../../../config/apiConfig";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCart());
  }, [cart.removeCartItem, cart.updateCartItem]);

  const isCartEmpty = cart.cart?.totalItem === 0;

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


                    {/*<div className="flex justify-between pt-3 text-black">*/}
                    {/*  <span>{t('deliveryCharges')}</span>*/}
                    {/*  <span className="text-green-600"></span>*/}
                    {/*</div>*/}

                    <div className="flex justify-between pt-3 text-black">
                      <span className="font-bold">{t('totalAmount')}</span>
                      <span className="font-bold">
                    {cart.cart?.totalPrice} VND
                  </span>
                    </div>
                  </div>
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
  );
};

export default Cart;