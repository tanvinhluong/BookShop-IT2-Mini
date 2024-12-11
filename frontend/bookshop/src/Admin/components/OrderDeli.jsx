import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/ListOrderDeli.css";
import { API_BASE_URL } from "../../config/apiConfig";

const OrderDeli = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newDeliveryDate, setNewDeliveryDate] = useState("");
  const [showRules, setShowRules] = useState(false);
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

  const handleDeliveryDateUpdate = async (orderId, orderStatus) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${jwt}` },
      };

      // Cập nhật ngày giao hàng
      await axios.put(
        `${API_BASE_URL}/api/admin/orders/${orderId}/update-delivery-date`,
        null,
        {
          params: { deliveryDate: newDeliveryDate },
          ...config,
        }
      );

      // Nếu trạng thái là "hủy bỏ", chuyển thành "đang giao"
      if (orderStatus === 5) {
        await axios.put(
          `${API_BASE_URL}/api/admin/orders/${orderId}/deliver`,
          null,
          config
        );
        alert(
          "Ngày giao hàng đã được cập nhật và trạng thái chuyển thành 'đang giao'!"
        );
      } else {
        alert("Ngày giao hàng đã được cập nhật!");
      }

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
    if (orderStatus !== 2) {
      setEditingOrderId(orderId);
      setNewDeliveryDate(currentDeliveryDate);
    } else {
      alert("Bạn không thể chỉnh sửa ngày giao hàng khi đơn hàng đã hoàn tất.");
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

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orderdeli-container">
      <h1 className="orderdeli-h1">Orders Delivery List</h1>
      <div className="ordersTable-rules">
        <span className="ordersTable-rules-icon" onClick={toggleRules}>
          !
        </span>
        {showRules && (
          <div className={`ordersTable-rules-popup ${showRules ? "show" : ""}`}>
            <h3>Quy tắc làm việc</h3>
            <ul>
              <li>
              - Chỉ có thể chỉnh sửa ngày giao hàng nếu đơn hàng không ở trạng thái "Hoàn tất"
              </li>
              <li>
                {" "}
                - Nhân viên giao hàng bấm nút "Nhận đơn" để lấy đơn hàng.
              </li>
              <li>
                - Nhân viên giao hàng sau khi giao xong sẽ bấm "Hoàn tất" nếu
                giao thành công hoặc "Hủy" nếu khách hàng không nhận đơn.
              </li>
              <li>
                - Nhân viên giao hàng có thể xem chi tiết đơn hàng bằng cách
                nhấn nút "Details"
              </li>
              <li>
                - Đảm bảo cập nhật trạng thái đơn hàng chính xác sau khi xử lý.
              </li>
              <li>
                - Nếu đơn hàng bị hủy mà khách hàng kêu là muốn giao lại thì có thể chỉnh sửa ngày giao và trạng thái đơn hàng sẽ cập nhật thành "Đang giao".
              </li>
            </ul>
            <button className="ordersTable-close-rules" onClick={toggleRules}>
              Đóng
            </button>
          </div>
        )}
      </div>
      <div>
        <label htmlFor="status-filter">Filter by Order Status:</label>
        <select
          className="orderdeli-select"
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
      <div className="orderdeli-listorder-main">
        <p>Order ID</p>
        <p>Total Items</p>
        <p>Total Price</p>
        <p>Order Date</p>
        <p>Delivery Date</p>
        <p>Order Status</p>
        <p>Actions</p>
      </div>
      <div className="orderdeli-allorders">
        <hr />
        {!!filteredOrders &&
          filteredOrders.map((order, index) => (
            <React.Fragment key={index}>
              <div className="orderdeli-listorder-row">
                <p>{order.id}</p>
                <p>{order.totalItem}</p>
                <p>{order.totalPrice}</p>
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                <p>
                  {order.deliveryDate
                    ? new Date(order.deliveryDate).toLocaleDateString()
                    : "Chưa có"}
                </p>
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
                <div className="orderdeli-actions">
                  {order.orderStatus === 3 &&
                    new Date(order.deliveryDate) >= new Date() && (
                      <button onClick={() => handleDeliverOrder(order.id)}>
                        Nhận đơn
                      </button>
                    )}
                  {(order.orderStatus === 3 || order.orderStatus === 5) && (
                    <button
                      onClick={() =>
                        handleEditClick(
                          order.id,
                          order.deliveryDate,
                          order.orderStatus
                        )
                      }
                    >
                      Chỉnh sửa ngày giao hàng
                    </button>
                  )}
                  <button onClick={() => handleDetailsClick(order.id)}>
                    Details
                  </button>
                  {order.orderStatus === 4 && (
                    <button onClick={() => handleCompleteOrder(order.id)}>
                      Hoàn tất
                    </button>
                  )}
                  {order.orderStatus === 4 && (
                    <button onClick={() => handleCancelOrder(order.id)}>
                      Hủy
                    </button>
                  )}
                  {editingOrderId === order.id && (
                    <div>
                      <input
                        type="date"
                        value={newDeliveryDate}
                        onChange={(e) => setNewDeliveryDate(e.target.value)}
                      />
                      <button
                        onClick={() =>
                          handleDeliveryDateUpdate(order.id, order.orderStatus)
                        }
                      >
                        Update
                      </button>
                      <button onClick={() => setEditingOrderId(null)}>
                        Cancel
                      </button>
                    </div>
                  )}
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
