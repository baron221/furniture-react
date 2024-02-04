import {
  Badge,
  Box,
  Container,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <div className="footer_section">
      <Container>
        <Stack display={"flex"} alignItems={"center"}>
          <Box className="newsletter">Join Our Newsletter</Box>
          <Box className="deals">
            Sign up for deals, new products and promotions
          </Box>
        </Stack>
        <Stack display={"flex"} flexDirection={"row"} justifyContent={'center'} marginTop={'50px'}>
          <Box marginRight={'15px'}>
            <img
              width={"60px"}
              height={"60px"}
              
              src="/iconsfurnis/iconemail.svg"
              alt="emailicon"
            />
          </Box>
          <Box fontSize={'40px'} >
            <TextField id="filled-basic" label="Email" variant="filled" />    
              Signup
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
