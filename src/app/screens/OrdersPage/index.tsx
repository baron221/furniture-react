import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import "../../../css/order.css"
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import ProcessOrders from "../../components/orders/processOrders";
import FinishedOrders from "../../components/orders/finishedOrders";
import CurrentOrders from "../../components/orders/currentOrders";
import Marginer from "../../components/marginer";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { Fade } from "react-awesome-reveal";


export function OrdersPage(props: any) {
    

    const [value, setValue] = useState("1");
    useEffect(() => {

    }, [props.orderRebuild])
    /** HANDLERS */
    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);
    }
    return (
        <div className="order_page">
            <Container
                maxWidth="lg"
                style={{ display: "flex", flexDirection: "row", marginTop: "50px", marginBottom: "50px" }}
            >
                <Stack className="order_left">
                    <TabContext value={value} >
                        <Box className="order_nav_frame">
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }} 
>
                                <TabList
                                    onChange={handleChange}
                                    value={value}
                                    aria-label="basic tabs example"
                                    style={{ display: "flex", justifyContent: "space-between", color: "#03296e",fontFamily: "Space Grotesk, sans-serif;"  }}
                                    className="tablist_order"
                                >
                                    <Tab  label="My Orders" value={"1"} />
                                    <Tab label="Process" value={"2"} />
                                    <Tab label="Finished" value={"3"} />
                                </TabList>
                            </Box>
                        </Box>
                        <Stack className="order_main_content">
                            <CurrentOrders setOrderRebuild={props.setOrderRebuild} />
                            <ProcessOrders setOrderRebuild={props.setOrderRebuild} />
                            <FinishedOrders setOrderRebuild={props.setOrderRebuild} />
                        </Stack>
                    </TabContext>
                </Stack>
                <Stack className="order_right">
                <Fade direction="right">
                    <Stack className="order_info_box">
                        <Stack sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Box className="order_user_img">
                                <img src={"/iconsfurnis/user.png"} className="order_user_avatar" alt="" />
                                <Box className="order_user_icon_box">
                                    <img src="/iconsfurnis/user.png" className="order_user_prof_img" alt="" />
                                </Box>
                            </Box>
                            <span className="order_user_name">Baron</span>
                            <span className="order_user_prof">{}</span>
                            <Box sx={{ width: "250%", marginTop: "40px", marginBottom: "8px" }}>
                                <Marginer
                                    direction="horizontal"
                                    height="3"
                                    width="200%"
                                    bg="grey"
                                />
                            </Box>

                        </Stack>
                        <Stack className="order_user_address">
                            <Box sx={{ display: "flex" }}>
                                <LocationOnRoundedIcon />
                            </Box>
                            <Box className="spec_address_text">{}</Box>
                        </Stack>
                    </Stack>
                    <Stack className="order_info_box">
                        <input className="card_input" type="text" name="card_number" placeholder="Card number: 1234 7456 5678 9012" />
                        <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <input type="text" name="card_period" placeholder="07 / 24" className="card_half_input" />
                            <input type="text" name="card_cvv" placeholder="CVV : 013" className="card_half_input" />
                        </Stack>
                        <input type="text" name="card_creator" placeholder="BARON" className="card_input" />
                        <Stack className="card_box">
                            <img src="http://papays.uz/icons/master_card.svg" alt="2" />
                            <img width={'40px'} src="/iconsfurnis/paypal.png" alt="3" />
                            <img width={'35px'} src="/iconsfurnis/visa.png" alt="4" />
                        </Stack>
                    </Stack>
                    </Fade>
                </Stack>
                
            </Container>

        </div>
    );
}