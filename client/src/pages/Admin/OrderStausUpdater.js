import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import Adminmenu from "./AdminMenu";
import axios from "axios";
import { useAuth } from "../../Context/auth";

const OrderStatusUpdater = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [duration, setDuration] = useState("this week");
  const [statusFilter, setStatusFilter] = useState(""); // New state for filtering

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommersebackendshreyash.onrender.com/api/auth/Orders",
        {
          params: { duration, status: statusFilter }, // Include status in API request
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      console.log("Fetched orders:", data.orders);
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      console.log("Updating order:", orderId, "to status:", newStatus);
      const response = await axios.put(
        `https://ecommersebackendshreyash.onrender.com/api/auth/Orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );

      console.log("API response:", response.data);

      if (response.data.success) {
        alert("Order updated successfully");

        // Update local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, paymentStatus: newStatus }
              : order
          )
        );
      } else {
        alert("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert(
        error.response?.data?.message ||
          "Error updating order status. Please try again."
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [duration, statusFilter]); // Refetch when duration or statusFilter changes

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <Adminmenu />
        </div>
        <div className="col-md-9">
          <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="mx-auto max-w-5xl">
                <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    All Orders
                  </h2>
                  <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                    <span className="inline-block text-gray-500 dark:text-gray-400">
                      {" "}
                      from{" "}
                    </span>
                    {/* Duration Dropdown */}
                    <select
                      id="duration"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option value="this week">This week</option>
                      <option value="this month">This month</option>
                      <option value="last 3 months">Last 3 months</option>
                      <option value="last 6 months">Last 6 months</option>
                      <option value="this year">This year</option>
                    </select>

                    {/* Status Filter Dropdown */}
                    <select
                      id="statusFilter"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Success">Success</option>
                      <option value="Failed">Failed</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refund">Refund</option>
                    </select>
                  </div>
                </div>
                <div className="container mx-auto p-4">
                  <h2 className="text-2xl font-semibold mb-4">Orders</h2>
                  {orders.length === 0 ? (
                    <p>No orders found.</p>
                  ) : (
                    orders.map((order) => (
                      <div
                        key={order._id}
                        className="border p-4 mb-4 rounded-lg"
                      >
                        <p className="font-semibold">Order ID: {order._id}</p>
                        <p>User: {order.user?.name}</p>
                        <p>
                          Status:
                          <select
                            className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                            value={order.paymentStatus}
                            onChange={(e) =>
                              updateOrderStatus(order._id, e.target.value)
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="Success">Success</option>
                            <option value="Failed">Failed</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="refund">Refund</option>
                          </select>
                        </p>
                        <p>
                          Date: {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <div className="mt-2">
                          <h3 className="font-semibold">Items:</h3>
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center mt-2">
                              <img
                                src={`https://ecommersebackendshreyash.onrender.com/api/product/get-ProductPhoto/${item.product._id}`}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover"
                              />
                              <div className="ml-4">
                                <p className="font-semibold">
                                  {item.product.name}
                                </p>
                                <p>Quantity: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default OrderStatusUpdater;
