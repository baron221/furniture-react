import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectHomePage = (state:AppRootState) => state.homePage;
export const retrievePeakMarkets = createSelector(
    selectHomePage,
    (HomePage) => HomePage.peakMarkets
);

export const retrieveBestMarkets = createSelector(
    selectHomePage,
    (HomePage) => HomePage.bestMarkets
);

export const retrieveTrendProducts = createSelector(
    selectHomePage,
    (HomePage) => HomePage.trendProducts
);

export const retrieveBestBoArticles = createSelector(
    selectHomePage,
    (HomePage) => HomePage.bestBoArticles
);


export const retrieveTrendBoArticles = createSelector(
    selectHomePage,
    (HomePage) => HomePage.trendBoArticles
);


export const retrieveNewsArticles= createSelector(
    selectHomePage,
    (HomePage) => HomePage.newsBoArticle
);
