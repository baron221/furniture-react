import React, { useEffect, useState } from "react";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import {
  Box,
  Container,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import { TabPanel } from "@material-ui/lab";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { TargetArticles } from "./targetArticles";
import "../../../css/community.css";
import CommunityApiService from "../../apiServices/communityApiService";
import { Community, SearchArticlesObj } from "../../../types/Communtiy";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

import { setTargetArticles } from "./slice";
import { retrieveTargetArticles } from "./selector";

/**REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setTargetArticles: (data: Community[]) => dispach(setTargetArticles(data)),
});

/**REDUX SELECTOR */
const TargetArticlesRetriever = createSelector(
  retrieveTargetArticles,
  (TargetArticle) => ({ TargetArticle })
);

export function CommunityPage() {
  /**INITIALIZATIONS */
  const { setTargetArticles } = actionDispatch(useDispatch());
  const { TargetArticle } = useSelector(TargetArticlesRetriever);

  const [value, setValue] = useState("1");
  const [searchArticlesObj, setSearchArticlesObj] = useState<SearchArticlesObj>(
    { bo_id: "all", page: 1, limit: 5 }
  );

  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles(searchArticlesObj)
      .then((data) => setTargetArticles(data))
      .catch((err) => console.log(err));
  }, [searchArticlesObj]);

  const handlePaginationChange = (event: any, value: number) => {
    searchArticlesObj.page = value;
    setSearchArticlesObj({ ...searchArticlesObj });
  };
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const handleChange = (event: any, newValue: string) => {
    searchArticlesObj.page = 1;
    switch (newValue) {
      case "1":
        searchArticlesObj.bo_id = "all";
        break;
      case "2":
        searchArticlesObj.bo_id = "popular";
        break;
      case "3":
        searchArticlesObj.bo_id = "celebrity";
        break;
      case "4":
        searchArticlesObj.bo_id = "story";
        break;
    }
    setSearchArticlesObj({ ...searchArticlesObj });
    setValue(newValue);
  };

  return (
    <div className="community_page">
      <div className="community_frame">
        <Container sx={{ mt: "50px", mb: "50px" }}>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Stack
              className="community_all_frame"
              inputMode="text"
              style={{ border: "1px solid #fff" }}
            >
              <TabContext value={value}>
                <Box className="article_tabs">
                  <Box sx={{ fontFamily: "Space Grotesk" }}>
                    <TabList
                      value={value}
                      style={{ borderColor: "blue" }}
                      onChange={handleChange}
                    >
                      <Tab label="ALL ARTICLES" value={"1"} />
                      <Tab label="MARKET EVALUATION" value={"2"} />
                      <Tab label="PRODUCT REVIEW" value={"3"} />
                      <Tab label="STORIES" value={"4"} />
                    </TabList>
                  </Box>
                </Box>

                <Box className="articel_main">
                  <TabPanel value="1">
                    <TargetArticles
                      targetBoArticles={TargetArticle}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="2">
                    <TargetArticles
                      targetBoArticles={TargetArticle}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="3">
                    <TargetArticles
                      targetBoArticles={TargetArticle}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="4">
                    <TargetArticles
                      targetBoArticles={TargetArticle}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                </Box>

                <Box className="article_bott">
                  <Pagination
                    count={3}
                    page={1}
                    renderItem={(item) => (
                      <PaginationItem
                        components={{ previous: ArrowBack, next: ArrowForward }}
                        {...item}
                        color="secondary"
                      />
                    )}
                    onChange={handlePaginationChange}
                  />
                </Box>
              </TabContext>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
