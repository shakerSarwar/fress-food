import React from "react";
import { Link } from "react-router-dom";
import "./SideMenu.css";

const SideMenu = () => {
  return (
    <aside className="col-sm-3 rounded p-0 pt-5">
      <Link to="/managProduct" className=" pl-5">
        Manage Product
      </Link>
      <Link to="/addProduct" className=" pl-5">
        Add Product
      </Link>
      <Link to="/editProduct" className=" pl-5">
        Edit Product
      </Link>
    </aside>
  );
};

export default SideMenu;
