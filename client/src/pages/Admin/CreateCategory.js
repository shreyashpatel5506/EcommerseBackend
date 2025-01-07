import React from "react";
import AdinMenu from "./AdinMenu";
import Layout from "../../component/layout/Layout";

const CreateCategory = () => {
  return (
    <div>
      <Layout>
        <div className="row">
          <div className="col-md-3">
            <AdinMenu />
          </div>
          <div className="col-md-9">
            <h2>Crate Category</h2>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CreateCategory;
