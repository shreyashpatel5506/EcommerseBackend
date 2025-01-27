import React, { useState, useEffect } from "react";
import Layout from "../component/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const [allproducts, setAllproducts] = useState(null); // Initialize as null for clarity
  const params = useParams();

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5020/api/product/get-SingleProduct/${params.slug}`
      );
      setAllproducts(data.product);
    } catch (error) {
      console.log("Error fetching product:", error);
      // toast.error("Something went wrong while fetching the product");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  if (!allproducts) {
    return (
      <Layout>
        <div className="text-center mt-5">
          <h2>Loading Product Details...</h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="row mb-3">
        {/* Image part for product */}
        <div className="col-md-6">
          <div
            id="indicators-carousel"
            className="relative w-full"
            data-carousel="static"
          >
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              {/* Item 1 */}
              <div
                className="hidden duration-700 ease-in-out"
                data-carousel-item="active"
              >
                <img
                  src={`http://localhost:5020/api/product/get-ProductPhoto/${allproducts._id}`}
                  alt={allproducts.name || "Product"}
                  className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                />
              </div>
              {/* Other Items */}
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="hidden duration-700 ease-in-out"
                  data-carousel-item
                >
                  <img
                    src={`http://localhost:5020/api/product/get-ProductPhotothubnail${
                      index + 1
                    }/${allproducts._id}`}
                    alt={allproducts.name || "Product"}
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  />
                </div>
              ))}
            </div>
            {/* Slider indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
              {[...Array(5)].map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`w-3 h-3 rounded-full ${
                    idx === 0 ? "aria-current=true" : "aria-current=false"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                  data-carousel-slide-to={idx}
                ></button>
              ))}
            </div>
            {/* Slider controls */}
            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </div>
        {/* Product description */}
        <div className="col-md-6">
          <h1>{allproducts.name}</h1>
          <p>{allproducts.description}</p>
          <p>
            Price: <strong>${allproducts.price}</strong>
          </p>
        </div>
      </div>
      <div className="row mb-3">{/* Relative product details */}</div>
    </Layout>
  );
};

export default SingleProduct;
