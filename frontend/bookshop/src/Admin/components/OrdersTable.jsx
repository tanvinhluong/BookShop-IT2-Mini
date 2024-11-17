import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/ListOrder.css";
import { API_BASE_URL } from "../../config/apiConfig";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/orders/`,
        config
      );

      // Lọc chỉ lấy các đơn hàng có orderStatus là 1, 2, 3, 4, hoặc 5
      const filtered = response.data.filter(
        (order) =>
          order.orderStatus === 1 ||
          order.orderStatus === 2 ||
          order.orderStatus === 3 ||
          order.orderStatus === 4 ||
          order.orderStatus === 5
      );

      setOrders(filtered);
      setFilteredOrders(filtered);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleShipOrder = async (orderId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      await axios.put(
        `${API_BASE_URL}/api/admin/orders/${orderId}/ship`,
        null,
        config
      );
      alert("Đơn hàng đã chuyển sang trạng thái Đang giao!");
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.");
    }
  };

  const handleDetailsClick = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);

    if (status === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) => order.orderStatus.toString() === status
      );
      setFilteredOrders(filtered);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="list-order">
      <h1>All Orders List</h1>
      <div>
        <label htmlFor="status-filter">Filter by Order Status:</label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="1">Đang chờ duyệt</option>
          <option value="2">Đã giao hoàn tất</option>
          <option value="3">Đã duyệt</option>
          <option value="4">Đang giao</option>
          <option value="5">Hủy bỏ</option>
        </select>
      </div>
      <div className="listorder-format-main">
        <p>Order ID</p>
        <p>Total Items</p>
        <p>Total Price</p>
        <p>Order Date</p>
        <p>Order Status</p>
        <p>Approve</p>
        <p>Actions</p>
      </div>
      <div className="listorder-allorders">
        <hr />
        {!!filteredOrders &&
          filteredOrders.map((order, index) => (
            <React.Fragment key={index}>
              <div className="listorder-format-main listorder-format">
                <p>{order.id}</p>
                <p>{order.totalItem}</p>
                <p>{order.totalPrice}</p>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                <p>
                  {order.orderStatus === 1
                    ? "Đang chờ duyệt"
                    : order.orderStatus === 2
                    ? "Đã giao hoàn tất"
                    : order.orderStatus === 3
                    ? "Đã duyệt"
                    : order.orderStatus === 4
                    ? "Đang giao"
                    : order.orderStatus === 5
                    ? "Hủy bỏ"
                    : "Không xác định"}
                </p>
                <div>
                  {order.orderStatus === 1 && (
                    <button
                      onClick={() => handleShipOrder(order.id)}
                      className="confirm-button"
                    >
                      Duyệt
                    </button>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => handleDetailsClick(order.id)}
                    className="details-button"
                  >
                    Details
                  </button>
                </div>
              </div>
              <hr />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default OrdersTable;
