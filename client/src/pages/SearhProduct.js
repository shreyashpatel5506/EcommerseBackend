import React, { useState, useEffect } from "react";
import Layout from "../component/layout/Layout";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useAuth } from "../Context/auth";
import { Checkbox, Slider } from "antd";
import { useSearch } from "../Context/search";
import Category from "../component/layout/category";
import { useCart } from "../Context/Cart";

import { useNavigate } from "react-router-dom";

const SearhProduct = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [values, setValues] = useSearch();
  console.log(values.products);
  // Fetch products based on search query
  const getTotals = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5020/api/product/total`
      );
      if (data.success) {
        setTotal(data.count);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getAllcategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5020/api/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log("error" + error);
    }
  };

  useEffect(() => {
    getAllcategories();
    getTotals();
  }, []);

  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
    filterProducts(checkedValues, priceRange);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    filterProducts(selectedCategories, value);
  };

  const filterProducts = async (selectedCategories, price) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5020/api/product/filter-Product",
        { selectedCategories, price }
      );
      if (data.success) {
        setValues(data.getProducts);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Layout>
        <Category />
        <div className="container-fluid m-3 p-3 mx-0">
          <div className="row">
            <div className="col-md-3">
              <div className="d-flex flex-row justify-content-between">
                <h5>Filter</h5>
                <span
                  className="btn-danger"
                  onClick={() => window.location.reload()}
                  style={{ cursor: "pointer" }}
                >
                  Reset Filter
                </span>
              </div>
              <div className="d-flex flex-column">
                <Checkbox.Group
                  options={categories.map((c) => ({
                    label: c.name,
                    value: c._id,
                  }))}
                  onChange={handleCategoryChange}
                />
              </div>
              <div>
                <h5>Price</h5>
                <Slider
                  range
                  defaultValue={[0, 250000]}
                  min={0}
                  max={250000}
                  step={1000}
                  onChange={handlePriceChange}
                />
              </div>
            </div>
            <div className="col-md-9">
              <h6>
                {values?.products?.length < 1 ? "No Products Found" : "Found"}
              </h6>
              <div className="row">
                {Array.isArray(values?.products) &&
                  values.products.map((p) => (
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
              <div className="text-center">Total Products: {total}</div>
              <div className="pagination-controls">
                <button
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  <svg
                    className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  Prev
                </button>
                <button
                  className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  Next
                  <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SearhProduct;
