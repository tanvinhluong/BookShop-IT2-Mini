import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CSS/PromotionTable.css'
import { API_BASE_URL, api, API_TOKEN } from '../../config/apiConfig'
import { format } from 'date-fns'

const PromotionTable = () => {
  const [promotions, setPromotions] = useState([])
  const jwt = localStorage.getItem('jwt')
  const [showForm, setShowForm] = useState(false)
  const [newPromotion, setNewPromotion] = useState({
    promotionName: '',
    promotionType: '',
    promotionCode: '',
    startDate: '',
    endDate: '',
    supplierId: '',
    percentage: 0,
    categoryId: '',
    productId: '',
  })
  const [products, setProducts] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [categories, setCategories] = useState([])
  const [loadingSuppliers, setLoadingSuppliers] = useState(true)
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const suppliersResponse = await axios.get(
          `${API_BASE_URL}/api/admin/supplier/all`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        )
        if (Array.isArray(suppliersResponse.data)) {
          setSuppliers(suppliersResponse.data)
        } else {
          console.error(
            'Dữ liệu suppliers không phải là một mảng:',
            suppliersResponse.data
          )
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error)
      } finally {
        setLoadingSuppliers(false)
      }
    }

    fetchSuppliers()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axios.get(
          `${API_BASE_URL}/api/category/get`
        )
        if (Array.isArray(categoriesResponse.data)) {
          setCategories(categoriesResponse.data)
        } else {
          console.error(
            'Dữ liệu categories không phải là một mảng:',
            categoriesResponse.data
          )
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoadingCategories(false)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
      try {
        const productsResponse = await axios.get(
          `${API_BASE_URL}/api/products/getAll?pageNumber=0&pageSize=100`,
          config
        )
        if (Array.isArray(productsResponse.data.content)) {
          setProducts(productsResponse.data.content)
        } else {
          console.error(
            'Dữ liệu products không phải là một mảng:',
            productsResponse.data
          )
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoadingProducts(false)
      }
    }

    fetchProducts()
  }, [])

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/promotion/`,
        config
      )
      setPromotions(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAddPromotion = () => {
    setShowForm(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPromotion((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Ensure required fields are filled out
    if (!newPromotion.promotionName || !newPromotion.percentage) {
      console.error('Các trường bắt buộc chưa được điền đầy đủ!')
      return
    }

    // Create promotion data to be sent in the API request
    const promotionData = {
      promotionName: newPromotion.promotionName,
      promotionType: newPromotion.promotionType || 0, // Default to 0 if not specified
      promotionCode: Array.isArray(newPromotion.promotionCode)
        ? newPromotion.promotionCode
        : [newPromotion.promotionCode || ''], // Ensure promotionCode is an array
      startDate: newPromotion.startDate || new Date().toISOString(),
      endDate: newPromotion.endDate || new Date().toISOString(),
      supplierId: newPromotion.supplierId || null, // Ensure a value is provided
      percentage: newPromotion.percentage,
      categoryId: newPromotion.categoryId || null, // Ensure an array if not provided
      productId: newPromotion.productId || null, // Ensure an array if not provided
    }

    try {
      // Set request headers for authentication and content type
      const config = {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }

      // Send the request to the backend
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/promotion/create`,
        promotionData,
        config
      )

      // Hide form and update the promotions state
      setShowForm(false)
      setPromotions((prev) => [...prev, response.data])

      // Reset form state
      setNewPromotion({
        promotionName: '',
        promotionType: '',
        promotionCode: '',
        startDate: '',
        endDate: '',
        supplierId: '',
        percentage: 0,
        categoryId: '',
        productId: '',
      })
    } catch (error) {
      console.error(
        'Error adding promotion:',
        error.response ? error.response.data : error.message
      )
    }
  }

  return (
    <div className="promotion-table">
      <h1>All Promotions</h1>
      <button className="add-promotion-button" onClick={handleAddPromotion}>
        ADD PROMOTION
      </button>

      {!showForm && (
        <>
          <div className="table-header">
            <p>ID</p>
            <p>Product</p>
            <p>Category</p>
            <p>Promotion Name</p>
            <p>Promotion Type</p>
            <p>Promotion Code</p>
            <p>Start Date</p>
            <p>End Date</p>
            <p>Percent(%)</p>
          </div>
          <div className="table-body">
            <hr />
            {promotions.map((promotion, index) => (
              <React.Fragment key={index}>
                <div className="table-row">
                  <p>{promotion?.id}</p>
                  <p>{promotion?.product?.productName}</p>
                  <p>{promotion?.category?.name}</p>
                  <p>{promotion?.promotionName}</p>
                  <p>{promotion?.promotionType}</p>
                  <p>{promotion?.promotionCode}</p>
                  <p>{format(new Date(promotion?.startDate), 'yyyy-MM-dd')}</p>
                  <p>{format(new Date(promotion?.endDate), 'yyyy-MM-dd')}</p>
                  <p>{promotion?.percentage}</p>
                </div>
                <hr />
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="add-product-form">
          <h2>Add New Promotion</h2>
          <label>
            Promotion Name:
            <input
              type="text"
              name="promotionName"
              value={newPromotion.promotionName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Promotion Type:
            <input
              type="text"
              name="promotionType"
              value={newPromotion.promotionType}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Percentage:
            <input
              type="number"
              name="percentage"
              value={newPromotion.percentage}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Promotion Code:
            <input
              type="text"
              name="promotionCode"
              value={newPromotion.promotionCode}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Start Date:
            <input
              type="text"
              name="startDate"
              value={newPromotion.startDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Start Date:
            <input
              type="text"
              name="endDate"
              value={newPromotion.endDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Supplier:
            <select
              name="supplierId"
              value={newPromotion.supplierId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Categories:
            <select
              name="categoryId"
              required
              onChange={handleInputChange}
              value={newPromotion.categoryId}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Product:
            <select
              name="productId"
              required
              onChange={handleInputChange}
              value={newPromotion.productId}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.productName}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" onClick={handleSubmit}>
            Add Promotion
          </button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  )
}

export default PromotionTable
