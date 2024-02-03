import React, { useState } from "react";
import "../css/App.css";
import "../css/navbar.css";

import { Box, Container, Stack, Typography } from "@mui/material";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ContactPage } from "./screens/ContactPage";
import { ShopPage } from "./screens/ShopPage";
import { ProductPage } from "./screens/ProductPage";
import { HomePage } from "./screens/HomePage";
import { NavbarHome } from "./components/Header";
import { NavbarShop } from "./components/Header/shop";
import { NavbarOthers } from "./components/Header/others";

function App() {
  const [ path, setPath] = useState();
  const main_path = window.location.pathname;
  return (
    <Router>
      {main_path == "/" ? (
          <NavbarHome setPath={setPath}   />
      ) : main_path.includes("/shop") ? (
        <NavbarShop  setPath={setPath} />
      ) : (
        <NavbarOthers setPath={setPath}  />
)}
      {/* <div>
        <nav>
          <ul>
            <li>
              <Link to="/">HomePage</Link>
            </li>
            <li>
              <Link to="/shop">ShopPage</Link>
            </li>
            <li>
              <Link to="/product">ProductPage</Link>
            </li>
            <li>
              <Link to="/contactus">ContactPage</Link>
            </li>
          </ul>
        </nav> */}

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/contact">
          <ContactPage />
        </Route>
        <Route path="/shop">
          <ShopPage />
        </Route>
        <Route path="/product">
          <ProductPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
