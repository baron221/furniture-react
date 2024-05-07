import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { Category } from "./category";
import { NewArrival } from "./newArrival";
import { Features } from "./features";
import { Sale } from "./sale";
import { Articles } from "./articles";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPeakMarkets } from "../../screens/HomePage/slice";
import { retrievePeakMarkets } from "../../screens/HomePage/selector";
import { Market } from "../../../types/user";
import MarketApiService from "../../apiServices/marketApiServices";

/**REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setPeakMarkets: (data: Market[]) => dispach(setPeakMarkets(data)),
});

/**REDUX SELECTOR */
const PeakMarketsRetriever = createSelector(
  retrievePeakMarkets,
  (PeakMarkets) => ({ PeakMarkets })
);

export function HomePage() {
  /**INITIALIZATION*/
  const { setPeakMarkets } = actionDispatch(useDispatch());

  useEffect(() => {
    const marketService = new MarketApiService();
    marketService
      .getPeakMarkets()
      .then((data) => {
        setPeakMarkets(data);
      })
      .catch((err) => console.log(err));

    marketService
      .getMarkets({ page: 1, limit: 4, order: "mb_point" })
      .then((data) => {})
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="homepage">
      <Category />
      <NewArrival />
      <Features />
      <Sale />
      <Articles />
    </div>
  );
}
