import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";

export function Category(props: any) {
  return (
    <div className="category_frame">
      <Container>
        <Stack >
          <Box className="living_room">
            Living Room
            <Box onClick={props.setPath}>
              <Link to="/shop">
                Shop now <img src="/iconsfurnis/arrow-right.svg" alt="" />
              </Link>
            </Box>
          </Box>
          <Box className="living_room1"></Box>
          <Box className="living_room2"></Box>
        </Stack>
      </Container>
    </div>
  );
}
