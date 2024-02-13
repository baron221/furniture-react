import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, Checkbox, Container, Rating, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Marginer from "../../components/marginer";
import { useParams } from "react-router-dom";

const chosen_list = Array.from(Array(5).keys());

export function ChosenProduct() {
  return (
    <div className="chosen_product_page">
      <Container>
        <Stack flexDirection={'row'}
        justifyContent={'space-between'}
        marginTop={'50px'}
        marginBottom={'30px'}>
        <Stack className="chosen_product_slider">
          <Swiper
            className="dish_swiper"
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {chosen_list.map((ele) => {
              const img_path = `/imagesfurnis/shopImages/Product.svg`;
              return (
                <SwiperSlide>
                  <img
                    src={img_path}
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Swiper
            loop={true}
            spaceBetween={20}
            slidesPerView={3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
            style={{ width: "500px", height: "245px", marginTop: "20px" }}
          >
            {chosen_list.map((ele) => {
              const img_path = `/imagesfurnis/shopImages/Product2.svg`;
              return (
                <SwiperSlide style={{ height: "107px", display: "flex" }}>
                  <img src={img_path} style={{ borderRadius: "15px" }} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <Stack className="chosen_product_info_container">
          <Box className="chosen_product_info_box">
            <strong className="dish_txt">Table Tray</strong>
            <Box className="rating_box">
              <Rating name="half-rating" defaultValue={3.5} precision={0.5} />
              <div className="evaluation_box">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                  />
                  <span>10</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>10</span>
                </div>
              </div>
            </Box>
            <p className="dish_desc_info">Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around 
            with removable tray top, handy for serving snacks.</p>
            <Marginer
              direction="horizontal"
              height="1"
              width="100%"
              bg="#000000"
            />
            <div className="dish_price_box">
              <span>Price</span>
              <span>$115</span>
            </div>
            <div className="button_box">
              <Button variant="contained"
              className="button_prod">Add to Cart</Button>
            </div>
          </Box>
        </Stack>
        </Stack>
      </Container>
    </div>
  );
}
