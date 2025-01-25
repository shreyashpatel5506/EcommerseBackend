import React, { useState, useEffect } from "react";
import Layout from "../component/layout/Layout";
import axios from "axios";
import { Checkbox, Slider } from "antd";
import { useSearch } from "../Context/search";

const SearhProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 250000]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [values, setValues] = useSearch();
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
                      className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4"
                      key={p._id}
                    >
                      <div className="product-card">
                        <img
                          className="product-image"
                          src={`http://localhost:5020/api/product/get-ProductPhoto/${p._id}`}
                          alt={p.name}
                        />
                        <div className="product-info">
                          <h5>{p.name}</h5>
                          <p>{p.description.substring(0, 50)}...</p>
                          <div className="product-price">{p.price}₹</div>
                          <button className="add-to-cart">Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="text-center">Total Products: {total}</div>
              <div className="pagination-controls">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Prev
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === Math.ceil(total / 6)}
                >
                  Next
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
