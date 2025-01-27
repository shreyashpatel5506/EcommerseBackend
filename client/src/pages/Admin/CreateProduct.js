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
  const [MainImage, setMainImage] = useState("");
  const [thubnailimage1, setThubnailimage1] = useState("");
  const [thubnailimage2, setThubnailimage2] = useState("");
  const [thubnailimage3, setThubnailimage3] = useState("");
  const [thubnailimage4, setThubnailimage4] = useState("");
  const [thubnailimage5, setThubnailimage5] = useState("");
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
      productData.append("MainImage", MainImage);
      productData.append("thubnailimage4", thubnailimage4);
      productData.append("thubnailimage5", thubnailimage5);
      productData.append("thubnailimage3", thubnailimage3);
      productData.append("thubnailimage2", thubnailimage2);
      productData.append("thubnailimage1", thubnailimage1);
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
                  {MainImage ? MainImage.name : "Upload MainImage"}
                  <input
                    type="file"
                    name="MainImage"
                    accept="image/*"
                    onChange={(e) => setMainImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {MainImage && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(MainImage)}
                      alt="product_MainImage"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {thubnailimage1
                    ? thubnailimage1.name
                    : "Upload thubnailImage1"}
                  <input
                    type="file"
                    name="thubnaillmage1"
                    accept="image/*"
                    onChange={(e) => setThubnailimage1(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {thubnailimage1 && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(thubnailimage1)}
                      alt="product_MainImage"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {thubnailimage2
                    ? thubnailimage2.name
                    : "Upload thubnailimage2"}
                  <input
                    type="file"
                    name="thubnaillmage2"
                    accept="image/*"
                    onChange={(e) => setThubnailimage2(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {thubnailimage2 && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(thubnailimage2)}
                      alt="product_MainImage"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {thubnailimage3
                    ? thubnailimage3.name
                    : "Upload thubnailimage3"}
                  <input
                    type="file"
                    name="thubnaillmage3"
                    accept="image/*"
                    onChange={(e) => setThubnailimage3(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {thubnailimage3 && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(thubnailimage3)}
                      alt="product_MainImage"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {thubnailimage4
                    ? thubnailimage4.name
                    : "Upload thubnailimage4"}
                  <input
                    type="file"
                    name="thubnaillmage4"
                    accept="image/*"
                    onChange={(e) => setThubnailimage4(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {thubnailimage4 && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(thubnailimage4)}
                      alt="product_MainImage"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {thubnailimage5
                    ? thubnailimage5.name
                    : "Upload thubnailimage5"}
                  <input
                    type="file"
                    name="thubnaillmage5"
                    accept="image/*"
                    onChange={(e) => setThubnailimage5(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {thubnailimage5 && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(thubnailimage5)}
                      alt="product_MainImage"
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
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleCreate}
                >
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
