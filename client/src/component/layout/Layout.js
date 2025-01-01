import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Helmet from "react-helmet";

const Layout = ({ children, title, description, author, keywords }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content={description || "E-commerse website"}
        />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <Header />
      <main style={{ minHeight: "71.5vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "E-commerse",
  description: "E-commerse website",
  author: "Shreyash",
  keywords: "E-commerse",
};

export default Layout;
