import React from "react";
import {  Switch, Route, useRouteMatch } from "react-router-dom";
import "../../../css/shop.css"
import { AllShop } from "./allShop";
import { ChosenShop } from "./chosenShop";
import { ChosenProduct } from "./chosenProduct";


export function ShopPage(props: any) {
  let shop = useRouteMatch();
  console.log(shop);
  return (
    <div className="shop_page">
      <Switch>
        <Route path={`${shop.path}/product/:product_id`}><ChosenProduct/></Route>
        <Route path={`${shop.path}/:shop_id`}><ChosenShop/></Route>
        <Route path={`${shop.path}`}><AllShop/></Route>
      </Switch>
    </div>
  );
}
