import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "./AdminMenu";
import Layout from "../../component/layout/Layout";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [allproducts, setAllproducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5020/api/product/get-Products"
      );
      console.log("Fetched products:", data);
      if (data.success) {
        setAllproducts(data.getProducts);
        //console.log(products.length);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <Layout>
        <div className="container-fluid m-3 p-3 mx-0">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1 className="text-center">Products</h1>

              <div className="row">
                {Array.isArray(allproducts) &&
                  allproducts.map((p) => (
                    <div
                      className="col-12 col-sm-6 col-md-4 d-flex justify-content-center mb-4"
                      key={p._id}
                    >
                      <Link
                        to={`/dashboard/admin/Product/${p.slug}`}
                        className="text-dark"
                        style={{ textDecorationLine: "none" }}
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
                      </Link>
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

export default AllProducts;
