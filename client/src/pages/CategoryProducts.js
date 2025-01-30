import React, { useState, useEffect } from "react";
import Layout from "../component/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Slider } from "antd";

const CategoryProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [total, setTotal] = useState(0);
  const { id } = useParams(); // Get category ID from URL

  // Fetch products by category
  const getProductsByCategory = async (categoryId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5020/api/product/get-productbycategory/${categoryId}`
      );
      if (data?.success) {
        setAllProducts(data.products);
        console.log(data);
      }
    } catch (error) {
      console.log("Error fetching products by category:", error);
    }
  };

  // Fetch total products count
  const getTotalProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5020/api/product/total"
      );
      if (data.success) {
        setTotal(data.count);
      }
    } catch (error) {
      console.log("Error fetching total count:", error);
    }
  };

  // Runs when category ID changes
  useEffect(() => {
    if (id) {
      getProductsByCategory(id);
    }
  }, [id]);

  useEffect(() => {
    getTotalProducts();
  }, []);

  // Handle price filter
  const handlePriceChange = (value) => {
    setPriceRange(value);
    filterProducts(value);
  };

  // Filter products by price
  const filterProducts = async (price) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5020/api/product/filter-Product",
        {
          selectedCategories: [id],
          price,
        }
      );
      if (data.success) {
        setAllProducts(data.getProducts);
      }
    } catch (error) {
      console.log("Error filtering products:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Filters Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h5 className="text-lg font-bold mb-3">Filters</h5>
            <div className="mb-4">
              <h6 className="font-semibold">Price Range</h6>
              <Slider
                range
                defaultValue={[0, 250000]}
                min={0}
                max={250000}
                step={1000}
                onChange={handlePriceChange}
              />
            </div>
            <button
              onClick={() => {
                setPriceRange([0, 250000]);
                getProductsByCategory(id);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-3 w-full"
            >
              Reset Filters
            </button>
          </div>

          {/* Product Display Section */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.length > 0 ? (
                allProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white border rounded-lg shadow-lg overflow-hidden"
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
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
