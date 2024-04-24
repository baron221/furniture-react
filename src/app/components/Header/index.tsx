import { Logout } from "@mui/icons-material";
import {
  Badge,
  Box,
  Container,
  IconButton,
  Stack,
  Button,
  Menu,
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Fade } from "react-awesome-reveal";
import Basket from "./basket";

export function NavbarHome(props: any) {
  return (
    <>
      <div className="format home_navbar">
        <Container maxWidth="xl">
          <Fade direction="up" triggerOnce={true}>
            <Stack flexDirection={"row"} className="navbar_container">
              <Box>
                <img src="/imagesfurnis/Logo.svg" alt="" />
              </Box>
              <Stack
                flexDirection={"row"}
                alignItems={"center"}
                marginRight={"20px"}
                justifyContent={""}
                className="navbar_links"
              >
                <Box className="hover" onClick={props.setPath}>
                  <NavLink to="/" activeClassName="underline">
                    Home
                  </NavLink>
                </Box>
                <Box className="hover" onClick={props.setPath}>
                  <NavLink to="/shop" activeClassName="underline">
                    Shop
                  </NavLink>
                </Box>

                <Box className="hover" onClick={props.setPath}>
                  <NavLink to="/product" activeClassName="underline">
                    Product
                  </NavLink>
                </Box>
                {props.verifiedMemberData ? (
                  <Box className="hover" onClick={props.setPath}>
                    <NavLink to="/orders" activeClassName="underline">
                      Orders
                    </NavLink>
                  </Box>
                ) : null}

                <Box className="hover" onClick={props.setPath}>
                  <NavLink to="/community" activeClassName="underline">
                    Community
                  </NavLink>
                </Box>
                {props.verifiedMemberData ? (
                  <Box className="hover" onClick={props.setPath}>
                    <NavLink to="/account" activeClassName="underline">
                      My Page
                    </NavLink>
                  </Box>
                ) : null}
                <Stack
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  marginRight={"20px"}
                >
                  {props.verifiedMemberData ? null : (
                    <IconButton
                      aria-label="cart"
                      id="basic-button"
                      aria-controls={undefined}
                      aria-haspopup="true"
                      aria-expanded={undefined}
                      onClick={props.setPath}
                    >
                      <Box>
                        <Button onClick={props.handleLoginOpen}>
                          <img src="/iconsfurnis/usercircle.svg" alt="" />
                        </Button>
                      </Box>
                    </IconButton>
                  )}
                  <IconButton
                    aria-label="cart"
                    id="basic-button"
                    aria-controls={undefined}
                    aria-haspopup="true"
                    aria-expanded={undefined}
                  >
                    <Badge  color="secondary">
                    <Basket cartItems={props.cartItems} onAdd={props.onAdd} />

                    </Badge>
                  </IconButton>
                  {!props.verifiedMemberData ? (
                    <IconButton
                      aria-label="cart"
                      id="basic-button"
                      aria-controls={undefined}
                      aria-haspopup="true"
                      aria-expanded={undefined}
                      onClick={props.setPath}
                    >
                      <Box>
                        <Button onClick={props.handleSignUpOpen}>
                          {" "}
                          <img
                            width={"60px"}
                            src="/iconsfurnis/sign-up.png"
                            alt=""
                          />
                        </Button>
                      </Box>
                    </IconButton>
                  ) : (
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "24px",
                        marginLeft: "10px",
                      }}
                      src={props.verifiedMemberData.mb_image}
                      onClick={props.handleLogOutClick}
                    />
                  )}
                  <Menu
                    anchorEl={props.anchorEl}
                    open={props.open}
                    onClose={props.handleCloseLogOut}
                    onClick={props.handleCloseLogOut}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32)",
                        mt: 1.5,
                        "&.MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={props.handleLogoutRequest}>
                      <ListItemIcon>
                        <Logout fontSize="small" style={{ color: "blue" }} />
                        Logout
                      </ListItemIcon>
                    </MenuItem>
                  </Menu>
                </Stack>
              </Stack>
            </Stack>

            <Swiper
              pagination={{
                type: "fraction",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide className="slide1"></SwiperSlide>
              <SwiperSlide className="slide2"></SwiperSlide>
              <SwiperSlide className="slide3"></SwiperSlide>
            </Swiper>
          </Fade>
        </Container>
      </div>
    </>
  );
}
