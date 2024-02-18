import { Avatar, Box, Button, Pagination, PaginationItem, Stack } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";



const followers = [
    {mb_nick:"Bahromjon" , following:true},
    {mb_nick:"Nusratjon" , following:true},
    {mb_nick:"MuhammadAyyub" , following:true},

]



export function MemberFollowers(props: any) {
    // INITIALIZATIONS


    return (
        <Stack>
            {followers.map((follower) => {
                const image_url = "/iconsfurnis/user.png";
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
                                height: "85%",
                            }}
                        >
                            <span
                                className="username_text">
                            </span>
                            <span
                                style={{ cursor: "pointer" }}
                                className="name_text">{follower.mb_nick}
                            </span>
                        </div>
                        {props.actions_enoubled &&
                            (follower.following ? (
                                <Button
                                    variant="contained"
                                    className="following_already"
                                    disabled
                                >
                                    Following
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    startIcon={
                                        <img
                                            src="/iconsfurnis/follow_icon.png"
                                            style={{ width: "40px" }}
                                        />
                                    }
                                    className="follow_btn"
                                >
                                    Follow Back
                                </Button>
                            ))}
                    </Box>
                );
            })}
            <Stack
                sx={{ my: "40px" }}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Box className="bottom_box">
                    <Pagination
                        count={3}
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
    );
}