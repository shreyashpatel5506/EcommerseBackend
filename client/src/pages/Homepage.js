import React, { useState, useEffect } from "react";
import Layout from "../component/layout/Layout";
import { useAuth } from "../Context/auth";
import axios from "axios";

const Homepage = () => {
  const [auth, setAuth] = useAuth();
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
      <Layout title={"Best Offer - Ecommerse"} description={"Homepage"}>
        <div className="container-fluid m-3 p-3 mx-0">
          <div className="row">
            <div className="col-md-3"></div>
          </div>
          <div className="col-md-9">
            <h5 className="text-center">All Products</h5>
            {Array.isArray(allproducts) &&
              allproducts.map((p, index) => (
                <div className="col-md-4 d-flex justify-content-center mb-4">
                  <div className="card" key={p._id} style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:5020/api/product/get-ProductPhoto/${p._id}`}
                      className="card-img-top"
                      alt={p.name || "Product"}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text">{p.price}₹</p>
                      {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Homepage;
