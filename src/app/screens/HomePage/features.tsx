import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { Fade } from "react-awesome-reveal";

export function Features() {
  return (
    <div className="features_frame">
      <Container maxWidth="xl">
        <Stack
          flexDirection={"row"}
          justifyContent={"space-around"}
          marginTop={"30px"}
        >
          <Fade direction="left">
            <Box >
              <img src="/imagesfurnis/card1.svg" alt="" />
            </Box>
            <Box >
              <img src="/imagesfurnis/card2.svg" alt="" />
            </Box>
            </Fade>
            <Fade direction="right">

            <Box >
              <img src="/imagesfurnis/card3.svg" alt="" />
            </Box>
            <Box >
              <img src="/imagesfurnis/card4.svg" alt="" />
            </Box>
            </Fade>
        </Stack>
      </Container>
    </div>
  );
}
