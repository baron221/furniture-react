import React, { useEffect, useState } from "react";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/home.css";
import "../app/apiServices/verify"

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
import { Member } from "../types/user";
import { serviceApi } from "../lib/config";
import { sweetFailureProvider, sweetTopSmallSuccessAlert } from "../lib/sweetAlert";
import { Definer } from "../lib/Definer";
import  assert  from "assert";
import MemberApiService from "./apiServices/memberApiServices";

function App() {
  /** INITIALIZATION **/
  const [verifiedMemberData, setVerifiedMemberData] = useState<Member | null>(
    null
  );
  const [path, setPath] = useState();
  const main_path = window.location.pathname;
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    console.log("=== useEffect:App===");
    const memberDataJson: any = localStorage.getItem("member_data")
      ? localStorage.getItem("member_data")
      : null;
    const member_data = memberDataJson ? JSON.parse(memberDataJson) : null;
    if (member_data) {
      member_data.mb_image = member_data.mb_image
        ? `${serviceApi}/${member_data.mb_image}`
        : "/auth/default_user.svg";
      setVerifiedMemberData(member_data);
    }
  }, [signUpOpen, loginOpen]);
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
  const handleLogOutClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLogOut = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const handleLogoutRequest = async() =>{
    try{
      const memberApiService =new MemberApiService();
      await memberApiService.logOutRequest();
      await sweetTopSmallSuccessAlert('Success' ,700 , true)
    }catch(err:any){
      console.log(err)
    sweetFailureProvider(Definer.general_err2)
    }
  }

  return (
    <Router>
      {main_path == "/" ? 
        <NavbarHome
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
          verifiedMemberData={verifiedMemberData}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogoutRequest={handleLogoutRequest}
          anchorEl={anchorEl}
          open={open}
        />
       : main_path.includes("/shop") ? 
        <NavbarShop
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
          verifiedMemberData={verifiedMemberData}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogoutRequest={handleLogoutRequest}

          anchorEl={anchorEl}
          open={open}
        />
       : 
        <NavbarOthers
          setPath={setPath}
          handleLoginOpen={handleLoginOpen}
          handleSignUpOpen={handleSignUpOpen}
          verifiedMemberData={verifiedMemberData}
          handleLogOutClick={handleLogOutClick}
          handleCloseLogOut={handleCloseLogOut}
          handleLogoutRequest={handleLogoutRequest}

          anchorEl={anchorEl}
          open={open}
        />
      }

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
