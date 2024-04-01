import React, { useState } from "react";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/home.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CommunityPage } from "./screens/CommunityPage";
import { ShopPage } from "./screens/ShopPage";
import { ProductPage } from "./screens/ProductPage";
import { HomePage } from "./screens/HomePage";
import { NavbarHome } from "./components/Header";
import { NavbarShop } from "./components/Header/shop";
import { NavbarOthers } from "./components/Header/others";
import { Footer } from "./components/footer";
import { LoginPage } from "./screens/LoginPage";
import { OrdersPage } from "./screens/OrdersPage";
import AuthenticationModal from "./components/auth";

function App() {
  /** INITIALIZATION **/
  const [path, setPath] = useState();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  /**HANDLERS */

  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };

  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <Router>
      {main_path == "/" ? (
        <NavbarHome
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
        />
      ) : main_path.includes("/shop") ? (
        <NavbarShop setPath={setPath} 
        handleLoginOpen={handleLoginOpen}
        handleSignUpOpen={handleSignUpOpen}/>
      ) : (
        <NavbarOthers setPath={setPath} 
        handleLoginOpen={handleLoginOpen}
        handleSignUpOpen={handleSignUpOpen}/>
      )}

      <Switch>
        <Route path="/account">
          <LoginPage />
        </Route>
        <Route path="/community">
          <CommunityPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
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
      <Footer />
      <AuthenticationModal
        loginOpen={loginOpen}
        signUpOpen={signUpOpen}
        handleLoginOpen={handleLoginOpen}
        handleLoginClose={handleLoginClose}
        handleSignUpOpen={handleSignUpOpen}
        handleSignUpClose={handleSignUpClose}
      />
    </Router>
  );
}

export default App;
