import React, { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";
import { useCart } from "../Context/Cart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/auth";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  // const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch Braintree client token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5020/api/product/braintree/token",
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.clientToken) {
        console.log("Client Token:", data.clientToken); // Debugging line
        setClientToken(data.clientToken);
      } else {
        console.error("Client token not received:", data);
      }
    } catch (error) {
      console.error("Error fetching client token:", error);
    }
  };

  // Fetch token on component mount or when auth token changes
  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth?.token]);

  // Remove item from cart
  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  // Update item quantity in cart
  const updateQuantity = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total price of cart items
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handle payment submission
  const handlePayment = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5020/api/product/braintree/payment",
        {
          cart,
          amount: getTotalPrice(),
          status: "Pending",
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/Orders");
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
    }
  };

  return (
    <Layout title="Cart - E-commerce">
      <div className="container mt-4">
        <h2 className="text-center mb-4">Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center">
            <h4>Your cart is empty</h4>
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="row">
            {/* Cart Items */}
            <div className="col-md-8">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="card mb-3 p-3 d-flex flex-row align-items-center"
                >
                  <img
                    src={`http://localhost:5020/api/product/get-ProductPhoto/${item._id}`}
                    alt={item.name}
                    className="img-fluid"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="ms-3">
                    <h5>{item.name}</h5>
                    <p>₹{item.price}</p>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-danger ms-auto"
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Payment Section */}
            <div className="col-md-4">
              <div className="card p-3 mb-3">
                <h4>Order Summary</h4>
                <p className="fw-bold fs-4">Total: ₹{getTotalPrice()}</p>
              </div>

              <div className="card p-3">
                <h4>Payment Gateway</h4>
                {clientToken ? (
                  <div>
                    {/* <DropIn
                      options={{
                        authorization: clientToken,
                      }}
                      onInstance={(instance) => {
                        console.log("Braintree DropIn Instance:", instance);
                        setInstance(instance);
                      }}
                    /> */}
                    <button
                      className="btn btn-success w-100 mt-3"
                      onClick={handlePayment}
                    >
                      {loading ? "Processing..." : "Pay Now"}
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Initializing payment gateway...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
