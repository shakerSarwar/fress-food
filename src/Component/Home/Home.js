import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Products from "../Products/Products";
import Spinner from "../Spinner/Spinner";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    setSpinner(true);
    fetch("https://cherry-shortcake-72062.herokuapp.com/allProduct")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setSpinner(false);
      });
  }, []);
  //spinar
  if (spinner) {
    return <Spinner />;
  }

  return (
    <main className="container main-area">
      <section className="serach-area row justify-content-center p-5">
        <Form className="col-12 col-sm-8 col-lg-6  d-flex align-items-center justify-content-center">
          <Form.Control
            type="text"
            placeholder="Search Here"
            className="search-box"
          />
          <Button variant="primary" type="button">
            Search
          </Button>
        </Form>
      </section>
      <section>
        {products.length > 0 ? (
          <article className="row">
            {products.map((product) => (
              <Products key={product._id} product={product} />
            ))}
          </article>
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
      </section>
    </main>
  );
};

export default Home;
