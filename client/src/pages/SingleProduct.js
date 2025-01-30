import React, { useState, useEffect } from "react";
import Layout from "../component/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const [allproducts, setAllproducts] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const params = useParams();

  // Fetch Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5020/api/product/get-SingleProduct/${params.slug}`
      );
      setAllproducts(data.product);
      relatedProduct(data?.product?._id, data?.product?.category);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  const relatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5020/api/product/relatedProduct/${pid}/${cid}`
      );
      setRelatedProducts(data.products);
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // Detect screen resize
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  // Store image URLs in an array
  const images = [
    `http://localhost:5020/api/product/get-ProductPhoto/${allproducts._id}`,
    `http://localhost:5020/api/product/get-ProductPhotothubnail1/${allproducts._id}`,
    `http://localhost:5020/api/product/get-ProductPhotothubnail2/${allproducts._id}`,
    `http://localhost:5020/api/product/get-ProductPhotothubnail3/${allproducts._id}`,
    `http://localhost:5020/api/product/get-ProductPhotothubnail4/${allproducts._id}`,
    `http://localhost:5020/api/product/get-ProductPhotothubnail5/${allproducts._id}`,
  ];

  // Handle navigation
  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % images.length);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Image Carousel */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <img
                src={images[activeIndex]}
                alt={`Slide ${activeIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-700"
              />
            </div>

            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-900"
            >
              ❮
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-900"
            >
              ❯
            </button>

            {/* Thumbnails on Desktop, Dots on Mobile */}
            {isMobile ? (
              <div className="flex mt-4 justify-center space-x-2">
                {images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full cursor-pointer transition ${
                      idx === activeIndex
                        ? "bg-red-500 scale-110"
                        : "bg-gray-400 hover:bg-gray-500"
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  ></div>
                ))}
              </div>
            ) : (
              <div className="flex mt-4 justify-center space-x-2">
                {images.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-16 h-16 cursor-pointer rounded-md transition border-2 ${
                      idx === activeIndex
                        ? "border-red-500 opacity-100"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold">{allproducts.name}</h1>
            <p className="text-gray-600 mt-2">{allproducts.description}</p>
            <p className="text-lg font-semibold text-red-500 mt-4">
              Price: ${allproducts.price}
            </p>
          </div>
          {/* related product*/}
          <div className="flex  flex-wrap justify-center">
            <h2 className="text-2xl font-bold text-center w-full mt-8">
              Related Products
            </h2>
            <div className="flex flex-row flex-wrap justify-center">
              {Array.isArray(relatedProducts) &&
                relatedProducts.map((p) => (
                  <div
                    className="col-12  col-md-4 d-flex justify-content-center mb-4"
                    key={p._id}
                  >
                    <div
                      className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                      style={{ width: "100%" }}
                    >
                      <span href="/">
                        <img
                          className="p-2 rounded-t-lg"
                          src={`http://localhost:5020/api/product/get-ProductPhoto/${p._id}`}
                          alt={p.name || "Product"}
                          style={{ width: "100%", height: "350px" }}
                        />
                      </span>
                      {/* <span href="/">
                      <img
                        className="p-2 rounded-t-lg"
                        src={`http://localhost:5020/api/product/get-ProductPhotothubnail1/${p._id}`}
                        alt={p.name || "Product"}
                        style={{ width: "100%", height: "350px" }}
                      />
                    </span> */}
                      <div className="px-5 pb-5">
                        <span href="/">
                          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            {p.name}
                          </h5>
                          <h5 className="text-m  tracking-tight text-gray-900 dark:text-white">
                            {p.description.substring(0, 50)}...
                          </h5>
                        </span>

                        <div className="flex items-center justify-between">
                          <span className="text-l  text-gray-900 dark:text-white">
                            {p.price}₹
                          </span>
                        </div>

                        <button
                          type="button"
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 mt-1"
                          style={{ width: "100%" }}
                        >
                          <svg
                            className="w-3.5 h-3.5 me-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 21"
                          >
                            <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                          </svg>
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
