import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const API_BASE =
  "https://ecommersebackendshreyash.onrender.com/api/product/get-ProductPhoto";

const ProductCard = ({ product, auth, cart, setCart }) => {
  const navigate = useNavigate();
  const [productQuantity, setProductQuantity] = useState(1);

  const handleQuantityChange = (newQty) => {
    const safeQty = Math.max(1, parseInt(newQty, 10) || 1);
    setProductQuantity(safeQty);
  };

  const handleAddCart = () => {
    if (!auth?.token) {
      navigate("/login");
      return;
    }

    const isProductInCart = cart.some((item) => item._id === product._id);

    if (isProductInCart) {
      toast.error("Product is already in the cart");
    } else {
      setCart([...cart, { ...product, quantity: productQuantity }]);
      toast.success("Product added to cart");
    }
  };

  return (
    <article className="w-full flex justify-center mb-4 p-2">
      <div className="flex flex-col md:flex-row w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <Link
          to={`/singleProduct/${product.slug}`}
          className="w-full md:w-5/12 relative aspect-[4/3] md:aspect-auto"
          aria-label={`View details for ${product.name}`}
        >
          <img
            className="object-cover w-full h-full"
            src={`${API_BASE}/${product._id}`}
            alt={product.name || "Product"}
            loading="lazy"
          />
        </Link>
        <div className="p-4 flex flex-col justify-between w-full md:w-7/12">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {product.name}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {product.description.substring(0, 90)}...
            </p>
            <div className="flex items-center mt-2 mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                5.0
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white block">
              {product.price}₹
            </span>
          </div>

          <div className="flex items-center space-x-3 mt-4">
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onClick={() => handleQuantityChange(productQuantity - 1)}
              disabled={productQuantity === 1}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <input
              type="text"
              className="w-12 text-center bg-gray-50 border border-gray-300 rounded-lg py-1 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              value={productQuantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              aria-label="Quantity"
            />
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onClick={() => handleQuantityChange(productQuantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="w-full mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAddCart}
          >
            {auth?.token ? "Add to Cart" : "Login to Add"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
