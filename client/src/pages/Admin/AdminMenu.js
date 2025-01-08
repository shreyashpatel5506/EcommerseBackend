import React from "react";
import { NavLink } from "react-router-dom";

const AdinMenu = () => {
  return (
    <div className="list-group">
      <h3>Admin Pannel</h3>
      <NavLink
        to="/dashboard/admin/create-category"
        className="list-group-item list-group-item-action  p-3"
        style={{ borderBottom: "2px solid black" }}
      >
        Product Category
      </NavLink>
      <NavLink
        to="/dashboard/admin/create-product"
        className="list-group-item list-group-item-action  p-3"
        style={{ borderBottom: "2px solid black" }}
      >
        Create Product
      </NavLink>
      <NavLink
        to="/dashboard/admin/users"
        className="list-group-item list-group-item-action  p-3"
        style={{ borderBottom: "2px solid black" }}
      >
        User
      </NavLink>
    </div>
  );
};

export default AdinMenu;
