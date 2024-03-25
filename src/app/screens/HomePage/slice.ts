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

    setTrendProducts: (state, action) => {
      state.trendProducts = action.payload;
    },
    setbestboArticles: (state, action) => {
      state.bestBoArticles = action.payload;
    },
    setNewsBoArticle: (state, action) => {
      state.newsBoArticle = action.payload;
    },
    setTrendBoArticles: (state, action) => {
      state.trendBoArticles = action.payload;
    },
  },
});

export const {
  setPeakMarkets,
  setTrendProducts,
  setbestboArticles,
  setNewsBoArticle,
  setTrendBoArticles,
} = homePageSlice.actions;

const homePageReducer = homePageSlice.reducer;
export default homePageReducer

