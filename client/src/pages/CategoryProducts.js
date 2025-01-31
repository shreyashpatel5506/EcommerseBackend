import React, { useState, useEffect } from "react";
import Layout from "../component/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const { id } = useParams();

  // Debug log to confirm id is captured
  useEffect(() => {
    console.log("ID from URL:", id);
  }, [id]);

  const getProductsByCategory = async () => {
    if (!id) return;
    try {
      const { data } = await axios.get(
        `http://localhost:5020/api/product/get-productbycategory/${id}`
      );
      if (data?.success) {
        setAllProducts(data.products);
      } else {
        setAllProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  useEffect(() => {
    getProductsByCategory();
  }, [id]);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts.length > 0 ? (
            allProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded-lg shadow-lg"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={`http://localhost:5020/api/product/get-ProductPhoto/${product._id}`}
                  alt={product.name}
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {product.description.substring(0, 50)}...
                  </p>
                  <p className="text-lg font-semibold text-red-500 mt-2">
                    ₹{product.price}
                  </p>
                  <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-3 hover:bg-blue-600">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
