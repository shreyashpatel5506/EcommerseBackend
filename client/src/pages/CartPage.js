import React, { useEffect } from "react";
import Layout from "../component/layout/Layout";
import { useCart } from "../Context/Cart";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setCart([]);
      localStorage.removeItem("cart");
    }
  }, [setCart]);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Layout title="Cart - E-commerce">
      <div className="container mt-4">
        <h2 className="text-center">Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center">
            <h4>Your cart is empty</h4>
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="row">
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
                    <p>{item.price}₹</p>
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

            <div className="col-md-4">
              <div className="card p-3">
                <h4>Total: {getTotalPrice()}₹</h4>
                <button className="btn btn-success w-100">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
