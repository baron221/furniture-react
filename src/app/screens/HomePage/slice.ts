import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";
const initialState: HomePageState = {
  peakMarkets: [],
  bestMarkets: [],
  trendProducts: [],
  bestBoArticles: [],
  trendBoArticles: [],
  newsBoArticle: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPeakMarkets: (state, action) => {
      state.peakMarkets = action.payload;
    },
    BestMarkets: (state, action) => {
      state.bestMarkets = action.payload;
    },
    TrendProducts: (state, action) => {
      state.trendProducts = action.payload;
    },
    bestboArticles: (state, action) => {
      state.bestBoArticles = action.payload;
    },
    newsBoArticle: (state, action) => {
      state.newsBoArticle = action.payload;
    },
    trendBoArticles: (state, action) => {
      state.trendBoArticles = action.payload;
    },
  },
});

export const {
  setPeakMarkets,
  BestMarkets,
  TrendProducts,
  bestboArticles,
  newsBoArticle,
  trendBoArticles,
} = homePageSlice.actions;

const homePageReducer = homePageSlice.reducer;
export default homePageReducer

