import { Badge, Box, Button, Container, IconButton, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function NavbarHome(props: any) {
  return (
    <div className="format home_navbar">
      <Container >
        <Stack
          flexDirection={"row"}
          className="navbar_container"
          justifyContent={"space-between"}
        >
          <Box>
            <img src="/imagesfurnis/Logo.svg" alt="" />
          </Box>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            className="navbar_links"
          >
            <Box className="hover" onClick={props.setPath}>
              <NavLink to="/" activeClassName="underline">
                Home
              </NavLink>
            </Box>
            <Box className="hover" onClick={props.setPath}>
              <NavLink to="/shop" activeClassName="underline">
                Shop
              </NavLink>
            </Box>

            <Box className="hover" onClick={props.setPath}>
              <NavLink to="/product" activeClassName="underline">
                Product
              </NavLink>
            </Box>
            <Box className="hover" onClick={props.setPath}>
              <NavLink to="/contact" activeClassName="underline">
                Contact Us
              </NavLink>
            </Box>
            <Stack
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              marginRight={"20px"}
            >
              <IconButton
                aria-label="cart"
                id="basic-button"
                aria-controls={undefined}
                aria-haspopup="true"
                aria-expanded={undefined}
                onClick={props.setPath}
              >
                <NavLink to="/account">
                  <img src="/iconsfurnis/usercircle.svg" alt="" />
                </NavLink>
              </IconButton>
              <Box>
                <IconButton
                  aria-label="cart"
                  id="basic-button"
                  aria-controls={undefined}
                  aria-haspopup="true"
                  aria-expanded={undefined}
                >
                  <Badge badgeContent={3} color="secondary">
                    <img src="/iconsfurnis/shoppingbag.svg" alt="" />
                  </Badge>
                </IconButton>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="header_main">
          <Box>Transform your space with <span>timeless</span> elegance and <span>exquisite</span> comfort.</Box>
          <button className="header_button"> Shop Now</button>

          
        </Stack>
      </Container>
      
    </div>
    
  );
}
