import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { userContext } from "../../App";
import LogInUserDetails from "../LogInUserDetails/LogInUserDetails";
import firebase from "firebase/app";

const Profile = () => {
  const [logedInUser, setLogedInUser] = useContext(userContext);

  const handelLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const singOutUser = {
          email: "",
          displayName: "",
          photoURL: "",
        };
        setLogedInUser(singOutUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="container profile-section">
      <div>
        <LogInUserDetails />
        <Button
          className="d-block mx-auto mt-4"
          variant="primary"
          onClick={handelLogOut}
        >
          Log Out
        </Button>
      </div>
    </section>
  );
};

export default Profile;
