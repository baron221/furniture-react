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
import { setPeakMarkets, BestMarkets } from "../../screens/HomePage/slice";
import {  retrievePeakMarkets } from "../../screens/HomePage/selector";
import { Market } from "../../../types/user";

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
  const { PeakMarkets } = useSelector(PeakMarketsRetriever);

  useEffect(() => {
  
    setPeakMarkets([]);
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
