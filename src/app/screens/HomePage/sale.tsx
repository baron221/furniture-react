import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom";

export function Sale() {
  return (
    <div className="sale_frame">
      <Stack>
        <Fade>
          <Box>
            <img src="/imagesfurnis/sale.svg" alt="" />
          </Box>
        </Fade>
        <Box>
          <Typography>SALE UP TO 35% OFF</Typography>
          <Typography>
            HUNDREDS of <br />
            New lower prices!
          </Typography>
          <Typography>
          It’s more affordable than ever to give every room in your home a stylish makeover
          </Typography>
              <Link to="/shop">
                  Shop now <img src="/iconsfurnis/arrow-right.svg" alt="" />
                </Link>
        </Box>
      </Stack>
    </div>
  );
}
