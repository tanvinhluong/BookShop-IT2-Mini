import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/ListOrderDeli.css";
import { API_BASE_URL } from "../../config/apiConfig";

const OrderDeli = () => {
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

      // Lọc chỉ trạng thái 2, 3, 4, 5
      const filtered = response.data.filter(
        (order) =>
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

  const handleDeliverOrder = async (orderId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      await axios.put(
        `${API_BASE_URL}/api/admin/orders/${orderId}/deliver`,
        null,
        config
      );
      alert("Đơn hàng đã chuyển sang trạng thái đang giao!");
      fetchOrders();
    } catch (error) {
      console.error("Error delivering order:", error);
      alert("Có lỗi xảy ra khi nhận đơn hàng.");
    }
  };

  const handleCompleteOrder = async (orderId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      await axios.put(
        `${API_BASE_URL}/api/admin/orders/${orderId}/confirmed`,
        null,
        config
      );
      alert("Đơn hàng đã hoàn tất!");
      fetchOrders();
    } catch (error) {
      console.error("Error confirming order:", error);
      alert("Có lỗi xảy ra khi xác nhận đơn hàng.");
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };
      await axios.put(
        `${API_BASE_URL}/api/admin/orders/${orderId}/cancel`,
        null,
        config
      );
      alert("Đơn hàng đã bị hủy!");
      fetchOrders();
    } catch (error) {
      console.error("Error canceling order:", error);
      alert("Có lỗi xảy ra khi hủy đơn hàng.");
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
      <h1>Orders List</h1>
      <div>
        <label htmlFor="status-filter">Filter by Order Status:</label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="2">Đã giao hoàn tất</option>
          <option value="3">Đang chờ nhận đơn</option>
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
                  {order.orderStatus === 2
                    ? "Đã giao hoàn tất"
                    : order.orderStatus === 3
                    ? "Đang chờ nhận đơn"
                    : order.orderStatus === 4
                    ? "Đang giao"
                    : order.orderStatus === 5
                    ? "Hủy bỏ"
                    : "Không xác định"}
                </p>
                <div className="actions-row">
                  {order.orderStatus === 3 && (
                    <button
                      onClick={() => handleDeliverOrder(order.id)}
                      className="deliver-button"
                    >
                      Nhận đơn
                    </button>
                  )}
                  {order.orderStatus === 4 && (
                    <>
                      <button
                        onClick={() => handleCompleteOrder(order.id)}
                        className="confirm-button"
                      >
                        Đã giao hoàn tất
                      </button>
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="cancel-button"
                      >
                        Hủy bỏ
                      </button>
                    </>
                  )}
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

export default OrderDeli;
