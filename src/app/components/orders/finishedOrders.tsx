import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@material-ui/lab/TabPanel";
import moment from "moment";

//REDUX

import { retrieveFinishedOrders } from "../../screens/OrdersPage/selector";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { serviceApi } from "../../../lib/config";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({
    finishedOrders,
  })
);

export default function FinishedOrders(props: any) {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value="3">
      <Stack>
        {finishedOrders.map((order: Order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order?.order_items?.map((item) => {
                  const product: Product = order?.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const image_path = `${serviceApi}/ ${product?.product_images[0]}`;
                  return (
                    <Box className="ordersName_price">
                      <img className="orderDishImg" src={image_path} alt="" />
                      <p className="titleDish">{product?.product_name}</p>
                      <Box className="priceBox">
                        <p>${item?.item_price}</p>
                        <img src="/iconsfurnis/Close.svg" alt="" />
                        <p>{item?.item_quantity}</p>
                        <img src="/iconsfurnis/Pause.svg" alt="" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item?.item_price * item?.item_quantity}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total_price_box red_solid">
                <Box className="boxTotal">
                  <p>Price of Product </p>
                  <p>${order?.order_total_amount - order?.order_delivery_cost}</p>
                  <img
                    src="/iconsfurnis/Plus.svg"
                    style={{ marginLeft: "20px" }}
                    alt=""
                  />
                  <p>Delivery Service</p>
                  <p>${order?.order_delivery_cost}</p>
                  <img
                    src="/iconsfurnis/Pause.svg"
                    style={{ marginLeft: "20px" }}
                    alt=""
                  />
                  <p>All</p>
                  <p>${order?.order_total_amount}</p>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
