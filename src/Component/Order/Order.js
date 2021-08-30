import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import LogInUserDetails from "../LogInUserDetails/LogInUserDetails";
import Spinner from "../Spinner/Spinner";
const Order = () => {
  const [logedInUser, setLogedInUser] = useContext(userContext);
  const [spinner, setSpinner] = useState(false);
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    setSpinner(true);
    fetch(
      "https://cherry-shortcake-72062.herokuapp.com/booking?email=" +
        logedInUser.email
    )
      .then((res) => res.json())
      .then((mybookings) => {
        setMyBookings(mybookings);
        setSpinner(false);
      });
  }, []);

  if (spinner) {
    return <Spinner />;
  }
  return (
    <section className="container order-section">
      {/* Loged In User Details Start*/}
      <LogInUserDetails />
      {/* Loged In User Details End*/}
      {myBookings.length > 0 ? (
        <article className="m-5">
          <h5>Your Orders : {myBookings.length}</h5>
          <Table striped bordered hover>
            <thead className="border-bottom">
              <tr>
                <th>Product Name</th>
                <th>Wight</th>
                <th>PlaceDate</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.productName}</td>
                  <td>{booking.wight}</td>
                  <td>{booking.placeDate}</td>
                  <td>{booking.quantity}</td>
                  <td>{"$" + booking.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </article>
      ) : (
        <article className="m-5">
          <h3>You have no any order! Please order some thing</h3>
          <Button
              as={Link}
              to="/"
              variant="primary"
              className="mt-3"
              type="button"
            >
              Order Something
            </Button>
        </article>
      )}
    </section>
  );
};

export default Order;
