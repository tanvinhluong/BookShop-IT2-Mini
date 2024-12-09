import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/ListOrder.css";
import { API_BASE_URL, API_TOKEN } from "../../config/apiConfig";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newDeliveryDate, setNewDeliveryDate] = useState("");
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

      const filtered = response.data.filter(
        (order) =>
          order.orderStatus === 0 ||
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

  const handleRequestConfirmation = async (orderId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const response = await axios.post(
        `${API_BASE_URL}/api/admin/orders/request-order-confirmation`,
        null,
        {
          params: { orderId },
          ...config,
        }
      );
      alert(response.data);
    } catch (error) {
      console.error("Error sending order confirmation request:", error);
      alert("Có lỗi xảy ra khi gửi yêu cầu xác nhận.");
    }
  };

  const handleShipOrder = async (orderId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      await axios.put(
        `${API_BASE_URL}/api/admin/orders/${orderId}/approve`,
        null,
        config
      );
      alert("Đơn hàng đã chuyển sang trạng thái Đã duyệt!");
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.");
    }
  };

  const handleDeliveryDateUpdate = async (orderId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      const response = await axios.put(
        `${API_BASE_URL}/api/admin/orders/${orderId}/update-delivery-date`,
        null,
        {
          params: { deliveryDate: newDeliveryDate },
          ...config,
        }
      );
      alert("Ngày giao hàng đã được cập nhật!");
      fetchOrders();
      setEditingOrderId(null);
    } catch (error) {
      console.error("Error updating delivery date:", error);
      alert("Có lỗi xảy ra khi cập nhật ngày giao hàng.");
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

  const handleEditClick = (orderId, currentDeliveryDate, orderStatus) => {
    if (orderStatus === 0) {
      setEditingOrderId(orderId);
      setNewDeliveryDate(currentDeliveryDate);
    } else {
      alert(
        "Bạn chỉ có thể chỉnh sửa ngày giao hàng khi đơn hàng đang chờ duyệt."
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="ordersTable-container">
      <h1>All Orders List</h1>
      <div className="ordersTable-filter">
        <label htmlFor="status-filter">Filter by Order Status:</label>
        <select 
          className="  "
          id="status-filter"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="0">Đang chờ duyệt</option>
          <option value="2">Đã giao hoàn tất</option>
          <option value="3">Đã duyệt</option>
          <option value="4">Đang giao</option>
          <option value="5">Hủy bỏ</option>
        </select>
      </div>
      <div className="ordersTable-header">
        <p>Order ID</p>
        <p>Total Price</p>
        <p>Order Date</p>
        <p>Delivery Date</p>
        <p>Order Status</p>
        <p>Approve</p>
        <p>Actions</p>
      </div>
      <div className="ordersTable-rows">
        <hr />
        {!!filteredOrders &&
          filteredOrders.map((order, index) => (
            <React.Fragment key={index}>
              <div className="ordersTable-row">
                <p>{order.id}</p>
                <p>{order.totalPrice}</p>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                <p>{new Date(order.deliveryDate).toLocaleDateString()}</p>
                <p>
                  {order.orderStatus === 0
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
                <p>
                  {order.confirmed === true && (
                    <button
                      className="ordersTable-btn ordersTable-approveBtn"
                      onClick={() => handleShipOrder(order.id)}
                    >
                      Duyệt
                    </button>
                  )}
                </p>
                <p>
                  <div className="ordersTable-actions">
                    <button
                      className="ordersTable-btn ordersTable-detailsBtn"
                      onClick={() => handleDetailsClick(order.id)}
                    >
                      Details
                    </button>
                    {order.orderStatus === 0 && (
                      <button
                        className="ordersTable-btn ordersTable-editDeliveryDateBtn"
                        onClick={() =>
                          handleEditClick(
                            order.id,
                            order.deliveryDate,
                            order.orderStatus
                          )
                        }
                      >
                        Edit
                      </button>
                    )}
                    {order.orderStatus === 0 && order.confirmed === false && (
                      <button
                        className="ordersTable-btn ordersTable-requestConfirmBtn"
                        onClick={() => handleRequestConfirmation(order.id)}
                      >
                        Gửi yêu cầu xác nhận
                      </button>
                    )}
                  </div>
                </p>
              </div>
              {editingOrderId === order.id && (
                <div className="ordersTable-editForm">
                  <input
                    type="date"
                    value={newDeliveryDate}
                    onChange={(e) => setNewDeliveryDate(e.target.value)}
                  />
                  <button
                    className="ordersTable-updateBtn"
                    onClick={() => handleDeliveryDateUpdate(order.id)}
                  >
                    Update
                  </button>
                  <button
                    className="ordersTable-cancelBtn"
                    onClick={() => setEditingOrderId(null)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default OrdersTable;
