import React from 'react'
import './ProductCard.css'
import { useNavigate } from 'react-router-dom'
const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="productCard w-[15rem] m-3 transition-all cursor-pointer p-5  "
      style={{ border: '1px solid #333333', borderRadius: '20px' }}
    >
      <div className="h-[12rem]">
        <img
          className="h-full w-full object-cover "
          src={product.productImageUrl}
          alt=""
        />
      </div>
      <div className="textPart bg-white p-3">
        <div>
          <p className="font-bold opacity-60">{product.brand}</p>
          <p className="">{product.title}</p>

          <p className="font-semibold opacity-50">{product.color}</p>
        </div>
        <div className="flex items-center space-x-2 ">
          <p className="font-semibold">{product.discountPrice} đ</p>
          <p className="line-through opacity-50">{product.price} đ</p>
          <p className="text-green-600 font-semibold">
            {product.discountPersent}% off
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
