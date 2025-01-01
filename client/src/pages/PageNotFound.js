import React from "react";
import Layout from "../component/layout/Layout";

const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found - Ecommerse"} description={"Page Not Found"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-1">404</h1>
            <h2>Page Not Found</h2>
            <p>
              We are sorry, the page you are looking for could not be found.
            </p>
          </div>
          <button
            style={{ width: "fit-content" }}
            className="btn btn-primary text-center mx-auto my-3"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
