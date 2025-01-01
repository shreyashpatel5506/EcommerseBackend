import React from "react";
import Layout from "../component/layout/Layout";

const About = () => {
  return (
    <div>
      <Layout
        title={"About Us- Ecommerse"}
        description={"About Ecommerse"}
        author={"Shreyash"}
        keywords={"Ecommerse, About"}
      >
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6">
              <h2>About Us</h2>
              <p>
                Welcome to our website! We are a passionate team committed to
                providing the best experience for our users. Our goal is to
                build innovative solutions and offer services that help
                individuals and businesses thrive. Whether you're looking for
                quality products or reliable services, we aim to exceed your
                expectations every step of the way.
              </p>
              <p>
                We believe in transparency, user-centered design, and continuous
                improvement. Our team works tirelessly to deliver top-notch
                products and ensure your satisfaction.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src="/assests/About.jpg"
                alt="About Us"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default About;
