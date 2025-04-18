import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import cross_icon from "../../customer/components/assets/cross_icon.png";
import "./CSS/ListProduct.css";
import { API_BASE_URL, API_TOKEN } from "../../config/apiConfig";

const ProductsTable = () => {
  const [results, setResults] = useState([]);
  const [imageUrl, setImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productDescription: "",
    price: 0,
    isActive: true,
    imageUrl: "",
    supplierId: "",
    categoryIds: [],
    quantity: 0,
    productDetailName: "",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingSuppliers, setLoadingSuppliers] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    productName: false,
    productDetailName: false,
    productDescription: false,
    price: false,
    quantity: false,
    priceLimitExceeded: false,
    quantityLimitExceeded: false,
  });
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const location = useLocation();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const suppliersResponse = await axios.get(
          `${API_BASE_URL}/api/admin/supplier/all`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        if (Array.isArray(suppliersResponse.data)) {
          setSuppliers(suppliersResponse.data);
        } else {
          console.error(
            "Dữ liệu suppliers không phải là một mảng:",
            suppliersResponse.data
          );
        }
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      } finally {
        setLoadingSuppliers(false);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axios.get(
          `${API_BASE_URL}/api/category/get`
        );
        if (Array.isArray(categoriesResponse.data)) {
          setCategories(categoriesResponse.data);
        } else {
          console.error(
            "Dữ liệu categories không phải là một mảng:",
            categoriesResponse.data
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/products/getAll?pageNumber=0&pageSize=100`
        );
        if (response.data && Array.isArray(response.data.content)) {
          setResults(response.data.content);
        } else {
          console.error(
            "Dữ liệu sản phẩm không đúng định dạng:",
            response.data
          );
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi fetch sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const conFirmDelete = window.confirm("Bạn có muốn xóa không?");
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
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
      setNewProduct((prev) => ({
        ...prev,
        imageUrl: objectUrl,
      }));
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

    if (
      results.some(
        (product) => product.productName.toLowerCase() === value.toLowerCase()
      )
    ) {
      setIsDuplicate(true);
    } else {
      setIsDuplicate(false);
    }

    setValidationErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "",
    }));

    if (name === "price") {
      if (value > 1000000) {
        setValidationErrors((prev) => ({ ...prev, priceLimitExceeded: true }));
      } else {
        setValidationErrors((prev) => ({ ...prev, priceLimitExceeded: false }));
      }
    }

    if (name === "quantity") {
      if (value > 1000) {
        setValidationErrors((prev) => ({
          ...prev,
          quantityLimitExceeded: true,
        }));
      } else {
        setValidationErrors((prev) => ({
          ...prev,
          quantityLimitExceeded: false,
        }));
      }
    }
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      categoryIds: Array.from(
        e.target.selectedOptions,
        (option) => option.value
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newProduct.productName ||
      !newProduct.price ||
      !newProduct.supplierId ||
      newProduct.categoryIds.length === 0
    ) {
      console.error("Các trường bắt buộc chưa được điền đầy đủ!");
      return;
    }

    const productData = {
      productName: newProduct.productName,
      createdAt: new Date().toISOString(),
      supplierId: newProduct.supplierId,
      productDescription: newProduct.productDescription || "",
      imageUrl: newProduct.imageUrl || "",
      price: newProduct.price,
      isActive: newProduct.isActive,
      numRate: 0,
      quantity: newProduct.quantity,
      categoryIds: newProduct.categoryIds,
      productDetailName: newProduct.productDetailName,
    };

    try {
      const token = localStorage.getItem("jwt");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/admin/products/create`,
        productData,
        config
      );

      setShowForm(false);
      setResults((prev) => [...prev, response.data]);
      setNewProduct({
        productName: "",
        productDescription: "",
        price: 0,
        isActive: true,
        imageUrl: "",
        supplierId: "",
        categoryIds: [],
        quantity: 0,
        productDetailName: "",
      });
      alert("Thêm sản phẩm thành công");
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="list-product">
      {location.search.includes("message=edit_success") && (
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
                <p>{result.productDescription || "No description"}</p>
                <p>{result.price.toLocaleString()} VND</p>
                <p>{result.productDetails && result.productDetails.length > 0 ? result.productDetails[0].inStock : "N/A"}</p>
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
              placeholder="Type product name here"
              required
              style={{
                borderColor:
                  validationErrors.productName || isDuplicate ? "red" : "",
              }}
            />
            {isDuplicate && (
              <p style={{ color: "red" }}>
                Cửa hàng của bạn đã có sản phẩm này rồi.
              </p>
            )}
            {validationErrors.productName && (
              <p style={{ color: "red" }}>Tên sản phẩm không được để trống.</p>
            )}
          </label>

          <label>
            Product Detail Name:
            <input
              type="text"
              name="productDetailName"
              value={newProduct.productDetailName}
              onChange={handleInputChange}
              placeholder="Type product detail name here"
              required
              style={{
                borderColor: validationErrors.productDetailName ? "red" : "",
              }}
            />
            {validationErrors.productDetailName && (
              <p style={{ color: "red" }}>
                Tên chi tiết sản phẩm không được để trống.
              </p>
            )}
          </label>

          <label>
            Product Description:
            <input
              type="text"
              name="productDescription"
              value={newProduct.productDescription}
              placeholder="Type product description here"
              onChange={handleInputChange}
              style={{
                borderColor: validationErrors.productDescription ? "red" : "",
              }}
            />
            {validationErrors.productDescription && (
              <p style={{ color: "red" }}>
                Mô tả sản phẩm không được để trống.
              </p>
            )}
          </label>

          <label>
            Price:
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
              style={{
                borderColor:
                  validationErrors.price || validationErrors.priceLimitExceeded
                    ? "red"
                    : "",
              }}
            />
            {validationErrors.price && (
              <p style={{ color: "red" }}>Giá tiền không được để trống.</p>
            )}
            {validationErrors.priceLimitExceeded && (
              <p style={{ color: "red" }}>
                Giá tiền không được vượt quá 1,000,000 VND
              </p>
            )}
          </label>

          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              required
              style={{
                borderColor:
                  validationErrors.quantity ||
                  validationErrors.quantityLimitExceeded
                    ? "red"
                    : "",
              }}
            />
            {validationErrors.quantity && (
              <p style={{ color: "red" }}>Số lượng không được để trống.</p>
            )}
            {validationErrors.quantityLimitExceeded && (
              <p style={{ color: "red" }}>Số lượng không được vượt quá 1000.</p>
            )}
          </label>
          <label>
            Active:
            <select
              name="isActive"
              value={newProduct.isActive}
              onChange={handleInputChange}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
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
                required
              >
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            )}
          </label>
          <label>
            Categories:
            <select
              name="categoryIds"
              value={newProduct.categoryIds}
              onChange={handleCategoryChange}
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Product Preview"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </label>
          <button type="submit">Add Product</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductsTable;
