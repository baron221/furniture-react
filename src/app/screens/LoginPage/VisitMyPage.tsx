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

export function VisitMyPage(props: any) {
  // INITIALIZATIONS

  const [value, setValue] = React.useState("1");
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
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
                    <MemberPosts />
                    <Stack
                      sx={{ my: "40px" }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box className="bottom_box">
                        <Pagination
                          count={3}
                          page={1}
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
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="3">
                  <Box className="menu_name">Following</Box>
                  <Box className="menu_content">
                    <MemberFollowing
                  
                      actions_enoubled={true}
                    />
                  </Box>
                </TabPanel>
                <TabPanel value="4">
                  <Box className="menu_name"> Write Article</Box>
                  <Box className="menu_content">
                    <Box className="write_content">
                      <TuiEditor
                        setValue={setValue}
                    
                      />
                    </Box>
                  </Box>
                </TabPanel>
                <TabPanel value="5">
                  <Box className="menu_name">Chosen article</Box>
                  <Box className="menu_content">
                    <Box className="write_content">
                      <TViewer text="<div>Assalamualaykum
                    </div>" />
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
                      src={"/iconsfurnis/user.png"}
                      className="order_user_avatar"
                      alt=""
                    />
                    <div className="order_user_icon_box">
                      <img
                        src={
                         "/iconsfurnis/user.png"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <span className="order_user_name">
                        MuhammadAyyub
                  </span>
                  <span className="order_user_prof">
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
                    Followings: 10
                  </p>
                </Box>
                <p className="user_desc">
           
                    "There is no addtional information"
                </p>
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
Write Article                        </Button>
                      )}
                    />
                  </TabList>
                </Box>
              </Box>
              <Box className="my_page_menu" >
                <Box 
                display={'flex'} flexDirection={'column'}
                >
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
