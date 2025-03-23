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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch Braintree client token
  useEffect(() => {
    if (auth?.token) {
      axios
        .get(
          "https://ecommersebackend-pwe8.onrender.com/api/product/braintree/token",
          {
            headers: { Authorization: auth?.token },
          }
        )
        .then(({ data }) => {
          if (data?.clientToken) setClientToken(data.clientToken);
        })
        .catch((error) => console.error("Error fetching client token:", error));
    }
  }, [auth?.token]);

  // Remove item from cart
  const removeItem = (id) => setCart(cart.filter((item) => item._id !== id));

  // Update item quantity in cart
  const updateQuantity = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate total price of cart items
  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle payment submission
  const handlePayment = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://ecommersebackend-pwe8.onrender.com/api/product/braintree/payment",
        {
          cart,
          amount: getTotalPrice(),
          paymentStatus: "Pending",
        },
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        }
      );
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/Orders");
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
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
                  className="card mb-3 p-3 d-flex flex-row align-items-center shadow-sm"
                  style={{ borderRadius: "10px" }}
                >
                  <img
                    src={`https://ecommersebackend-pwe8.onrender.com/api/product/get-ProductPhoto/${item._id}`}
                    alt={item.name}
                    className="img-fluid rounded"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="ms-3">
                    <h5>{item.name}</h5>
                    <p className="text-muted">₹{item.price}</p>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          updateQuantity(
                            item._id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        disabled={item.quantity <= 1}
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
              <div className="card p-3 mb-3 shadow-sm">
                <h4>Order Summary</h4>
                <p className="fw-bold fs-4">Total: ₹{getTotalPrice()}</p>
              </div>

              <div className="card p-3 shadow-sm">
                <h4>Payment Gateway</h4>
                {clientToken ? (
                  <button
                    className="btn btn-success w-100 mt-3"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Pay Now"}
                  </button>
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
