import React, { useState } from "react";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";


import { Box, Container, Stack, Typography } from "@mui/material";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ContactPage } from "./screens/ContactPage";
import { ShopPage } from "./screens/ShopPage";
import { ProductPage } from "./screens/ProductPage";
import { HomePage } from "./screens/HomePage";
import { NavbarHome } from "./components/Header";
import { NavbarShop } from "./components/Header/shop";
import { NavbarOthers } from "./components/Header/others";
import { Footer } from "./components/footer";

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
      <Footer/>
    </Router>
  );
}

export default App;
