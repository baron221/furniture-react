import { createSlice } from "@reduxjs/toolkit";
import { ShopPageState } from "../../../types/screen";

const initialState:ShopPageState = {
    targetShops:[],
    randomShops:[],
    chosenShops:null,
    targetProducts:[],
    chosenProduct: null
}

const shopPageSlice = createSlice({
    name: 'shopPage',
    initialState,
    reducers:{
        setTargetShops:(state,action) => {
            state.targetShops = action.payload;
        },
        setRandomShops:(state,action) => {
            state.randomShops = action.payload;
        },
        setChosenShops:(state,action) => {
            state.chosenShops = action.payload;
        },
        setTargetProducts:(state,action) => {
            state.targetProducts = action.payload;
        },
        setChosenProduct :(State,action) => {
            State.chosenProduct =action.payload;
        }
    }
});

export const {
    setTargetShops,setRandomShops,setChosenShops,setTargetProducts,setChosenProduct
} = shopPageSlice.actions;

const ShopPageReducer = shopPageSlice.reducer;
export default ShopPageReducer;
