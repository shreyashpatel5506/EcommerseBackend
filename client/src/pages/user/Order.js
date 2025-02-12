import React, { useEffect, useState } from "react";
import Layout from "../../component/layout/Layout";
import UserMenu from "./UserMenu";
import axios from "axios";
import { useAuth } from "../../Context/auth";

const Order = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [duration, setDuration] = useState("this week");

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5020/api/auth/Orders",
        {
          params: { status, duration },
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, duration]);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="mx-auto max-w-5xl">
                <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    My orders
                  </h2>
                  <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                    <div>
                      <label
                        htmlFor="order-type"
                        className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select order type
                      </label>
                      <select
                        id="order-type"
                        className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">All orders</option>
                        <option value="pre-order">Pre-order</option>
                        <option value="transit">In transit</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <span className="inline-block text-gray-500 dark:text-gray-400">
                      {" "}
                      from{" "}
                    </span>
                    <div>
                      <label
                        htmlFor="duration"
                        className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select duration
                      </label>
                      <select
                        id="duration"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      >
                        <option value="this week">this week</option>
                        <option value="this month">this month</option>
                        <option value="last 3 months">the last 3 months</option>
                        <option value="last 6 months">the last 6 months</option>
                        <option value="this year">this year</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  {orders.length === 0 ? (
                    <p>No orders found</p>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {orders.map((order) => (
                        <div key={order._id} className="card p-4">
                          <h5 className="text-lg font-semibold">
                            Order ID: {order._id}
                          </h5>
                          <p>Status: {order.paymentStatus}</p>
                          <p>
                            Order Date:{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <div>
                            {order.items.map((item) => (
                              <div
                                key={item._id}
                                className="flex items-center mt-2"
                              >
                                <img
                                  src={`http://localhost:5020/api/product/get-ProductPhoto/${item._id}`}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover"
                                />
                                <div className="ml-4">
                                  <p>{item.name}</p>
                                  <p>Quantity: {item.quantity}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
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

export default Order;
