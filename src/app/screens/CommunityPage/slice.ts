import { createSlice } from "@reduxjs/toolkit";
import { CommunityPageState } from "../../../types/screen";
import { setTrendBoArticles } from "../HomePage/slice";

const initialState:CommunityPageState = {
    TargetArticles:[],
};

const communityPageSlice = createSlice({
    name:"communityPage",
    initialState,
    reducers:{
        setTargetArticles : (state,action) =>{
            state.TargetArticles = action.payload;
        }
    }
});

export const {} = communityPageSlice.actions;

const communityPageReducer = communityPageSlice.reducer;
export default communityPageReducer