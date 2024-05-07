import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../types/screen";
import { CommunityPage } from ".";

const selectCommunityPage = (state:AppRootState) => state.communityPage;
export const retrieveTargetArticles = createSelector(
    selectCommunityPage,
    (CommunityPage) => CommunityPage.TargetArticle
)