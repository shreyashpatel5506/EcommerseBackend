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
  const [priceRange, setPriceRange] = useState([0, 25000]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5020/api/product/get-Products"
      );
      if (data.success) {
        setAllproducts(data.getProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
              <h5>Filter</h5>
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
                      <div className="card" style={{ width: "100%" }}>
                        <img
                          src={`http://localhost:5020/api/product/get-ProductPhoto/${p._id}`}
                          className="card-img-top"
                          alt={p.name || "Product"}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p.description}</p>
                          <p className="card-text">{p.price}₹</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Homepage;
