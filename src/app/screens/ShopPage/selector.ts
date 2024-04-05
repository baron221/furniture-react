import {createSelector} from "reselect";
import { AppRootState } from "../../../types/screen";

const selectShopPage = (state:AppRootState) => state.shopPage;

export const retrieveTargetShops = createSelector(
    selectShopPage,
    (ShopPage) => ShopPage.targetShops
);

export const retrieveRandomShops = createSelector(
    selectShopPage,
    (ShopPage) => ShopPage.randomShops
);

export const retrieveChosenShops = createSelector(
    selectShopPage,
    (ShopPage) => ShopPage.chosenShops
);

export const retrieveTargetProducts = createSelector(
    selectShopPage,
    (ShopPage) => ShopPage.targetProducts
);


export const retrieveChosenProducts = createSelector(
    selectShopPage,
    (ShopPage) => ShopPage.chosenProduct
);