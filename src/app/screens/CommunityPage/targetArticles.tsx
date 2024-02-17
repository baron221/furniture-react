import { Box, Link, Stack } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Checkbox } from "@mui/material";
import moment from "moment";

export function TargetArticles(props: any) {
  const { setArticlesRebuild } = props;
  /** HANDLERS */

  return (
    <Stack>
      {props.targetBoArticles?.map((article: any, index: string) => {
        const art_img_url = "/iconsfurnis/image.png";
        return (
          <Link
            className="all_article_box"
            sx={{ textDecoration: "none" }}
            href={""}
          >
            <Box
              className="all_article_img"
              sx={{ backgroundImage: `url(${art_img_url})` }}
            >
              {" "}
            </Box>
            <Box className="all_article_container">
              <Box alignItems={"center"} display={"flex"}>
                <img
                  src="/iconsfurnis/user.png"
                  width={"35px"}
                  style={{ borderRadius: "50%", backgroundSize: "cover" }}
                  alt=""
                />
                <span className="all_article_author_user">BARON </span>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ mt: "15px" }}
              >
                <span className="all_article_title">Furniture</span>
                <p className="all_article_desc">Ikea shop</p>
              </Box>
              <Box>
                <Stack className="article_share">
                  <Box
                    className="article_share_main"
                    sx={{
                      color: "rgb(255,255,255)",
                      ml: "150px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      {moment(article?.createdAt).format("YY_MM_DD HH:mm")}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "20px",
                      }}
                    >
                      <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite style={{ color: "red" }} />}
                        checked={false}
                      />
                      <span style={{ marginRight: "18px" }}></span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "20px",
                      }}
                    >
                      <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                      <span style={{ marginRight: "18px" }}>{}</span>
                    </div>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
}
