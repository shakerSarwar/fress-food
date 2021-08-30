import React, { useState } from "react";
import SideMenu from "../SideMenu/SideMenu";
import { useForm } from "react-hook-form";
import { Col, Form, Row } from "react-bootstrap";
import "./AddProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handelImageUpload = (event) => {
    const imageData = new FormData();
    imageData.set("key", "1a8a94e26eb6b67f6c478faf06f086bd");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageUrl(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    const productData = {
      imageURL: imageUrl,
      name: data.name,
      wight: data.wight,
      price: data.price,
    };

    fetch("https://cherry-shortcake-72062.herokuapp.com/addProduct", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    }).then((res) => {
      alert("Product Added Successfully");
    });
  };
  return (
    <section className="container">
      <div className="row">
        <SideMenu />
        <div className="col-sm-9 px-4">
          <h4 className="mb-3 mt-4">Add Product</h4>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  ref={register({ required: true })}
                  name="name"
                />
                {errors.name && (
                  <span className="text-danger">
                    Please Enter Your Product Name
                  </span>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Wight</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Wight"
                  ref={register({ required: true })}
                  name="wight"
                />
                {errors.wight && (
                  <span className="text-danger">
                    Please Input Your Product Wight
                  </span>
                )}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Add Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Price"
                  ref={register({ required: true })}
                  name="price"
                />
                {errors.price && (
                  <span className="text-danger">
                    Please Enter Your Product Price
                  </span>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <label htmlFor="file">Add Photo</label>
                <div className="upload-image-area">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="inputfile"
                    ref={register({ required: true })}
                    onChange={handelImageUpload}
                  />
                  {errors.file && (
                    <span className="text-danger">
                      Please Enter Your Product Price
                    </span>
                  )}
                  <label htmlFor="file" className="text-success">
                    <FontAwesomeIcon icon={faCloudUploadAlt} /> Choose a file
                  </label>
                </div>
              </Form.Group>
            </Form.Row>
            <input
              type="submit"
              className="btn btn-success ml-auto d-block mt-3"
              value="Save"
            />
          </Form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
