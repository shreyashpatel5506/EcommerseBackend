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
      console.log("Error fetching related products:", error);
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
        </div>

        {/* Related Products Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            Related Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(relatedProducts) &&
              relatedProducts.map((p) => (
                <div
                  key={p._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition hover:shadow-xl"
                >
                  {/* Product Image */}
                  <div className="w-full h-64 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={`http://localhost:5020/api/product/get-ProductPhoto/${p._id}`}
                      alt={p.name || "Product"}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {p.description.substring(0, 50)}...
                    </p>
                    <p className="text-lg font-bold text-red-500 mt-2">
                      ₹{p.price}
                    </p>

                    {/* Add to Cart Button */}
                    <button className="w-full mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg transition hover:bg-blue-600">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
