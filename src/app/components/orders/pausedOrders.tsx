
import  React from "react"
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@material-ui/lab/TabPanel";
import { Fade } from "react-awesome-reveal";
import { Product } from "../../../types/product";

//REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { serviceApi } from "../../../lib/config"
import { retrievePausedOrders } from "../../screens/OrdersPage/selector";
import { Order } from "../../../types/order";



/**REDUX SELECTOR */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);


export default function PausedOrders(props: any) {
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  /*INITIALIZATION*/
  return (
    <>
      <Fade direction="left">
        <TabPanel value="1">
          <Stack>
            {pausedOrders?.map((order: Order) => {

              return (
                <Box className="order_main_box">
                  <Box className="order_box_scroll">
                    {order.order_items.map((item) => {
                      const product: Product = order.product_data.filter(
                        (ele) => ele._id === item.product_id
                      )[0];
                      const image_path = `${serviceApi}/ ${product.product_images[0]}`;
                      return (
                        <Box className="ordersName_price">
                          <img
                            className="orderDishImg"
                            src={image_path}
                            alt=""
                          />
                          <p className="titleDish">{product.product_name}</p>
                          <Box className="priceBox">
                            <p>${item.item_price}</p>
                            <img src="/icons/Close.svg" alt="" />
                            <p>{item.item_quantity}</p>
                            <img src="/icons/Pause.svg" alt="" />
                            <p style={{ marginLeft: "15px" }}>${item.item_price*item.item_quantity}</p>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                  <Box className="total_price_box black_solid">
                    <Box className="boxTotal">
                      <p>Price of Product</p>
                      <p>${order.order_total_amount - order.order_delivery_cost}</p>
                      <img
                        src="/icons/Plus.svg"
                        style={{ marginLeft: "20px" }}
                        alt=""
                      />
                      <p>Delivery Service </p>
                      <p>${order.order_delivery_cost}</p>
                      <img
                        src="/icons/Pause.svg"
                        style={{ marginLeft: "20px" }}
                        alt=""
                      />
                      <p>All</p>
                      <p>${order.order_total_amount}</p>

                      <Button
                        variant="contained"
                        sx={{ mx: "25px" }}
                        style={{ borderRadius: "10px" }}
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        style={{ borderRadius: "10px" }}
                        color="secondary"
                      >
                        Pay
                      </Button>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </TabPanel>
      </Fade>
    </>
  );
}
