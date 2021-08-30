import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Component/Home/Home";
import Admin from "./Component/Admin/Admin";
import AddProduct from "./Component/AddProduct/AddProduct";
import ManageProduct from "./Component/ManageProduct/ManageProduct";
import EditProduct from "./Component/EditProduct/EditProduct";
import LogIn from "./Component/LogIn/LogIn";
import { createContext, Profiler, useState } from "react";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import Profile from "./Component/Profile/Profile";
import NoMatch from "./Component/NoMatch/NoMatch";
import CheckOut from "./Component/CheckOut/CheckOut";
import Order from "./Component/Order/Order";
import Deals from "./Component/Deals/Deals";
export const userContext = createContext();

function App() {
  const [logedInUser, setLogedInUser] = useState({});
  return (
    <userContext.Provider value={[logedInUser, setLogedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/deals">
            <Deals />
          </Route>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <Route path="/logIn">
            <LogIn />
          </Route>
          <PrivateRoute path="/order">
            <Order />
          </PrivateRoute>
          <PrivateRoute path="/product/:id">
            <CheckOut />
          </PrivateRoute>
          <PrivateRoute path="/managProduct">
            <ManageProduct />
          </PrivateRoute>
          <PrivateRoute path="/addProduct">
            <AddProduct />
          </PrivateRoute>
          <PrivateRoute path="/editProduct">
            <EditProduct />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
