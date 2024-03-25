import { Box, Container, Stack } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import React from "react";
import { NavLink } from "react-router-dom";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Fade } from "react-awesome-reveal";

import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { CardOverflow, CssVarsProvider, IconButton } from "@mui/joy";
import { Favorite } from "@mui/icons-material";

//REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePeakMarkets } from "../../screens/HomePage/selector";
import { Market } from "../../../types/user";
import { serviceApi } from "../../../lib/config";

const PeakMarketsRetriever = createSelector(
  retrievePeakMarkets,
  (PeakMarkets) => ({ PeakMarkets })
);

export function NewArrival() {
  const { PeakMarkets } = useSelector(PeakMarketsRetriever);

  return (
    <div className="newarrival_frame">
      <Container maxWidth="xl">
        <Stack className="title" flexDirection={"row"}>
          <Box fontSize={"40px"}>
            Peak <br />
            Markets
          </Box>
          <Box fontSize={"25px"} className="underline">
            <NavLink to="/shop">More Products</NavLink>{" "}
            <img src="/iconsfurnis/arrow-right.svg" alt="" />
          </Box>
        </Stack>
        <Stack
          flexDirection={"row"}
          sx={{ mt: "43px" }}
          justifyContent={"space-around"}
        >
          {PeakMarkets.map((ele: Market) => {
            const image_path = `${serviceApi}/${ele.mb_image}`;
            return (
              <CssVarsProvider key={ele._id}>
                <Fade direction="left" triggerOnce={true}>
                  <Card
                    sx={{ minHeight: "400px", width: 349, cursor: "pointer" }}
                  >
                    <CardCover>
                      <img src={image_path} alt="" />
                    </CardCover>
                    <CardCover
                      sx={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                      }}
                    />
                    <CardContent sx={{ justifyContent: "flex-end" }}>
                      <Typography level="title-lg" textColor="#fff">
                        {ele.mb_nick}
                      </Typography>
                      <Typography
                        startDecorator={<LocationOnRoundedIcon />}
                        textColor="neutral.300"
                      >
                        California, USA
                      </Typography>
                    </CardContent>
                    <CardOverflow
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderTop: "1px solid",
                      }}
                    >
                      <IconButton
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Like minimal photography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1rem",
                          bottom: 45,
                          transform: "translateY(50%)",
                          color: "rgba(0, 0, 0, .4)",
                        }}
                      >
                        <Favorite
                          style={{
                            fill:
                              ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                ? "red"
                                : "white",
                          }}
                        />

                        {/* // onClick={(e) => targetLikeTop(e, ele._id)}
                              style={{
                              //   fill: ele?.me_liked && ele?.me_liked[0]?.my_favorite
                              //     ? "red"
                              //     : "white"
                              // }}  */}
                      </IconButton>

                      <Typography
                        level="body-md"
                        sx={{
                          fontWeight: "md",
                          color: "neutral.300",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {ele.mb_views}
                        <VisibilityIcon
                          sx={{ fontSize: 20, marginLeft: "5px" }}
                        />
                      </Typography>
                      <Box sx={{ width: 2, bgcolor: "devider" }} />
                      <Typography
                        sx={{
                          fontWeight: "md",
                          color: "neutral.300",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <div
                        // ref={(element) => (refs.current[ele._id] = element)}
                        >
                          {ele.mb_likes}
                        </div>
                        <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                    </CardOverflow>
                  </Card>
                </Fade>
              </CssVarsProvider>
            );
          })}
        </Stack>
      </Container>
    </div>
  );
}
