import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import cross_icon from '../../customer/components/assets/cross_icon.png'
import './CSS/ListProduct.css'
import { API_BASE_URL } from '../../config/apiConfig'

const ProductsTable = () => {
  const [results, setResults] = useState([])
  const navigate = useNavigate()
  const jwt = localStorage.getItem('jwt')
  const location = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/admin/products/all?pageNumber=0&pageSize=100`
        )
        setResults(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  })

  const handleDelete = async (productId) => {
    const conFirmDelete = window.confirm('Bạn có muốn xóa không?')
    if (conFirmDelete) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
        }
        await axios.delete(
          `${API_BASE_URL}/api/admin/products/${productId}/delete`,
          config
        )
        setResults(results.filter((product) => product.id !== productId))
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const handleEdit = (productId) => {
    navigate(`/admin/products/edit/${productId}`)
  }

  return (
    <div className="list-product">
      {location.search.includes('message=edit_success') && (
        <div className="success-message">Edit successful!</div>
      )}
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Product Name</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Remove</p>
        <p>Update</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {!!results &&
          results.map((result, index) => (
            <React.Fragment key={index}>
              <div className="listproduct-format-main listproduct-format">
                <img
                  src={result.productImageUrl} // Sử dụng productImageUrl từ JSON
                  alt={result.productName}
                  className="listproduct-product-icon"
                />
                <p>{result.productName}</p>
                <p>{result.productDescription || 'No description'}</p>{' '}
                {/* Cập nhật để hiển thị mô tả sản phẩm */}
                <p>{result.price.toLocaleString()} VND</p> {/* Định dạng giá */}
                <p>{result.quantity || 'N/A'}</p>{' '}
                {/* Hiển thị số lượng nếu có */}
                <img
                  onClick={() => handleDelete(result.id)}
                  src={cross_icon}
                  alt="Remove"
                  className="listproduct-remove-icon"
                  data-id={result.id}
                />
                <button onClick={() => handleEdit(result.id)}>EDIT</button>
              </div>
              <hr />
            </React.Fragment>
          ))}
      </div>
    </div>
  )
}

export default ProductsTable
