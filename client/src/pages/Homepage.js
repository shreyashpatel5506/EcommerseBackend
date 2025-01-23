import React, { useState, useEffect } from "react";
import Layout from "../component/layout/Layout";
import { useAuth } from "../Context/auth";
import axios from "axios";
import { Checkbox } from "antd";
import { Slider } from "antd";

const Homepage = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [allproducts, setAllproducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5020/api/product/perpageProduct/${page}`
      );
      if (data.success) {
        if (page === 1) {
          setAllproducts(data.products);
        } else {
          setAllproducts((prevProducts) => [...prevProducts, ...data.products]);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getTotals();
  }, [page]);
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
        {
          selectedCategories,
          price,
        }
      );
      if (data.success) {
        setAllproducts(data.getProducts);
      }
    } catch (error) {
      console.log("error" + error);
    }
  };

  return (
    <div>
      <Layout title={"Best Offer - Ecommerse"} description={"Homepage"}>
        <div className="container-fluid m-3 p-3 mx-0">
          <div className="row">
            <div className="col-md-3">
              <div className="d-flex flex-row justify-content-between">
                <h5>Filter</h5>
                <span
                  className="btn-danger"
                  onClick={() => {
                    window.location.reload();
                  }}
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
              <h5 className="text-center">All Products</h5>
              <div className="row">
                {Array.isArray(allproducts) &&
                  allproducts.map((p) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4"
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
                        <div className="px-5 pb-5">
                          <span href="/">
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                              {p.name}
                            </h5>
                            <h5 className="text-m  tracking-tight text-gray-900 dark:text-white">
                              {p.description.substring(0, 50)}...
                            </h5>
                          </span>
                          <div className="flex items-center mt-2.5 mb-5">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                              <svg
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                              <svg
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                              <svg
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                              <svg
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                              <svg
                                className="w-4 h-4 text-gray-200 dark:text-gray-600"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                              >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                              </svg>
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                              5.0
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-l  text-gray-900 dark:text-white">
                              {p.price}₹
                            </span>
                          </div>
                          {/* <button
                            type="button"
                            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                          >
                            Add to Cart
                          </button> */}
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
              <div className="text-center">Total Products: {total}</div>
              <div
                className="m-2 p-3"
                style={{ width: "100%", cursor: "pointer" }}
              >
                <nav aria-label="Page navigation example">
                  <ul className="inline-flex -space-x-px text-sm">
                    <li>
                      <span
                        href="/"
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page - 1);
                        }}
                        disable={page === 1}
                      >
                        Previous
                      </span>
                    </li>
                    <li>
                      <span
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(1);
                        }}
                      >
                        1
                      </span>
                    </li>
                    <li>
                      <span
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(2);
                        }}
                      >
                        2
                      </span>
                    </li>
                    <li>
                      <span
                        href="#"
                        aria-current="page"
                        className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(3);
                        }}
                      >
                        3
                      </span>
                    </li>
                    <li>
                      <span
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(4);
                        }}
                      >
                        4
                      </span>
                    </li>
                    <li>
                      <span
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(5);
                        }}
                      >
                        5
                      </span>
                    </li>
                    <li>
                      <span
                        href="#"
                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page + 1);
                        }}
                        disable={total > allproducts.length}
                      >
                        Next
                      </span>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Homepage;
