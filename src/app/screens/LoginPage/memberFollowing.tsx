import { Avatar, Box, Button, Pagination, PaginationItem, Stack } from "@mui/material"

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useHistory } from "react-router-dom";


const followings = [
    {mb_nick:"Bahromjon"},
    {mb_nick:"Nusratjon" },
    {mb_nick:"MuhammadAyyub" },

]



export function MemberFollowing(props: any) {
  
    return (
        <Stack>
            {followings.map((following) => {
                const image_url =  "/iconsfurnis/user.png";
                return (
                    <Box className="follow_box">
                        <Avatar
                            style={{ cursor: "pointer" }}
                            alt="" src={image_url} sx={{ width: 89, height: 89 }} />
                        <div
                            style={{
                                width: "400px",
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "25px",
                                height: "85%"
                            }}
                        >
                            <span className="username_text">Ayyub</span>
                            <span
                                style={{ cursor: "pointer" }}
                                className="name_text">Salom</span>
                        </div>
                        {props.actions_enoubled && (
                            <Button
                                variant="contained"
                                startIcon={
                                    <img
                                        src="/icons/follow_icon.png"
                                        style={{ width: "40px" }}
                                    />
                                }
                                className="follow_cancel_btn"
                            >
                                Unfollow
                            </Button>
                        )}
                    </Box>
                )
            })};
            <Stack
                sx={{ my: "40px" }}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Box className="bottom_box">
                    <Pagination
                        count={ 3}
                        page={2}
                        renderItem={(item) => (
                            <PaginationItem
                                components={{
                                    previous: ArrowBackIcon,
                                    next: ArrowForwardIcon,
                                }}
                                {...item}
                                color={"secondary"}
                            />
                        )}
                    />
                </Box>
            </Stack>
        </Stack>
    )
}