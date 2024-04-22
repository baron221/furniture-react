import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from '@material-ui/lab/TabPanel';
import moment from "moment";

//REDUX

import { retrieveFinishedOrders } from "../../screens/OrdersPage/selector";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders) => ({
        finishedOrders,
    })
  );
const finishedOrders = [
    [1,2,3],
    [1,2,3],
    [1,2,3],

]

export default function FinishedOrders(props: any) {
    // const {finishedOrders} = useSelector(finishedOrdersRetriever)

    return (
        <TabPanel value="3">
            <Stack>
                {finishedOrders.map((order) => {
                    return (
                        <Box className="order_main_box">
                            <Box className="order_box_scroll">
                                {order.map((item) => {
                                    const image_path = `/imagesfurnis/shopimages/prod4.jpg`
                                    return (
                                        <Box className="ordersName_price">
                                            <img className="orderDishImg" src={image_path} alt="" />
                                            <p className="titleDish">Arm Chair</p>
                                            <Box className="priceBox">
                                                <p>$15</p>
                                                <img src="/icons/Close.svg" alt="" />
                                                <p></p>
                                                <img src="/icons/Pause.svg" alt="" />
                                                <p style={{ marginLeft: "15px" }}>$15</p>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Box>
                            <Box className="total_price_box red_solid">
                                <Box className="boxTotal">
                                <p>Price of Product </p>
                                    <p>$15</p>
                                    <img src="/icons/Plus.svg" style={{ marginLeft: "20px" }} alt="" />
                                    <p>Delivery Service</p>
                                    <p>$15</p>
                                    <img src="/icons/Pause.svg" style={{ marginLeft: "20px" }} alt="" />
                                    <p>All</p>
                                    <p>$15</p>

                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Stack>
        </TabPanel>
    )
}