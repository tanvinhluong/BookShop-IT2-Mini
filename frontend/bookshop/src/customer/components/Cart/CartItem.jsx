import { Button, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useDispatch } from 'react-redux'
import { removeCartItem, updateCartItem } from '../../../State/Cart/Action'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function CartItem({ item, showButton }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const handleUpdateCartItem = (num) => {
    const data = {
      data: { quantity: item?.quantity + num },
      cartItemId: item?.id,
    }
    dispatch(updateCartItem(data))
  }

  const handleRemoveCartItem = () => {
    const data = { cartItemId: item?.id }
    dispatch(removeCartItem(data))
    window.location.reload()
  }

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item?.productDetail?.imageUrl}
            alt=""
          />
        </div>
        <div className="m-5 space-y-1">
          <p className="font-semibold">{item?.productDetail?.name}</p>
          <p className="opacity-70">
            {t('quantity')}: {item?.productDetail?.inStock}
          </p>

          <div className="flex space-x-5 items-center  text-gray-900 pt-6">
            <p className="font-semibold">{item?.productDetail?.price} VND</p>
          </div>
        </div>
      </div>

      {showButton && (
        <div className="lg:flex items-center lg:space-x-10 pt-4">
          <div className="flex items-center space-x-2">
            <IconButton
              onClick={() => handleUpdateCartItem(-1)}
              disabled={item?.quantity <= 1}
              sx={{ color: 'RGB(145 85 253)' }}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
            <span className="py-1 px-7 border rounded-sm">
              {item?.quantity}
            </span>
            <IconButton
              onClick={() => handleUpdateCartItem(1)}
              sx={{ color: 'RGB(145 85 253)' }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div>
            <Button
              onClick={handleRemoveCartItem}
              sx={{ color: 'RGB(145 85 253)' }}
              variant="text"
            >
              {t('remove')}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartItem
