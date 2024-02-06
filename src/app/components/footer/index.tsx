import { Box, Container, IconButton, Stack, TextField } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function Footer(props: any) {
  return (
    <div className="footer_section">
      <Container>
        <Stack display={"flex"} alignItems={"center"}>
          <Box className="newsletter">Join Our Newsletter</Box>
          <Box className="deals">
            Sign up for deals, new products and promotions
          </Box>
        </Stack>
        <Stack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"center"}
          marginTop={"50px"}
        >
          <Box marginRight={"15px"}>
            <img
              width={"60px"}
              height={"60px"}
              src="/iconsfurnis/iconemail.svg"
              alt="emailicon"
            />
          </Box>
          <Box fontSize={"40px"}>
            <TextField id="filled-basic" label="Email" variant="filled" />
            <button className="signup">SignUp</button>
          </Box>
        </Stack>
      </Container>
      
      <Stack className="footer_down" >
        <Container>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={'center'}
            marginTop={'30px'}
          >
            <Box>
              <img
                width={"105px"}
                height={"24px"}
                src="/imagesfurnis/logowhite.svg"
                alt=""
              />
            </Box>
            <Box className="line"></Box>
            <Box>Gift & Decoration Store</Box>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              className="footer_links"
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
              
            </Stack>
          </Stack>
          <Box className="line1"></Box>
          <Stack className="last_stroke">
            <Box>Copyright © 2024 Furnis. All rights reserved</Box>
            <Box >
            <IconButton
                aria-label="cart"
                id="basic-button"
                aria-controls={undefined}
                aria-haspopup="true"
                aria-expanded={undefined}
                onClick={props.setPath}
                

              >
                <NavLink to="/">
                  <img src="/iconsfurnis/instagram.svg" alt="" />
                </NavLink>
              </IconButton>
              <IconButton
                aria-label="cart"
                id="basic-button"
                aria-controls={undefined}
                aria-haspopup="true"
                aria-expanded={undefined}
                onClick={props.setPath}
              >
                <NavLink to="/account">
                  <img src="/iconsfurnis/facebook.svg" alt="" />
                </NavLink>
              </IconButton>
              <IconButton
                aria-label="cart"
                id="basic-button"
                aria-controls={undefined}
                aria-haspopup="true"
                aria-expanded={undefined}
                onClick={props.setPath}
              >
                <NavLink to="/account">
                  <img src="/iconsfurnis/youtube.svg" alt="" />
                </NavLink>
              </IconButton>
            </Box>
          </Stack>
          </Container>
      </Stack>
    </div>
  );
}
