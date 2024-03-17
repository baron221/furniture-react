import { Community } from "./Communtiy";
import { Product } from "./product";
import { Market } from "./user";

export interface AppRootState {
    homePage:HomePageState;
  
}

export interface HomePageState{
    peakMarkets:Market[];
    bestMarkets:Market[];
    trendProducts:Product[];
    bestBoArticles:Community[];
    trendBoArticles:Community[];
    newsBoArticle:Community[];
}