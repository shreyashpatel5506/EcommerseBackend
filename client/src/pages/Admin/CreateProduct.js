import React, { useState, useEffect } from "react";
import Layout from "./../../component/layout/Layout";
import AdminMenu from "./../../pages/Admin/AdminMenu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [shipping, setShipping] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [auth] = useAuth();

  //get all category
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

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("stock", stock);
      productData.append("imageUrl", imageUrl);
      productData.append("category", category);
      const { data } = await axios.post(
        "http://localhost:5020/api/product/Create-Product",
        productData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/allproducts");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {imageUrl ? imageUrl.name : "Upload imageUrl"}
                  <input
                    type="file"
                    name="imageUrl"
                    accept="image/*"
                    onChange={(e) => setImageUrl(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {imageUrl && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(imageUrl)}
                      alt="product_imageUrl"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={stock}
                  placeholder="Write a stock"
                  className="form-control"
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
