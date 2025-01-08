import React from "react";
import Layout from "../../component/layout/Layout";
import UserMenu from "./UserMenu";

const Order = () => {
  return (
    <div>
      <Layout>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h3>Order</h3>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Order;
