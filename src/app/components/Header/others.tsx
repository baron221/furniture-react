import { Badge, Box, Container, IconButton, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function NavbarOthers(props:any){
    return(<div className="format_other home_navbar">
    <Container>
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
            <NavLink to="/" >
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
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
              <Box className="hover" onClick={props.setPath}>
                <NavLink to="/community" activeClassName="underline">
                  Community
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
      <Stack className="center_header">
          <Box fontSize={'64px'} fontWeight={'500'} >Furnis</Box>
          <Box fontSize={'20px'} >Let's design the place you always imagined</Box>
        </Stack>
    </Container>
  </div>)
}