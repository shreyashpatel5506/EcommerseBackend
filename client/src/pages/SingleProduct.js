import React, { useState, useEffect } from "react";
import Layout from "../component/layout/Layout";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useAuth } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCart } from "../Context/Cart";
import { useLoading } from "../Context/Loading";

const SingleProduct = () => {
  const [allproducts, setAllproducts] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const params = useParams();
  const { showLoading, hideLoading } = useLoading();

  // Fetch Single Product
  const getSingleProduct = async () => {
    try {
      showLoading("Loading Product Details...");
      const { data } = await axios.get(
        `https://ecommersebackendshreyash.onrender.com/api/product/get-SingleProduct/${params.slug}`
      );
      setAllproducts(data.product);
      await relatedProduct(data?.product?._id, data?.product?.category);
    } catch (error) {
      console.log("Error fetching product:", error);
    } finally {
      hideLoading();
    }
  };

  const relatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://ecommersebackendshreyash.onrender.com/api/product/relatedProduct/${pid}/${cid}`
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  if (!allproducts) {
    return (
      <Layout>
        <div style={{ minHeight: "60vh" }} />
      </Layout>
    );
  }

  // Store image URLs in an array
  const images = [
    `https://ecommersebackendshreyash.onrender.com/api/product/get-ProductPhoto/${allproducts._id}`,
    `https://ecommersebackendshreyash.onrender.com/api/product/get-ProductPhotothubnail1/${allproducts._id}`,
    `https://ecommersebackendshreyash.onrender.com/api/product/get-ProductPhotothubnail2/${allproducts._id}`,
    `https://ecommersebackendshreyash.onrender.com/api/product/get-ProductPhotothubnail3/${allproducts._id}`,
    `https://ecommersebackendshreyash.onrender.com/api/product/get-ProductPhotothubnail4/${allproducts._id}`,
    `https://ecommersebackendshreyash.onrender.com/api/product/get-ProductPhotothubnail5/${allproducts._id}`,
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
                    className={`w-3 h-3 rounded-full cursor-pointer transition ${idx === activeIndex
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
                    className={`w-16 h-16 cursor-pointer rounded-md transition border-2 ${idx === activeIndex
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

          <div className="row">
            {Array.isArray(relatedProducts) &&
              relatedProducts.map((p) => (
                <div
                  className="col-12 col-md-6 col-lg-6 d-flex justify-content-center mb-4"
                  key={p._id}
                >
                  <ProductCard
                    product={p}
                    cart={cart}
                    setCart={setCart}
                    auth={auth}
                    navigate={navigate}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleProduct;
