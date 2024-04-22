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
  setRandomShops: (data: Market[]) => dispach(setRandomShops(data)),
  setChosenShops: (data: Market[]) => dispach(setChosenShops(data)),
  setTargetProducts: (data: Product[]) => dispach(setTargetProducts(data)),
});

/**REDUX SELECTOR */
const randomShopRetriever = createSelector(
  retrieveRandomShops,
  (randomShops) => ({
    randomShops,
  })
);

const chosenShopsRetriever = createSelector(
  retrieveChosenShops,
  (chosenShops) => ({
    chosenShops,
  })
);

const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);



export function ChosenShop() {
  /**INITIALIZATIONS */
  const history = useHistory();
  let { shop_id } = useParams<{ shop_id: string }>();
  const { setRandomShops, setChosenShops, setTargetProducts } = actionDispatch(
    useDispatch()
  );
  const { randomShops } = useSelector(randomShopRetriever);
  const { chosenShops } = useSelector(chosenShopsRetriever);
  const { targetProducts } = useSelector(targetProductsRetriever);
  const [chosenShopId, setChosenShopId] = useState<string>(shop_id);
  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 8,
      order: "createdAt",
      market_mb_id: chosenShopId,
      product_collection: "LIVINGROOM",

    });
  const [rebuildDate, setRebuildDate] = useState<Date>(new Date)

  useEffect(() => {
    const shopService = new MarketApiService();
    shopService
      .getMarkets({ page: 1, limit: 10, order: "random" })
      .then((data) => setRandomShops(data))
      .catch((err) => console.log(err));
    shopService.getChosenMarket(chosenShopId).then(data => setChosenShops(data)).catch((err)=>console.log(err))
    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [chosenShopId,targetProductSearchObj, rebuildDate]);
  const refs: any = useRef([]);

  /**HANDLERS */
  const chosenShopHandler = (id: string) => {
    setChosenShopId(id);
    targetProductSearchObj.market_mb_id = id;
    setTargetProductSearchObj({ ...targetProductSearchObj })
    history.push(`/shop/${id}`)
  };

  const searchOrderHandler = (order: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj })
  }
  const chosenProductHandler = (id: string) => {
    history.push(`/shop/product/${id}`)
 }
  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const memberApiService = new MemberApiService();
      const like_result: any = await memberApiService.memberLikeTarget({
        like_ref_id: e.target.id,
        group_type: "product",
      });
      assert.ok(like_result, Definer.general_err2);

      // if (like_result.like_status > 0) {
      //   e.target.style.fill = "red";
      //   refs.current[like_result.like_ref_id].innerHTML++;
      // } else {
      //   e.target.style.fill = "white";
      //   refs.current[like_result.like_ref_id].innerHTML--;
      // }
      await sweetTopSmallSuccessAlert('success', 700, false);
      setRebuildDate(new Date);
    } catch (err: any) {
      console.log("targetLikeProduct,ERROR", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="chosen_shop">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar_big_box">
            <Box className="top_text">
              <p>{chosenShops?.mb_nick}</p>
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
              {randomShops.map((ele: Market) => {
                const image_path = `${serviceApi}/${ele.mb_image}`
                return (
                  <SwiperSlide
                    onClick={() => chosenShopHandler(ele._id)}
                    key={ele._id}
                    style={{ cursor: "pointer" }}
                    className="shop_avatars"
                  >
                    <img src={image_path} />
                    <span>{ele.mb_nick}</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box
              className="next_btn restaurant-next"
              style={{ color: "white" }}
            >
              <ArrowForwardIosIcon
                sx={{ fontSize: 40 }}
                style={{ color: "#03296e" }}
              />
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
              <Button onClick={() => searchOrderHandler('createdAt')} color="secondary" variant="contained">
                new
              </Button>
              <Button onClick={() => searchOrderHandler('product_price')} color="secondary" variant="contained">
                price
              </Button>
              <Button onClick={() => searchOrderHandler('product_likes')} color="secondary" variant="contained">
                likes
              </Button>
              <Button onClick={() => searchOrderHandler('product_views')} color="secondary" variant="contained">
                views
              </Button>
            </Box>
          </Stack>

          <Stack style={{ width: "100%", minHeight: "600px" }}>
            <Stack className="prod_wrapper">
              {targetProducts.map((product: Product) => {
                const image_path = `${serviceApi}/${product.product_images[0]}`;
                return (
                  <Box onClick={() => chosenProductHandler(product._id)} className="prod_box" key={product._id}>
                    <Box
                      className="prod_img"
                      sx={{
                        backgroundImage: `url(${image_path})`,
                      }}
                    >
                      <Button
                        className="like_view_btn"
                        style={{ left: "36px" }}
                      >
                        <Badge
                          badgeContent={product.product_likes}
                          color="primary"
                        >
                          <Checkbox
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            id={product._id}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                            onClick={targetLikeProduct}
                            /**ts-ignore */
                            checked={
                              product?.me_liked &&
                                product?.me_liked[0]?.my_favorite
                                ? true
                                : false
                            }
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
                        <Badge
                          badgeContent={product.product_views}
                          color="primary"
                        >
                          <Checkbox
                            icon={
                              <RemoveRedEyeIcon style={{ color: "white" }} />
                            }
                          />
                        </Badge>
                      </Button>
                    </Box>
                    <Box className="prod_desc">
                      <span className="prod_title_text">
                        {product.product_name}
                      </span>
                      <div className="prod_desc_text">
                        <MonetizationOnIcon /> {product.product_price}
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
            marginBottom: "30px",
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
