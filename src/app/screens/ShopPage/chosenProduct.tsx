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


//REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  setChosenProduct,
  setChosenShops,
  setRandomShops,
  setTargetProducts,
} from "../../screens/ShopPage/slice";
import { Market } from "../../../types/user";
import MarketApiService from "../../apiServices/marketApiServices";
import {
  retrieveRandomShops,
  retrieveTargetProducts,

  retrieveChosenProducts,
  retrieveChosenShops,
} from "../../screens/ShopPage/selector";
import { ProductSearchObj, SearchObj } from "../../../types/others";
import { serviceApi } from "../../../lib/config";
import { Definer } from "../../../lib/Definer";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiServices";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { useHistory } from "react-router-dom";




/**REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setChosenProduct: (data: Product[]) => dispach(setChosenProduct(data)),
  setChosenShops: (data: Market[]) => dispach(setChosenShops(data)),
});

/**REDUX SELECTOR */
const chosenShopsRetriever = createSelector(
  retrieveChosenShops,
  (chosenShops) => ({
    chosenShops,
  })
);

const chosenProductRetriever = createSelector(
  retrieveChosenProducts,
  (chosenProduct) => ({
    chosenProduct,
  })
);

export function ChosenProduct() {
  /*INITIALIZATION */
  let { product_id } = useParams<{ product_id: string }>();
  const { setChosenProduct, setChosenShops } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { chosenShops } = useSelector(chosenShopsRetriever)
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [rebuildDate, setRebuildDate] = useState<Date>(new Date)


  const productRelatedProcess = async () => {

    try {
      const productService = new ProductApiService();
      const product: Product[] = await productService.getChosenProduct(product_id);
      setChosenProduct(product);

      const shopService = new MarketApiService();
      // const market: Market[] = await shopService.getChosenMarket(market._id);
      // setChosenShops(market);
   } catch (error) {
      console.log(`dishRelatedProcess, ERROR:`, error);   }


  }


useEffect(() => {
  productRelatedProcess().then();
}, [rebuildDate]);
/*HANDLERS */
const targetLikeProduct = async (e: any) => {
  try {
    assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
    const memberApiService = new MemberApiService();
    const like_result: any = await memberApiService.memberLikeTarget({
      like_ref_id: e.target.id,
      group_type: "product",
    });
    assert.ok(like_result, Definer.general_err2);

    await sweetTopSmallSuccessAlert('success', 700, false);
    setRebuildDate(new Date);
  } catch (err: any) {
    console.log("targetLikeProduct,ERROR", err);
    sweetErrorHandling(err).then();
  }
};


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
            {chosenProduct?.product_images.map((ele:string) => {
              const img_path = `${serviceApi}/${ele}`;
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
            slidesPerView={chosenProduct?.product_images.length}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
            style={{ width: "500px", height: "245px", marginTop: "20px" }}
          >
            {chosenProduct?.product_images.map((ele:string) => {
              const img_path = `${serviceApi}/${ele}`;
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
            <strong className="dish_txt">{chosenProduct?.product_name}</strong>
            <span className="resto_name"> {chosenShops?.mb_nick}</span>
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
                  {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    id = {chosenProduct?._id}
                    onClick={targetLikeProduct}
                  /*@ts-ignore*/
                  checked={chosenProduct?.me_liked && chosenProduct?.me_liked[0]?.my_favorite? true:false}
                  />
                  <span>{chosenProduct?.product_likes}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.product_views}</span>
                </div>
              </div>
            </Box>
            <p className="dish_desc_info">{chosenProduct?.product_description}</p>
            <Marginer
              direction="horizontal"
              height="1"
              width="100%"
              bg="#000000"
            />
            <div className="dish_price_box">
              <span>Price</span>
              <span>$ {chosenProduct?.product_price}</span>
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
