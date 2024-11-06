import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import cross_icon from '../../customer/components/assets/cross_icon.png';
import './CSS/ListProduct.css';
import upload_area from '../../customer/components/assets/upload_area.svg';
import { API_BASE_URL } from '../../config/apiConfig';

const ProductsTable = () => {
  const [results, setResults] = useState([]);
  const [imageUrl, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    productDescription: '',
    price: '',
    active: '1',
    imageUrl: '',
    supplierId: '',
    categoryIds: []
  });
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [suppliersResponse, categoriesResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/admin/supplier/all`),
          axios.get(`${API_BASE_URL}/api/category/get`)
        ]);
  
        console.log("Suppliers Response:", suppliersResponse.data); // In ra dữ liệu suppliers
        console.log("Categories Response:", categoriesResponse.data); // In ra dữ liệu categories
  
        // Kiểm tra nếu suppliersResponse.data là một mảng trước khi gán
        if (Array.isArray(suppliersResponse.data)) {
          setSuppliers(suppliersResponse.data);
        } else {
          // Nếu không phải mảng, kiểm tra cấu trúc và lấy đúng dữ liệu
          console.error("Dữ liệu suppliers không phải là một mảng:", suppliersResponse.data);
          if (suppliersResponse.data && suppliersResponse.data.suppliers) {
            setSuppliers(suppliersResponse.data.suppliers); // Giả sử suppliers nằm trong thuộc tính "suppliers"
          }
        }
  
        // Kiểm tra nếu categoriesResponse.data là một mảng trước khi gán
        if (Array.isArray(categoriesResponse.data)) {
          setCategories(categoriesResponse.data);
        } else {
          console.error("Dữ liệu categories không phải là một mảng:", categoriesResponse.data);
        }
  
      } catch (error) {
        console.error('Error fetching suppliers or categories:', error);
      } finally {
        setLoadingSuppliers(false);
        setLoadingCategories(false);
      }
    };
  
    fetchData();
  }, []);
  

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setNewProduct({
      ...newProduct,
      imageUrl: URL.createObjectURL(file),
    });
  };

  const handleDelete = async (productId) => {
    const conFirmDelete = window.confirm('Bạn có muốn xóa không?');
    if (conFirmDelete) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${jwt}` },
        };
        await axios.delete(
          `${API_BASE_URL}/api/admin/products/${productId}/delete`,
          config
        );
        setResults(results.filter((product) => product.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const handleAddProduct = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      categoryIds: Array.from(e.target.selectedOptions, option => option.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", newProduct.productName);
    formData.append("productDescription", newProduct.productDescription);
    formData.append("price", newProduct.price);
    formData.append("active", newProduct.active);
    formData.append("supplierId", newProduct.supplierId);

    if (newProduct.categoryIds.length > 0) {
      newProduct.categoryIds.forEach((categoryId) => {
        formData.append("categoryIds", categoryId);
      });
    }

    if (imageUrl) {
      formData.append("image", imageUrl);
    }

    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/products/create`,
        formData,
        config
      );
      setShowForm(false);
      setResults((prev) => [...prev, response.data]);
      setNewProduct({
        productName: '',
        productDescription: '',
        price: '',
        active: '1',
        imageUrl: '',
        supplierId: '',
        categoryIds: [],
      });
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="list-product">
      {location.search.includes('message=edit_success') && (
        <div className="success-message">Edit successful!</div>
      )}
      <button className="add-product-button" onClick={handleAddProduct}>
        ADD PRODUCT
      </button>
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
                  src={result.productImageUrl}
                  alt={result.productName}
                  className="listproduct-product-icon"
                />
                <p>{result.productName}</p>
                <p>{result.productDescription || 'No description'}</p>
                <p>{result.price.toLocaleString()} VND</p>
                <p>{result.quantity || 'N/A'}</p>
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

      {showForm && (
        <form onSubmit={handleSubmit} className="add-product-form">
          <h2>Add New Product</h2>
          <label>
            Product Name:
            <input
              type="text"
              name="productName"
              value={newProduct.productName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Product Description:
            <input
              type="text"
              name="productDescription"
              value={newProduct.productDescription}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Active:
            <select
              name="active"
              value={newProduct.active}
              onChange={handleInputChange}
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </label>
          <label>
            Supplier:
            {loadingSuppliers ? (
              <div>Loading suppliers...</div>
            ) : (
              <select
                name="supplierId"
                value={newProduct.supplierId}
                onChange={handleInputChange}
              >
                <option value="">Select a Supplier</option>
                {Array.isArray(suppliers) && suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            )}
          </label>
          <label>
            Categories:
            {loadingCategories ? (
              <div>Loading categories...</div>
            ) : (
              <select
                multiple
                name="categoryIds"
                value={newProduct.categoryIds}
                onChange={handleCategoryChange}
              >
                {Array.isArray(categories) && categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </label>
          <div>
            <label>
              Upload Image:
              <input type="file" onChange={imageHandler} />
            </label>
            {imageUrl && <img src={imageUrl} alt="Product Preview" />}
          </div>
          <div className="add-product-button">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductsTable;
