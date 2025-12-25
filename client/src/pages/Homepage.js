import React, { useState, useEffect } from "react";
import Layout from "../component/layout/Layout";
import { useAuth } from "../Context/auth";
import axios from "axios";
import { Checkbox, Slider } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Category from "../component/layout/category";
import { useCart } from "../Context/Cart";
import ProductCard from "./ProductCard";

const Homepage = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [allproducts, setAllproducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommersebackendshreyash.onrender.com/api/product/perpageProduct/${page}`
      );
      if (data.success) {
        setAllproducts((prevProducts) =>
          page === 1 ? data.products : [...prevProducts, ...data.products]
        );
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
        `https://ecommersebackendshreyash.onrender.com/api/product/total`
      );
      if (data.success) {
        setTotal(data.count);
      }
    } catch (error) {
      console.error("Error fetching total count:", error);
    }
  };

  const getAllcategories = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommersebackendshreyash.onrender.com/api/category/get-category"
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
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
        "https://ecommersebackendshreyash.onrender.com/api/product/filter-Product",
        { selectedCategories, price }
      );
      if (data.success) {
        setAllproducts(data.getProducts);
      }
    } catch (error) {
      console.log("Error filtering products:", error);
    }
  };

  return (
    <Layout title={"Best Offer - E-commerce"} description={"Homepage"}>
      <Category />
      <div className="container-fluid m-3 p-3 mx-0">
        <div className="row">
          <div className="col-md-3">
            <div className="d-flex flex-row justify-content-between">
              <h5>Filter</h5>
            <button
  type="button"
  className="btn-danger"
  onClick={() => window.location.reload()}
>
  Reset Filter
</button>

            </div>
            <Checkbox.Group
              options={categories.map((c) => ({ label: c.name, value: c._id }))}
              onChange={handleCategoryChange}
            />
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
          <div className="col-md-9">
            <h5 className="text-center">All Products</h5>
            <div
              className="row"
              style={{ height: "85vh", overflowY: "scroll" }}
            >
              {Array.isArray(allproducts) &&
                allproducts.map((p) => (
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
                    className="btn btn-dark"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => setPage(page + 1)}
                    disabled={total <= allproducts.length}
                  >
                    Next
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
