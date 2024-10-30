import React from 'react'

function HomeSectionCard({ product, productId }) {
  return (
    <div
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg 
    overflow-hidden w-[15rem] mx-3 hover:-translate-y-3  ease-in duration-300 "
    >
      <a href={`product/${productId}`}>
        <div className="h-[13rem] w-[10rem] ">
          <img
            className="object-cover object-top w-full h-full"
            src={product?.productImageUrl || product?.image}
            alt={product?.productName}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900">
            {product?.supplier?.name}
          </h3>
          <p className="mt-2 text-sm text-gray-500">{product?.productName}</p>
        </div>
      </a>
    </div>
  )
}

export default HomeSectionCard
