import { TargetArticles } from "../app/screens/CommunityPage/targetArticles";
import { Community } from "./Communtiy";
import { Follower, Following } from "./follow";
import { Order } from "./order";
import { Product } from "./product";
import { Market, Member } from "./user";

export interface AppRootState {
    homePage:HomePageState;
    shopPage:ShopPageState;
    ordersPage:OrdersPageState;
    communityPage:CommunityPageState;
    memberPage:MemberPageState
}

/**HOMEPAGE */

export interface HomePageState{
    peakMarkets:Market[];
    bestMarkets:Market[];
    trendProducts:Product[];
    bestBoArticles:Community[];
    trendBoArticles:Community[];
    newsBoArticle:Community[];
}

/**SHOP PAGE */

export interface ShopPageState{
    targetShops:Market[];
    randomShops:Market[];
    chosenShops:Market|null;
    targetProducts:Product[];
    chosenProduct:Product | null;
}
/*ORDERS PAGE */
export interface OrdersPageState {
    pausedOrders:Order[];
    processOrders:Order[],
    finishedOrders:Order[]
} 

/*COMMUNITY PAGE*/

export interface CommunityPageState{
    TargetArticle:Community[];

}
export interface MemberPageState{
    chosenMember:Member | null;
    chosenMemberBoArticles :Community[];
    chosenSingleBoArticle:Community | null;
    memberFollowers :Follower[];
    memberFollowings : Following[]
}