import React from "react";
import Layout from "../component/layout/Layout";
import { useAuth } from "../Context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"} description={"Dashboard"}>
      <div className="container-flui m-3 p-3">
        <div className="row">
          <div className="col-md-3"> </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{auth?.user?.name}</h3>
              <h3>{auth?.user?.email}</h3>
              <h3>{auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
