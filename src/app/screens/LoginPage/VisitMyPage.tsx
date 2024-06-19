import Tab from "@mui/material/Tab";

import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Box, Button, Container, Stack } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YoutubeIcon from "@mui/icons-material/YouTube";
import { TabContext, TabPanel } from "@material-ui/lab";
import TabList from "@material-ui/lab/TabList";
import { MemberPosts } from "./MemberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { TuiEditor } from "../../components/tuiEditor/TuiEditor";
import TViewer from "../../components/tuiEditor/Tviewer";
import { Mysettings } from "./mySettings";

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
import { Community, SearchMemberArticlesObj } from "../../../types/Communtiy";
import {
  retrieveChosenMember,
  retrieveChosenMemberBoArticles,
  retrieveChosenSingleBoArticle,
} from "./selector";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import CommunityApiService from "../../apiServices/communityApiService";
import MemberApiService from "../../apiServices/memberApiServices";

/**REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setChosenMember: (data: Member) => dispach(setChosenMember(data)),
  setChosenMemberBoArticles: (data: Community[]) =>
    dispach(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticle: (data: Community) =>
    dispach(setChosenSingleBoArticle(data)),
});

/**REDUX SELECTOR */
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({ chosenMember })
);

const chosenMemberBoArticlesRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({ chosenMemberBoArticles })
);

const chosenSingleBoArticleRetriever = createSelector(
  retrieveChosenSingleBoArticle,
  (chosenSingleBoArticle) => ({ chosenSingleBoArticle })
);

export function VisitMyPage(props: any) {
  // INITIALIZATIONS
  const { verifiedMemberData } = props;
  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticle,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );
  const { chosenSingleBoArticle } = useSelector(chosenSingleBoArticleRetriever);
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);
  const [value, setValue] = React.useState("1");

  const [memberArticleSearchObj, setMemberArticleSearchObj] =
    useState<SearchMemberArticlesObj>({ mb_id: "none", page: 1, limit: 5 });

  useEffect(() => {
    if (!localStorage.getItem("member_data")) {
      sweetFailureProvider("Please login first", true, true);
    }
    const communityService = new CommunityApiService();
    const memberService = new MemberApiService();

    communityService
      .getMemberCommunityArticles(memberArticleSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));
    memberService.getChosenMember(verifiedMemberData?._id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [memberArticleSearchObj, articlesRebuild]);

  /*HANDLERS*/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const handlePaginationChange = (event: any, value: number) => {
    memberArticleSearchObj.page = value;
    setMemberArticleSearchObj({ ...memberArticleSearchObj });
  };

  const renderChosenArticleHandler = async (art_id: string) => {
    try {
      const communityService = new CommunityApiService();
      communityService
        .getChosenArticle(art_id)
        .then((data) => {
          setChosenSingleBoArticle(data);
          setValue("5");
        })
        .catch((err) => console.log(err));
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <div className="my_page">
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className="my_page_frame">
          <TabContext value={value}>
            <Stack className="my_page_left">
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value="1">
                  <Box className="menu_name">My Articles</Box>
                  <Box className="menu_content">
                    <MemberPosts
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      renderChosenArticleHandler={renderChosenArticleHandler}
                      setArticlesRebuild={setArticlesRebuild}
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
                            memberArticleSearchObj.page >= 3
                              ? memberArticleSearchObj.page + 1
                              : 3
                          }
                          page={memberArticleSearchObj?.page}
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
                  <Box className="menu_name">Followers</Box>
                  <Box className="menu_content">
                    <MemberFollowers
                      actions_enoubled={true}
                      mb_id={props?.verifiedMemberData?._id}
                      setFollowRebuild={setFollowRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className="menu_name">Following</Box>
                  <Box className="menu_content">
                    <MemberFollowing
                      actions_enoubled={true}
                      mb_id={verifiedMemberData?._id}
                      setFollowRebuild={setFollowRebuild}
                      followRebuild={followRebuild}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="4">
                  <Box className="menu_name"> Write Article</Box>
                  <Box className="menu_content">
                    <Box className="write_content">
                      <TuiEditor setValue={setValue}
                      setArticlesRebuild={setArticlesRebuild}/>
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value="5">
                  <Box className="menu_name">Chosen article</Box>
                  <Box className="menu_content">
                    <Box className="write_content">
                      <TViewer chosenSingleBoArticle={chosenSingleBoArticle} />
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value="6">
                  <Box className="menu_name">Edit informations</Box>
                  <Box className="menu_content">
                    <Mysettings />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>
            <Stack className="my_page_right">
              <Box className="order_info_box">
                <a onClick={() => setValue("6")} className="settings_btn">
                  <SettingsIcon />
                </a>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <div className="order_user_img">
                    <img
                      src={verifiedMemberData?.mb_image}
                      className="order_user_avatar"
                      alt=""
                    />
                    <div className="order_user_icon_box">
                      <img
                        src={
                          chosenMember?.mb_type === "MARKET"
                            ? "/iconsfurnis/market.png"
                            : "/iconsfurnis/user.png"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <span className="order_user_name">
                    {chosenMember?.mb_nick}
                  </span>
                  <span className="order_user_prof">
                    {chosenMember?.mb_type}
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
                    Followers: {chosenMember?.mb_subscriber_cnt}{" "}
                  </p>
                  <p className="follows">
                    Followings:{chosenMember?.mb_follow_cnt}{" "}
                  </p>
                </Box>
                <p className="user_desc">"There is no addtional information"</p>
                <Box
                  display={"flex"}
                  justifyContent={"flex-end"}
                  sx={{ mt: "10px" }}
                >
                  <TabList onChange={handleChange}>
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"4"}
                      component={() => (
                        <Button
                          variant="contained"
                          onClick={() => setValue("4")}
                        >
                          Write Article{" "}
                        </Button>
                      )}
                    />
                  </TabList>
                </Box>
              </Box>
              <Box className="my_page_menu">
                <Box display={"flex"} flexDirection={"column"}>
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"1"}
                    component={() => (
                      <div className={`menu_box`} onClick={() => setValue("1")}>
                        <img src="/icons/post.svg" alt="" />
                        <span>My Articles</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"2"}
                    component={() => (
                      <div className={`menu_box`} onClick={() => setValue("2")}>
                        <img src="/icons/follower.svg" alt="" />
                        <span>Followers</span>
                      </div>
                    )}
                  />
                  <Tab
                    style={{ flexDirection: "column" }}
                    value={"3"}
                    component={() => (
                      <div className={`menu_box`} onClick={() => setValue("3")}>
                        <img src="/iconsfurnis/follow_icon.png" alt="" />
                        <span>Following</span>
                      </div>
                    )}
                  />
                </Box>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
