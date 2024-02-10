import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function NewArrival() {
  return (
    <div className="newarrival_frame">
      <Container maxWidth="xl">
        <Stack className="title" flexDirection={"row"}>
          <Box fontSize={"40px"} fontWeight={"500"}>
            
            New
            <br />
            Arrivals
          </Box>
          <Box fontSize={"25px"} className="underline">
            <NavLink to="/shop">More Products</NavLink>{" "}
            <img src="/iconsfurnis/arrow-right.svg" alt="" />
          </Box>
        </Stack>

        
      </Container>
    </div>
  );
}
