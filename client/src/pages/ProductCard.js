import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product, auth, cart, setCart }) => {
  const navigate = useNavigate();
  const [productQuantity, setProductQuantity] = useState(1);

  const handleQuantityChange = (id, quantity) => {
    setProductQuantity(quantity);
  };

  return (
    <div className="col-12 d-flex justify-content-center mb-4">
      <div className="flex flex-col md:flex-row w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link to={`/singleProduct/${product.slug}`} className="text-dark w-1/2">
          <img
            className="rounded-l-lg object-cover h-350 w-full"
            src={`http://localhost:5020/api/product/get-ProductPhoto/${product._id}`}
            alt={product.name || "Product"}
            style={{ width: "100%", height: "100%" }}
          />
        </Link>
        <div className="p-4 flex flex-col justify-between w-1/2">
          <div>
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h5>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {product.description.substring(0, 80)}...
            </p>
            <div className="flex items-center mt-2.5 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                5.0
              </span>
            </div>
            <span className="text-lg text-gray-900 dark:text-white">
              {product.price}₹
            </span>
          </div>

          <div className="flex items-center space-x-3 mt-3">
            <button
              type="button"
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 border border-gray-300 rounded-lg px-3 py-2"
              onClick={() =>
                handleQuantityChange(
                  product._id,
                  Math.max(1, productQuantity - 1)
                )
              }
              disabled={productQuantity === 1}
            >
              -
            </button>
            <input
              type="text"
              className="w-12 text-center bg-gray-50 border border-gray-300 rounded-lg py-1 dark:bg-gray-700 dark:text-white"
              value={productQuantity}
              onChange={(e) =>
                handleQuantityChange(
                  product._id,
                  parseInt(e.target.value, 10) || 1
                )
              }
            />
            <button
              type="button"
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 border border-gray-300 rounded-lg px-3 py-2"
              onClick={() =>
                handleQuantityChange(product._id, productQuantity + 1)
              }
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="w-full mt-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center"
            onClick={() => {
              if (auth?.token) {
                const isProductInCart = cart.some(
                  (item) => item._id === product._id
                );
                if (isProductInCart) {
                  toast.error("Product is already in the cart");
                } else {
                  setCart([...cart, { ...product, quantity: productQuantity }]);
                }
              } else {
                navigate("/login");
              }
            }}
            disabled={!auth?.token}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
