import React, { useEffect, useRef, useState } from "react";
import { Badge, Box, Button, Checkbox, Container, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import { Swiper, SwiperSlide } from "swiper/react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router-dom";

const shop_list = Array.from(Array(10).keys());
const product_list = Array.from(Array(9).keys());

export function ChosenShop() {
  return (
    <div className="chosen_shop">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar_big_box">
            <Box className="top_text">
              <p>Ikea Shop</p>
              <Box className="Single_search_big_box">
                <form action="" method="" className="Single_search_form">
                  <input
                    type="search"
                    className="Single_searchInput"
                    name="Single_reSearch"
                    placeholder="Search"
                  />
                  <Button
                    className="Single_button_search"
                    variant="contained"
                    endIcon={<SearchIcon />}
                  >
                    Search
                  </Button>
                </form>
              </Box>
            </Box>
          </Stack>

          <Stack
            style={{ width: "100%", display: "flex" }}
            flexDirection={"row"}
            sx={{ mt: "35px" }}
          >
            <Box className="prev_btn restaurant-prev">
              <ArrowBackIosNewIcon
                sx={{ fontSize: 40 }}
                style={{ color: "#03296e" }}
              />
            </Box>
            <Swiper
              className="shop_avatars_wrapper"
              slidesPerView={7}
              centeredSlides={false}
              spaceBetween={30}
              navigation={{
                nextEl: ".restaurant-next",
                prevEl: ".restaurant-prev",
              }}
            >
              {shop_list.map((ele, order) => {
                return (
                  <SwiperSlide
                    onClick={() => {}}
                    style={{ cursor: "pointer" }}
                    className="shop_avatars"
                  >
                    <img src="/imagesfurnis/ikea.png" />
                    <span>Ikea</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box
              className="next_btn restaurant-next"
              style={{ color: "white" }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: 40 }} style={{ color: "#03296e" }} />
            </Box>
          </Stack>

          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
            width={"90%"}
            sx={{ mt: "65px" }}
          >
            <Box className="prodes_filter_box">
              <Button onClick={() => {}} color="secondary" variant="contained">
                new
              </Button>
              <Button onClick={() => {}} color="secondary" variant="contained">
                price
              </Button>
              <Button onClick={() => {}} color="secondary" variant="contained">
                likes
              </Button>
              <Button onClick={() => {}} color="secondary" variant="contained">
                views
              </Button>
            </Box>
          </Stack>

          <Stack style={{ width: "100%", display: "flex", minHeight: "600px" }}>
            <Stack className="prod_wrapper">
              {product_list.map((ele, index) => {
                return (
                  <Box className="prod_box">
                    <Box
                      className="prod_img"
                      sx={{
                        backgroundImage: `url(/imagesfurnis/shopImages/prod2.jpg)`,
                      }}
                    >
                      <Button
                        className="like_view_btn"
                        style={{ left: "36px" }}
                      >
                        <Badge color="primary">
                          <Checkbox
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                          />
                        </Badge>
                      </Button>
                      <Button className="view_btn">
                        <img
                          src="/iconsfurnis/shopping_cart.svg"
                          alt=""
                          style={{ display: "flex" }}
                        />
                      </Button>
                      <Button
                        className="like_view_btn"
                        style={{ right: "36px" }}
                      >
                        <Badge color="primary">
                          <Checkbox
                            icon={
                              <RemoveRedEyeIcon style={{ color: "white" }} />
                            }
                          />
                        </Badge>
                      </Button>
                    </Box>
                    <Box className="prod_desc">
                      <span className="prod_title_text">Office Chair</span>
                      <div className="prod_desc_text">
                        <MonetizationOnIcon /> 25
                      </div>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <Container className="member_reviews">
        <Stack
          sx={{ mt: "60px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom:'30px'
          }}
        >
          <Box className={"category_title"}>Shop Location</Box>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
            style={{ marginTop: "60px" }}
            width={"1320"}
            height={500}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Stack>
      </Container>
    </div>
  );
}
