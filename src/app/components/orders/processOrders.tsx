import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@material-ui/lab/TabPanel";
import moment from "moment";
//REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { serviceApi } from "../../../lib/config";

import { retrieveProcessOrders } from "../../screens/OrdersPage/selector";
import { Order } from "../../../types/order";
import { Product } from "../../../types/product";
import {
  sweetErrorHandling,
  sweetFailureProvider,
} from "../../../lib/sweetAlert";
import OrderApiService from "../../apiServices/orderApiServices";

/**REDUX SELECTOR */
const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({
    processOrders,
  })
);

/**REDUX SLICE */

export default function ProcessOrders(props: any) {
  /** INITIALIZATIONS */
  const { processOrders } = useSelector(processOrdersRetriever);

  const finishOrderHandler = async (event: any) => {
    try {
      const order_id = event.target.value;
      const data = { order_id: order_id, order_status: "FINISHED" };
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

  return (
    <TabPanel value="2">
      <Stack>
        {processOrders.map((order:Order) => {
          return (
            <Box className="order_main_box">
              <Box className="order_box_scroll">
                {order.order_items.map((item) => {
                  const product: Product = order.product_data.filter(
                    (ele) => ele._id === item.product_id
                  )[0];
                  const image_path = `${serviceApi}/${product?.product_images[0]}`;
                  return (
                    <Box className="ordersName_price">
                      <img className="orderDishImg" src={image_path} alt="" />
                      <p className="titleDish"> {product?.product_name}</p>
                      <Box className="priceBox">
                        <p>${item.item_price}</p>
                        <img src="/iconsfurnis/Close.svg" alt="" />
                        <p>{item.item_quantity}</p>
                        <img src="/iconsfurnis/Pause.svg" alt="" />
                        <p style={{ marginLeft: "15px" }}>${item.item_price * item.item_quantity}</p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box className="total_price_box blue_solid">
                <Box className="boxTotal">
                  <p>Price of Product </p>
                  <p>${order.order_total_amount - order.order_delivery_cost}</p>
                  <img
                    src="/iconsfurnis/Plus.svg"
                    style={{ marginLeft: "20px" }}
                    alt=""
                  />
                  <p>Delivery Service</p>
                  <p>${order.order_delivery_cost}</p>
                  <img
                    src="/iconsfurnis/Pause.svg"
                    style={{ marginLeft: "20px" }}
                    alt=""
                  />
                  <p>All</p>
                  <p>${order.order_total_amount}</p>
                  <p style={{ fontWeight: "500", fontSize: "16px" }}>
                    {moment().format("YY-MM-DD HH:mm")}
                  </p>
                  <Button
                    value={order._id}
                    onClick={finishOrderHandler}
                    sx={{
                      borderRadius: "10px",
                      background: "#0288d1",
                      ml: "40px",
                    }}
                    variant="contained"
                  >
                    Complete
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </TabPanel>
  );
}
