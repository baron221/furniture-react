import {
  Avatar,
  Box,
  Button,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { setMemberFollowers, setMemberFollowings } from "./slice";
import { retrieveMemberFollowers } from "./selector";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { Follower } from "../../../types/follow";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import FollowApiService from "../../apiServices/followApiService";
import { FollowSeachObj } from "../../../types/others";
import { serviceApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";

/**REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setMemberFollowers: (data: Follower[]) => dispach(setMemberFollowers(data)),
});

/**REDUX SELECTOR */
const memberFollowersRetriever = createSelector(
  retrieveMemberFollowers,
  (memberFollowers) => ({ memberFollowers })
);

export function MemberFollowers(props: any) {
  // INITIALIZATIONS
  const { setFollowRebuild, mb_id, followRebuild } = props;
  const { setMemberFollowers } = actionDispatch(useDispatch());
  const { memberFollowers } = useSelector(memberFollowersRetriever);

  const [value, setValue] = React.useState("1");
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };
  const [followersSearchObj, setFollowersSearchObj] = useState<FollowSeachObj>({
    page: 1,
    limit: 5,
    mb_id: mb_id,
  });

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowers(followersSearchObj)
      .then((data) => setMemberFollowers(data))
      .catch((err) => console.log(err));
  }, [followersSearchObj, followRebuild]);

  /*HANDLERS*/
  const subscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const followService = new FollowApiService();
      await followService.subscribe(id);
      await sweetTopSmallSuccessAlert("subscribed successfully", 700, false);
      setFollowRebuild(followRebuild);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  const handlePaginationChange = (event: any, value: number) => {
    followersSearchObj.page = value;
    setFollowersSearchObj({ ...followersSearchObj });
  };

  return (
    <Stack>
      {memberFollowers.map((follower: Follower) => {
        const image_url = follower?.subscriber_member_data?.mb_image
          ? `${serviceApi}/${follower?.subscriber_member_data?.mb_image}`
          : "/iconsfurnis/user.png";
        return (
          <Box className="follow_box">
            <Avatar
              style={{ cursor: "pointer" }}
              alt=""
              src={image_url}
              sx={{ width: 89, height: 89 }}
            />
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                height: "85%",
              }}
            >
              <span className="username_text">
                {follower.subscriber_member_data?.mb_type}
              </span>
              <span style={{ cursor: "pointer" }} className="name_text">
                {follower.subscriber_member_data?.mb_nick}
              </span>
            </div>
            {props.actions_enoubled &&
              (follower?.me_followed &&
              follower?.me_followed[0]?.my_following ? (
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
                  onClick={(e) => subscribeHandler(e, follower?.subscriber_id)}
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
            count={
              followersSearchObj.page >= 3 ? followersSearchObj.page + 1 : 3
            }
            page={followersSearchObj.page}
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
            onChange={handlePaginationChange}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
