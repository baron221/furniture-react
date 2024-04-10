import React, { useEffect, useState } from "react";
import { Favorite } from "@mui/icons-material";
import { Box, Button, Container, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import {
  AspectRatio,
  Card,
  CardOverflow,
  CssVarsProvider,
  IconButton,
  Link,
  Typography,
} from "@mui/joy";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";
import VisibilityIcon from "@mui/icons-material/Visibility";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTargetShops } from "../../screens/ShopPage/slice";
import { Market } from "../../../types/user";
import MarketApiService from "../../apiServices/marketApiServices";
import { retrieveTargetShops } from "../../screens/ShopPage/selector";
import { SearchObj } from "../../../types/others";
import { serviceApi } from "../../../lib/config";

/**REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setTargetShops: (data: Market[]) => dispach(setTargetShops(data)),
});
/**REDUX SELECTOR */
const targetShopRetriever = createSelector(
  retrieveTargetShops,
  (targetShops) => ({
    targetShops,
  })
);
export function AllShop() {
  /**INITIALIZATIONS */
  const { setTargetShops } = actionDispatch(useDispatch());
  const { targetShops } = useSelector(targetShopRetriever);
  const [targetSearchObj, setTargetSearchObj] = useState<SearchObj>({
    page: 1,
    limit: 8,
    order: "mb_point",
  });

  useEffect(() => {
    const shopService = new MarketApiService();
    shopService
      .getMarkets(targetSearchObj)
      .then((data) => setTargetShops(data))
      .catch((err) => console.log(err));
  }, [targetSearchObj]);

  /**HANDLERS */
  const searchHandler = (category: string) => {
    targetSearchObj.page = 1;
    targetSearchObj.order = category;
    setTargetSearchObj({ ...targetSearchObj });
  };

  return (
    <div className="all_shop">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="file_search_box">
            <Box className="file_box" style={{ cursor: "pointer" }}>
              <a onClick={() => searchHandler("mb_point")}>Best</a>
              <a onClick={() => searchHandler("mb_views")}>Famous</a>
              <a onClick={() => searchHandler("createdAt")}>New</a>
            </Box>
            <Box className="search_big_box">
              <form action="" method="" className="search_form">
                <input
                  type="search"
                  className="searchInput"
                  name="resSearch"
                  placeholder="Search"
                />
                <Button
                  className="button_search"
                  variant="contained"
                  endIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </form>
            </Box>
          </Box>
          <Stack className="all_res_box">
            <CssVarsProvider>
              {targetShops.map((ele: Market) => {
                const image_path = `${serviceApi}/${ele.mb_image}`;
                return (
                  <Card
                    variant="outlined"
                    sx={{
                      minHeight: 410,
                      minWidth: 290,
                      mx: "17px",
                      my: "20px",
                      cursor: "pointer",
                    }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio={"1"}>
                        <img src={image_path} />
                      </AspectRatio>
                      <IconButton
                        aria-label="Like miniaml photography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1rem",
                          bottom: 0,
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,.4)",
                        }}
                      >
                        <Favorite
                          /*@ts-ignore*/
                          style={{
                            fill: "white",
                          }}
                        />
                      </IconButton>
                    </CardOverflow>
                    <Typography level="h3" sx={{ fontSize: "35px", mt: 1 }}>
                      {ele.mb_nick}
                    </Typography>
                    <Typography level="h4" sx={{ mt: 0.5, mb: 2 }}>
                      <Link
                        href=""
                        startDecorator={<LocationOnRoundedIcon />}
                        textColor="neutral.700"
                      >
                        {ele.mb_address}Busan
                      </Link>
                    </Typography>
                    <Typography level="h4" sx={{ mt: 0.5, mb: 2 }}>
                      <Link
                        startDecorator={<CallIcon />}
                        textColor="neutral.700"
                      >
                        {ele.mb_phone}
                      </Link>
                    </Typography>
                    <CardOverflow
                      variant="soft"
                      sx={{
                        display: "flex",

                        fontFamily: '"Space Grotesk", sans-serif;"',
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderTop: "1px solid",
                        borderColor: "neutral.outlinedBorder",
                        bgcolor: "background.level1",
                      }}
                    >
                      <Typography
                        level="h4"
                        sx={{
                          fontWeight: "13px",
                          color: "text.secondary",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <VisibilityIcon
                          sx={{ fontSize: 20, marginLeft: "5px" }}
                        />
                        {ele.mb_views}
                      </Typography>
                      <Box sx={{ width: 2, bgcolor: "divider" }} />
                      <Typography
                        level="h4"
                        sx={{
                          fontWeight: "md",
                          color: "neutral.700",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Favorite sx={{ fontSize: 20, marginLeft: "2px" }} />{" "}
                        {ele.mb_likes}
                      </Typography>
                    </CardOverflow>
                  </Card>
                );
              })}
            </CssVarsProvider>
          </Stack>
          <Stack className="bottom_box">
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
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
