import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="list-group">
      <h3>User Pannel</h3>
      <NavLink
        to="/dashboard/user/Orders"
        className="list-group-item list-group-item-action  p-3"
        style={{ borderBottom: "2px solid black" }}
      >
        Product Category
      </NavLink>
      <NavLink
        to="/dashboard/user/profile"
        className="list-group-item list-group-item-action  p-3"
        style={{ borderBottom: "2px solid black" }}
      >
        Create Product
      </NavLink>
    </div>
  );
};

export default UserMenu;
