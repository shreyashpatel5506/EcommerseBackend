import React, { useState, useEffect } from "react";
import Layout from "../component/layout/Layout";
import { useAuth } from "../Context/auth";
import axios from "axios";
import { Checkbox } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Category from "../component/layout/category";
import { useCart } from "../Context/Cart";

const Homepage = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [allproducts, setAllproducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

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
        <Category />
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
                  allproducts.map((p) => {
                    const productQuantity = quantities[p._id] || 1; // Default to 1 if not set

                    return (
                      <div
                        className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4"
                        key={p._id}
                      >
                        <Link
                          to={`/singleProduct/${p.slug}`}
                          className="text-dark"
                          style={{ textDecorationLine: "none", width: "100%" }}
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
                                  {/* Rating SVG Icons */}
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

                              <form className="max-w-xs mx-auto">
                                <div className="relative flex items-center max-w-[8rem]">
                                  <button
                                    type="button"
                                    id="decrement-button"
                                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleQuantityChange(
                                        p._id,
                                        Math.max(1, productQuantity - 1)
                                      );
                                    }}
                                    disabled={productQuantity === 1}
                                  >
                                    <svg
                                      className="w-3 h-3 text-gray-900 dark:text-white"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 2"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M1 1h16"
                                      />
                                    </svg>
                                  </button>
                                  <input
                                    type="text"
                                    id="quantity-input"
                                    className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={productQuantity}
                                    onChange={(e) => {
                                      e.preventDefault();
                                      handleQuantityChange(
                                        p._id,
                                        parseInt(e.target.value, 10) || 1
                                      );
                                    }}
                                    required
                                  />
                                  <button
                                    type="button"
                                    id="increment-button"
                                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleQuantityChange(
                                        p._id,
                                        productQuantity + 1
                                      );
                                    }}
                                  >
                                    <svg
                                      className="w-3 h-3 text-gray-900 dark:text-white"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 1v16M1 9h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </form>

                              <button
                                type="button"
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 mt-1"
                                style={{ width: "100%" }}
                                onClick={() => {
                                  if (auth?.token) {
                                    const isProductInCart = cart.some(
                                      (item) => item._id === p._id
                                    );
                                    if (isProductInCart) {
                                      toast.error(
                                        "Product is already in the cart"
                                      );
                                    } else {
                                      setCart([
                                        ...cart,
                                        { ...p, quantity: productQuantity },
                                      ]);
                                    }
                                  } else {
                                    navigate("/login"); // Redirect to login if not authenticated
                                  }
                                }}
                                disabled={!auth?.token}
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
                        </Link>
                      </div>
                    );
                  })}
              </div>
              <div className="text-center">Total Products: {total}</div>
              <div
                className="m-2 p-3"
                style={{ width: "100%", cursor: "pointer" }}
              >
                <nav aria-label="Page navigation example">
                  <div
                    className="inline-flex mt-2 xs:mt-0"
                    style={{ justifyContent: "between", width: "100%" }}
                  >
                    <button
                      className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page - 1);
                      }}
                      disabled={page === 1}
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
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
                      disabled={total <= allproducts.length}
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </button>
                  </div>
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
