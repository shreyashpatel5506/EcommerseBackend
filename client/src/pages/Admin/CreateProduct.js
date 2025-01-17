import React from "react";
import Layout from "../../component/layout/Layout";
import AdminMenu from "./AdminMenu";

const CreateProduct = () => {
  return (
    <div>
      <Layout>
        <div className="container-fluid m-3 p-3 mx-0">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h2>Create Product</h2>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CreateProduct;
