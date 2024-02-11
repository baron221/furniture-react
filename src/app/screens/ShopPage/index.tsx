import { Badge, Box, Container, IconButton, Stack } from "@mui/material";
import React from "react";
import { NavLink, Switch,Route, useRouteMatch } from "react-router-dom";

export function ShopPage(props: any) {
    let shop = useRouteMatch();
    console.log(shop)
  return (
   <div className="shop_page">
    <Switch>
        <Route path={`${shop.path}/product/:product_id`}>Chosen Product</Route>
        <Route path={`${shop.path}/:shop_id`}>Chosen Shop</Route>
        <Route path={`${shop.path}`}>All Shop</Route>
    </Switch>
   </div>
    
  );
}
