import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@material-ui/lab/TabPanel";
import { Fade } from "react-awesome-reveal";
import { Product } from "../../../types/product";

//REDUX
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { serviceApi } from "../../../lib/config";
import { retrievePausedOrders } from "../../screens/OrdersPage/selector";
import { Order } from "../../../types/order";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiServices";

/**REDUX SELECTOR */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);

export default function PausedOrders(props: any) {
  /*INITIALIZATION*/
  const { pausedOrders } = useSelector(pausedOrdersRetriever);
  /** HANDLERS**/
  const deleteOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "DELETED" };
      if (!localStorage.getItem("member_data")) {
        await sweetFailureProvider("Please login first", true);
      }

      let confirmation = window.confirm("Do you want to cancel your order?");
      if (confirmation) {
        const orderService = new OrderApiService();
        orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date())
      }
    } catch (err) {
      console.log("deleteOrderhandler , ERROR::", err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "PROCESS" };
      if (!localStorage.getItem("member_data")) {
        await sweetFailureProvider("Please login first", true);
      }

      let confirmation = window.confirm(
        "Do you confirm to pay for your order?"
      );
      if (confirmation) {
        const orderService = new OrderApiService();
        orderService.updateOrderStatus(data);
        props.setOrderRebuild(new Date())

      }
    } catch (err) {
      console.log("processOrderhandler , ERROR::", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Fade direction="left">
      <TabPanel value="1">
        <Stack>
          {pausedOrders?.map((order: Order) => {
            return (
              <Box className="order_main_box">
                <Box className="order_box_scroll">
                  {order?.order_items?.map((item) => {
                    const product: Product = order.product_data.filter(
                      (ele) => ele._id === item?.product_id
                    )[0];
                    const image_path = `${serviceApi}/${product?.product_images[0]}`;
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
                <Box className="total_price_box black_solid">
                  <Box className="boxTotal">
                    <p>Price of Product</p>
                    <p>
                      ${order?.order_total_amount - order?.order_delivery_cost}
                    </p>
                    <img
                      src="/iconsfurnis/Plus.svg"
                      style={{ marginLeft: "20px" }}
                      alt=""
                    />
                    <p>Delivery Service </p>
                    <p>${order?.order_delivery_cost}</p>
                    <img
                      src="/iconsfurnis/Pause.svg"
                      style={{ marginLeft: "20px" }}
                      alt=""
                    />
                    <p>All</p>
                    <p>${order?.order_total_amount}</p>

                    <Button
                      value={order?._id}
                      onClick={deleteOrderHandler}
                      variant="contained"
                      sx={{ mx: "25px" }}
                      style={{ borderRadius: "10px" }}
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      value={order?._id}
                      onClick={processOrderHandler}
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
  );
}
