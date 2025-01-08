import React from "react";
import Layout from "../../component/layout/Layout";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../Context/auth";

const AdminDashboard = () => {
  const auth = useAuth();
  console.log(auth?.user?.name);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 mx-0">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 w-75">
            <div className="card">
              <h3>Admin Name:--{auth?.name}</h3>
              <h3>Admin Email:--{auth?.user?.email}</h3>
              <h3>Admin Concat:--{auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
