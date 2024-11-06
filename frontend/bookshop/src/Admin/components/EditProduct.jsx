import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import './CSS/EditProduct.css'
import { API_BASE_URL } from '../../config/apiConfig'

const EditProduct = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [productDetails, setProductDetails] = useState({
    productImageUrl: '',
    productDescription: '',
    productName:'',
    supplierId:'0',
    price:'0',
    active: true,
    numRatings:'0',
    quantity:'0',
    createdAt: null
  })

  const jwt = localStorage.getItem('jwt')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5454/api/products/${productId}`
        )
        setProductDetails(response.data)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct()
  }, [productId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        await axios.put(
            `${API_BASE_URL}/api/admin/products/${productId}/update`,
            productDetails,
            config
        );
        navigate('/admin/products?message=edit_success'); 
    } catch (error) {
        console.error('Error updating product:', error);
    }
};


  return (
    <div className="edit-product">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            name="productName"
            value={productDetails.productName}
            onChange={handleChange}
          />
        </label>
        <label>
          Product Description:
          <input
            type="text"
            name="productDescription"
            value={productDetails.productDescription}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default EditProduct
