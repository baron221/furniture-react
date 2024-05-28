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
import { useHistory } from "react-router-dom";

import { setMemberFollowings } from "./slice";
import { retrieveMemberFollowings } from "./selector";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { Following } from "../../../types/follow";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { FollowSeachObj } from "../../../types/others";
import FollowApiService from "../../apiServices/followApiService";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { serviceApi } from "../../../lib/config";

/**REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setMemberFollowings: (data: Following[]) =>
    dispach(setMemberFollowings(data)),
});

/**REDUX SELECTOR */
const memberFollowingsRetriever = createSelector(
  retrieveMemberFollowings,
  (memberFollowings) => ({ memberFollowings })
);

export function MemberFollowing(props: any) {
  // INITIALIZATIONS
  const history = useHistory();

  const { setFollowRebuild, mb_id, followRebuild } = props;
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriever);
  const [followingsSearchObj, setFollowingsSearchObj] =
    useState<FollowSeachObj>({
      page: 1,
      limit: 5,
      mb_id: mb_id,
    });

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowings(followingsSearchObj)
      .then((data) => setMemberFollowings(data))
      .catch((err) => console.log(err));
  }, [followingsSearchObj, followRebuild]);

  /*HANDLERS*/
  const unSubscribeHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
      const followService = new FollowApiService();
      await followService.unsubscribe(id);
      await sweetTopSmallSuccessAlert("unsubscribed successfully", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handlePaginationChange = (event: any, value: number) => {
    followingsSearchObj.page = value;
    setFollowingsSearchObj({ ...followingsSearchObj });
  };
  const visitMemberHandler = (mb_id: string) => {
    history.push(`/member-page/other?mb_id=${mb_id}`);
    document.location.reload();
  };
  return (
    <Stack>
      {memberFollowings.map((following: Following) => {
        const image_url = following?.follow_member_data?.mb_image
          ? `${serviceApi}/${following?.follow_member_data?.mb_image}`
          : "/iconsfurnis/user.png";
        return (
          <Box className="follow_box">
            <Avatar
              style={{ cursor: "pointer" }}
              onClick={() => visitMemberHandler(following?.follow_id)}
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
                {following?.follow_member_data?.mb_type}
              </span>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => visitMemberHandler(following?.follow_id)}
                className="name_text"
              >
                {following?.follow_member_data?.mb_nick}
              </span>
            </div>
            {props.actions_enoubled && (
              <Button
                variant="contained"
                className="follow_cancel_btn"
                onClick={(e) => unSubscribeHandler(e, following?.follow_id)}
              >
                Unfollow
              </Button>
            )}
          </Box>
        );
      })}
      ;
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
            onChange={handlePaginationChange}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
