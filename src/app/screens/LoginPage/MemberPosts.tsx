import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import { Box, Checkbox, Stack } from "@mui/material";
import moment from "moment"; 
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"

import assert from "assert";


export function MemberPosts(props: any) {
    const { chosenMemberBoArticles, renderChosenArticleHandler, setArticlesRebuild } = props;

const image_url = '/iconsfurnis/image.png'
return <div>
    <Box className="post_content">
        {[1,2,3,4].map((article ) => {
            const image_path =  image_url
            return (
                <Stack
                    className="all_article_box" sx={{ cursor: "pointer" }}>
                    <Box className="all_article_img"
                        sx={{ backgroundImage: `url(${image_path})` }}>
                    </Box>
                    <Box className="all_article_container">
                        <Box alignItems="center" display={"flex"}>
                            <img src={"/iconsfurnis/user.png"
                            } width={"35px"} height={"35px"}
                                style={{ borderRadius: "50%", backgroundSize: "cover" }} />
                            <span className="all_article_author_user">Baron</span>
                        </Box>
                        <Box display={"flex"} flexDirection={"column"} sx={{ mt: "15px" }}>
                            <span className="all_article_title">About Living Room Furniture</span>
                            <p className="all_article_desc">The Best furnitures  ever</p>
                        </Box>
                        <Box>
                            <Box className="article_share" style={{ width: "100%", height: "auto" }}
                                sx={{ mb: "10px" }}>
                                <Box
                                    className="article_share_main"
                                    style={{
                                        color: "#fff",
                                        marginLeft: "150px",
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    <span>{moment(article).format("YY-MM-DD HH:mm")}</span>
                                    <Checkbox
                                        sx={{ ml: "40px" }}
                                        icon={<FavoriteBorder />}
                                        checkedIcon={<Favorite style={{ color: "red" }} />}
                                        checked={ false}
                                    />

                                    <span style={{ marginRight: "18px" }}></span>

                                    <RemoveRedEyeIcon />
                                    <span style={{ marginLeft: "18px" }}></span>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            )
        })}
    </Box>

</div>
}