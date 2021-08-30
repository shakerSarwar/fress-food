import React, { useContext } from "react";
import { userContext } from "../../App";
import "./LogInUserDetails.css";

const LogInUserDetails = () => {
  const [logedInUser, setLogedInUser] = useContext(userContext);

  return (
    <article className="border col-12 col-md-9 col-lg-8 mt-5 rounded mx-auto d-flex flex-column user-details justify-content-center align-items-center pb-5">
      <img
        // src={logedInUser.photoURL || imageLink}
        src={logedInUser.photoURL || "https://i.ibb.co/JqYKzYK/avatar.jpg"}
        className="my-5 user-image"
        alt="Image"
      />
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>: </td>
            <td>{logedInUser.displayName}</td>
          </tr>
          <tr>
            <td>email</td>
            <td>:</td>
            <td>{logedInUser.email}</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
};

export default LogInUserDetails;
