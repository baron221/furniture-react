import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import homePageReducer from './screens/HomePage/slice';
import reduxLogger from "redux-logger"
import ShopPageReducer from './screens/ShopPage/slice';
import OrdersPageReducer from './screens/OrdersPage/slice';
import communityPageReducer from './screens/CommunityPage/slice';
import MemberPageReducer from './screens/LoginPage/slice';


export const store = configureStore({
middleware:(getDefaultMiddleware) =>
  getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage:homePageReducer,
    shopPage:ShopPageReducer,
    ordersPage:OrdersPageReducer,
    communityPage:communityPageReducer,
    memberPage:MemberPageReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
