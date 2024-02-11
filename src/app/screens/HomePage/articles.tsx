import { Box, Container, Stack } from "@mui/material";

import React from "react";
import { NavLink } from "react-router-dom";

import { Fade } from "react-awesome-reveal";

export function Articles() {
  return (
    <div className="articles_frame">
      <Container maxWidth="xl">
        <Fade>
          <Stack className="title" flexDirection={"row"}>
            <Box fontSize={"40px"}>Articles</Box>
            <Box fontSize={"25px"} className="underline">
              <NavLink to="/shop">More Articles</NavLink>{" "}
              <img src="/iconsfurnis/arrow-right.svg" alt="" />
            </Box>
          </Stack>
          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Stack className="article_box">
              <Box>
                <img
                  width="457px"
                  height="425px"
                  src="/imagesfurnis/article1.svg"
                  alt=""
                />
              </Box>
              <Box
                fontSize={"25px"}
                fontFamily={"Space Grotesk, sans-serif;"}
                fontWeight={700}
              >
                7 ways to decor your home
              </Box>
              <Box
                className="underline"
                fontFamily={"Space Grotesk, sans-serif;"}
                fontWeight={700}
              >
                <NavLink to="/shop">Read More</NavLink>
                <img src="/iconsfurnis/arrow-right.svg" alt="" />
              </Box>
            </Stack>
            <Stack className="article_box">
              <Box>
                <img
                  width="457px"
                  height="425px"
                  src="/imagesfurnis/article2.svg"
                  alt=""
                />
              </Box>
              <Box
                fontSize={"25px"}
                fontFamily={"Space Grotesk, sans-serif;"}
                fontWeight={700}
              >
                Kitchen organization
              </Box>
              <Box
                className="underline"
                fontFamily={"Space Grotesk, sans-serif;"}
                fontWeight={700}
              >
                <NavLink to="/shop">Read More</NavLink>
                <img src="/iconsfurnis/arrow-right.svg" alt="" />
              </Box>
            </Stack>
            <Stack className="article_box">
              <Box>
                <img
                  width="457px"
                  height="425px"
                  src="/imagesfurnis/article3.svg"
                  alt=""
                />
              </Box>
              <Box
                fontSize={"25px"}
                fontFamily={"Space Grotesk, sans-serif;"}
                fontWeight={700}
              >
                Decor your bedroom
              </Box>
              <Box
                className="underline"
                fontFamily={"Space Grotesk, sans-serif;"}
                fontWeight={700}
              >
                <NavLink to="/shop">Read More</NavLink>
                <img src="/iconsfurnis/arrow-right.svg" alt="" />
              </Box>
            </Stack>
          </Stack>
        </Fade>
      </Container>
    </div>
  );
}
