import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

export function Sale() {
  return (
    <div className="sale_frame">
     

      <Stack flexDirection={'row'} >
        <Fade direction="left">
          <Box>
            <img width="822px"  src="/imagesfurnis/sales.svg" alt="" />
          </Box>
        </Fade>
        <Fade direction="right" >

        <Box className='sale_right_side'>
          <Box color={'blue'} fontSize={'16px'} marginTop={'20px'}>SALE UP TO 35% OFF</Box>
          <Box fontSize={'40px'}  marginTop={'20px'}>
            HUNDREDS of <br />
            New lower prices!
          </Box>
          <Box fontSize={'20px'}  marginTop={'20px'} marginBottom={'20px'}>
            It’s more affordable than ever to give every room in your home a
            stylish makeover
          </Box>
          <Link to="/shop"  >
            Shop now <img src="/iconsfurnis/arrow-right.svg" alt="" />
          </Link>
        </Box>
        </Fade>
      </Stack>
    </div>
  );
}
