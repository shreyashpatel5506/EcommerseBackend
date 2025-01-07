import React from "react";

import AdinMenu from "./AdinMenu";
import Layout from "../../component/layout/Layout";

const AllUser = () => {
  return (
    <div>
      <Layout>
        <div className="row">
          <div className="col-md-3">
            <AdinMenu />
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
