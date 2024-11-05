import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import cross_icon from '../../customer/components/assets/cross_icon.png'
import './CSS/ListProduct.css'
import upload_area from '../../customer/components/assets/upload_area.svg'
import { API_BASE_URL } from '../../config/apiConfig'

const ProductsTable = () => {
  const [imageUrl, setImage] = useState(null)
  const [results, setResults] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: '',
    quantity: '',
    productDescription: '',
    imageUrl: '',
    active:'1'
  })

  const navigate = useNavigate()
  const jwt = localStorage.getItem('jwt')
  const location = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
        }
        const response = await axios.get(
          `${API_BASE_URL}/api/admin/products/all`,
          config
        )
        setResults(response.data.content)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [jwt])

  const imageHandler = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setNewProduct({
      ...newProduct,
      imageUrl: URL.createObjectURL(file),
    })
  }

  const handleDelete = async (productId) => {
    const conFirmDelete = window.confirm("Bạn có muốn xóa không?")
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

  const handleAddProductClick = () => {
    setShowForm(!showForm)
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setNewProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', newProduct.productName)
      formData.append('price', newProduct.price)
      formData.append('quantity', newProduct.quantity)
      formData.append('description', newProduct.productDescription)
      formData.append('image', newProduct.imageUrl)

      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data'
        }
      }
      await axios.post(`${API_BASE_URL}/api/admin/products/creates`, formData, config)
      alert('Product added successfully!')
      setShowForm(false)
      setNewProduct({ productName: '', price: '', quantity: '', productDescription: '', imageUrl: '' })
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  return (
    <div className="list-product">
      {location.search.includes('message=edit_success') && (
        <div className="success-message">Edit successful!</div>
      )}

      <button onClick={() => setShowForm(!showForm)} className="add-product-btn">
        ADD PRODUCT
      </button>
      <h1>All Products List</h1>

      <div className="listproduct-format-main">
        <p>Products Name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Remove</p>
        <p>Active</p>
        <p>Update</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {!!results &&
          results.map((result, index) => (
            <React.Fragment key={index}>
              <div className="listproduct-format-main listproduct-format">
                <img
                  src={result.imageUrl}
                  alt=""
                  className="listproduct-product-icon"
                />
                <p>{result.productName}</p>
                <p>{result.price}</p>
                <p>{result.quantity}</p>
                <img
                  onClick={() => handleDelete(result.id)}
                  src={cross_icon}
                  alt=""
                  className="listproduct-remove-icon"
                  data-id={result.id}
                />
                <button onClick={() => handleEdit(result.id)}>EDIT</button>
              </div>
              <hr />
            </React.Fragment>
          ))}
      </div>
  
      {/* Form thêm sản phẩm */}
      {showForm && (
        <form className="product-form">
          <input type="text" placeholder="Product Name" onChange={handleInputChange} name="productName" />
          <input type="number" placeholder="Price" onChange={handleInputChange} name="price" />
          <input type="number" placeholder="Quantity" onChange={handleInputChange} name="quantity" />
          <textarea placeholder="Product Description" onChange={handleInputChange} name="productDescription"></textarea>
          <div className="active-toggle">
            <label>Active:</label>
              <select name="active" onChange={handleInputChange} required>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
          </div>
          <div className="addproduct-itemfield">
              <label htmlFor="file-input">
                <img
                  src={
                    newProduct.imageUrl ? newProduct.imageUrl : upload_area
                  }
                  className="addproduct-thumbnail-img"
                  alt=""
                />
              </label>
              <input
                onChange={imageHandler}
                type="file"
                name="image"
                id="file-input"
                hidden
              />
          </div>
          <button type="submit" onChange={handleSubmit}>Submit</button>
        </form>
      )}
    </div>
  )  
}

export default ProductsTable
