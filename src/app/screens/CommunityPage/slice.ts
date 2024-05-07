import { createSlice } from "@reduxjs/toolkit";
import { CommunityPageState } from "../../../types/screen";
import { setTrendBoArticles } from "../HomePage/slice";

const initialState:CommunityPageState = {
    TargetArticle:[],
};

const communityPageSlice = createSlice({
    name:"communityPage",
    initialState,
    reducers:{
        setTargetArticles : (state,action) =>{
            state.TargetArticle = action.payload;
        }
    }
});

export const {setTargetArticles} = communityPageSlice.actions;

const communityPageReducer = communityPageSlice.reducer;
export default communityPageReducer