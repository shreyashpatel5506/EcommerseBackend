import React from "react";

import AdminMenu from "./AdminMenu";
import Layout from "../../component/layout/Layout";

const AllUser = () => {
  return (
    <div>
      <Layout>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>All users</h2>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AllUser;
