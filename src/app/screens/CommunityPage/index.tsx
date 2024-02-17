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

export function CommunityPage() {
  const [value, setValue] = useState("1");

  const handlePaginationChange = (event: any, value: number) => {
    console.log(value);
  };
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const targetBoArticles = [1, 2, 3, 4];

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
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="2">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="3">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                  </TabPanel>
                  <TabPanel value="4">
                    <TargetArticles
                      targetBoArticles={targetBoArticles}
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
