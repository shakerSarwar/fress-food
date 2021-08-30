import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import SideMenu from "../SideMenu/SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "./ManageProduct.css";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const ManageProduct = () => {
  const [spinner, setSpinner] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    setSpinner(true);
    fetch("https://cherry-shortcake-72062.herokuapp.com/allProduct")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setSpinner(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handelDeletProduct = (productId) => {
    fetch(
      `https://cherry-shortcake-72062.herokuapp.com/deletProduct/${productId}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => fetchProducts());
  };
  if (spinner) {
    return <Spinner />;
  }

  return (
    <section className="container maneg-product-container">
      <div className="row">
        <SideMenu />
        <div className="col-sm-9">
          <h4 className="mb-3 mt-4">Manage Product</h4>

          {products.length > 0 ? (
            <Table bordered hover className="maneg-product-table mb-4">
              <thead className="border-bottom">
                <tr>
                  <th>Product Name</th>
                  <th>Wight</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.wight}</td>
                    <td>${product.price}</td>
                    <td>
                      <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => handelDeletProduct(product._id)}
                        className="delet-icon"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <article className="mt-4">
              <h3>No Product Found ! Please add some product</h3>
              <Button
                as={Link}
                to="/addProduct"
                variant="primary"
                className="mt-3"
                type="button"
              >
                Add Product
              </Button>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};

export default ManageProduct;
