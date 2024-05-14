import Tab from "@mui/material/Tab";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Box, Button, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YoutubeIcon from "@mui/icons-material/YouTube";
import TViewer from "../../components/tuiEditor/Tviewer";
import { MemberPosts } from "./MemberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";


/*REDUX*/
import { Member } from "../../../types/user";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticle,
} from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { Community } from "../../../types/Communtiy";
import { retrieveChosenMember, retrieveChosenMemberBoArticles, retrieveChosenSingleBoArticle } from "./selector";

/**REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setChosenMember: (data: Member[]) => dispach(setChosenMember(data)),
  setChosenMemberBoArticles: (data: Community[]) =>
    dispach(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: Community[]) =>
    dispach(setChosenSingleBoArticle(data)),
});

/**REDUX SELECTOR */
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({ chosenMember })
);

const chosenMemberBoArticlesRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (ChosenMemberBoArticles) => ({ ChosenMemberBoArticles })
);

const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle,
  (ChosenSingleBoArticle) => ({ ChosenSingleBoArticle })
);


const handlePaginationChange = (event: any, value: number) => {
    console.log(value);
  };

export function VisitOtherPage(props: any) {
  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
const {chosenMember} =useSelector(chosenMemberRetriever);
const {ChosenMemberBoArticles} = useSelector(chosenMemberBoArticlesRetriever);
  const [value, setValue] = useState("1");



  return (
    <div className="my_page">
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className="my_page_frame">
          <TabContext value="1">
            <Stack className="my_page_left">
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value="1">
                  <Box className="menu_name">Articles</Box>
                  <Box className="menu_content">
                    <MemberPosts
             
                    />
                    <Stack
                      sx={{ my: "40px" }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box className="bottom_box">
                        <Pagination
                          count={
                          3
                          }
                          page={2}
                          renderItem={(item) => (
                            <PaginationItem
                              components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                              color="secondary"
                            />
                          )}
                          onChange={handlePaginationChange}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <Box className="menu_name">Follower</Box>
                  <Box className="menu_content">
                    <MemberFollowers
              
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className="menu_name">Following</Box>
                  <Box className="menu_content">
                    <MemberFollowing
                    
                    />
                  </Box>
                </TabPanel>

                <TabPanel value="4">
                  <Box className="menu_name">Tanlangan Maqola</Box>
                  <Box className="menu_content">
                    <Box className="write_content">
                      <TViewer  />
                    </Box>
                  </Box>
                </TabPanel>
              </Box>
            </Stack>
            <Stack className="my_page_right">
              <Box className="order_info_box">
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <div className="order_user_img">
                    <img
                      src="/iconsfurnis/user.png"
                      className="order_user_avatar"
                      alt=""
                    />
                    <div className="order_user_icon_box">
                      <img src="/iconsfurnis/user.png" alt="" />
                    </div>
                  </div>
                  <span className="order_user_name">
                    Baron
                  </span>
                  <span className="order_user_prof">
                    new
                  </span>
                </Box>
                <Box className="user_media_box">
                  <FacebookIcon />
                  <InstagramIcon />
                  <TelegramIcon />
                  <YoutubeIcon />
                </Box>
                <Box className="user_media_box">
                  <p className="follows">
                    Followers: 2
                  </p>
                  <p className="follows">
                    Followings: 5
                  </p>
                </Box>
                <p className="user_desc">
             
                    "There is no additional information"
                </p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <TabList >
                  
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={() => (
                          <Button
                            value={1}
                            variant="contained"
                            style={{ background: "#f70909b8" }}
                          >
Cancel                          </Button>
                        )}
                      />
                    
                  
                  </TabList>
                </Box>
              </Box>
              <Box className="my_page_menu">
                <TabList
       
                >
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={() => (
                      <div className={`menu_box`} onClick={() => setValue("1")}>
                        <img src="/icons/post.svg" alt="" />
                        <span>Articles</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"2"}
                    component={() => (
                      <div className={`menu_box`} onClick={() => setValue("2")}>
                        <img src="/icons/follower.svg" alt="" />
                        <span>Follower</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"3"}
                    component={() => (
                      <div className={`menu_box`} onClick={() => setValue("3")}>
                        <img src="/icons/following.svg" alt="" />
                        <span>Following</span>
                      </div>
                    )}
                  />
                </TabList>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
