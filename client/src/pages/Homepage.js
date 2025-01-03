import React from "react";
import Layout from "../component/layout/Layout";
import { useAuth } from "../Context/auth";

const Homepage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <Layout title={"Best Offer - Ecommerse"} description={"Homepage"}>
        <h1>Homepage</h1>
      </Layout>
    </div>
  );
};

export default Homepage;
