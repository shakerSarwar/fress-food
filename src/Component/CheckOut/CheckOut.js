import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { userContext } from "../../App";
import Spinner from "../Spinner/Spinner";
const CheckOut = () => {
  const { id } = useParams();
  const checkOutHistory = useHistory();
  const [spinner, setSpinner] = useState(false);
  const [product, setProduct] = useState({});
  const [logedInUser, setLogedInUser] = useContext(userContext);

  useEffect(() => {
    setSpinner(true);
    fetch("https://cherry-shortcake-72062.herokuapp.com/product/" + id)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSpinner(false);
      });
  }, [id]);

  if (spinner) {
    return <Spinner />;
  }

  const handelCheckOut = () => {
    const orderDetails = {
      orderBy: logedInUser.displayName,
      orderOwnerEmail: logedInUser.email,
      productName: product.name,
      placeDate: new Date().toLocaleDateString(),
      quantity: 1,
      wight: product.wight,
      price: product.price,
    };

    fetch("https://cherry-shortcake-72062.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          checkOutHistory.push("/order");
        }
      });
  };

  return (
    <section className="container px-5 check-out-section">
      <article>
        <h2 className="mt-5">CheckOut</h2>

        <div className="row d-flex justify-content-center align-items-center mt-5">
          <div className="col-md-4">
            <img src={product.imageURL} className="w-100" alt={product.name} />
          </div>
          <div className="col-md-7 py-5 py-md-0">
            <h4>Name: {product.name}</h4>
            <div className="my-4 d-flex  justify-content-between align-items-center">
              <h5>Wight: {product.wight}</h5>
              <h5>Quantity: 1</h5>
            </div>

            <div className="d-flex  justify-content-between align-items-center">
              <h5>Price: {product.price}</h5>
              <h5>Total: {product.price}</h5>
            </div>
            <Button
              variant="success"
              className="ml-auto mt-4 d-block"
              onClick={handelCheckOut}
            >
              Checkout
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default CheckOut;
