import React from "react";
import NotFound from "../components/NotFound";
import Navbar from "../components/Navbar";

const NotFoundPage = () => {
  return (
    <div className="notFoundPage">
      <Navbar />
      <br />
      <br />
      <h1>Oops! Page Not Found</h1>
      <NotFound />
    </div>
  );
};

export default NotFoundPage;
