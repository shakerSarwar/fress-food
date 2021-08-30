import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router";
import "./Product.css";

const Products = (props) => {
  const { _id, imageURL, name, wight, price } = props.product;
  const history = useHistory();

  return (
    <div className="col-md-4 col-sm-6 col-12 d-sm-flex">
      <Card className="mb-4">
        <Card.Img variant="top" src={imageURL} className="card-image" />
        <Card.Body>
          <Card.Title>
            {name} {wight && ` - ${wight}`}
          </Card.Title>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <Card.Text className="font-weight-bold">${price}</Card.Text>
          <Button
            variant="primary"
            onClick={() => history.push(`/product/${_id}`)}
          >
            Buy Now
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Products;
