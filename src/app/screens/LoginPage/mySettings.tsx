import { CloudDownload } from "@mui/icons-material";
import { Avatar, Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import assert from "assert";
import { verifiedMemberData } from "../../apiServices/verify";
import { MemberUpdateData } from "../../../types/user";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiServices";

export function Mysettings() {
  /** INITIALIZATIONS */
  const [file, setFile] = useState(verifiedMemberData?.mb_image);
  const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
    mb_nick: "",
    mb_phone: "",
    mb_description: "",
    mb_image: "",
    mb_address: "",
  });
  /*HANDLERS */
  const changeMemberNickHandler = (e: any) => {
    memberUpdate.mb_nick = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberPhoneHandler = (e: any) => {
    memberUpdate.mb_phone = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberAddressHandler = (e: any) => {
    memberUpdate.mb_address = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const changeMemberDescriptionHandler = (e: any) => {
    memberUpdate.mb_description = e.target.value;
    setMemberUpdate({ ...memberUpdate });
  };
  const handleImagePreviewer = (e: any) => {
    try {
      console.log(e.target.files);
      const file = e.target.files[0];
      const fileType = file["type"],
        validTypes = ["image/.jpg", "image/.jpeg", "image/.png"];
      assert.ok(!validTypes.includes(fileType) && file, Definer.input_err2);
      memberUpdate.mb_image = file;
      setMemberUpdate({ ...memberUpdate });
      setFile(URL.createObjectURL(file));
    } catch (err) {
      console.log(`ERROR:::handleImagePreview ${err}`);
      sweetErrorHandling(err).then();
    }
  };
  const handleSubmitButton = async () => {
    try {
      assert.ok(
        memberUpdate.mb_nick !== "" || memberUpdate.mb_phone !== "",
        Definer.input_err1
      );
      const memberService = new MemberApiService();
      const result = await memberService.updateMemberData(memberUpdate);
      assert.ok(result, Definer.general_err2);
      await sweetTopSmallSuccessAlert("MODIFIED successfully!", 700, false);
      window.location.reload();
    } catch (err) {
      console.log(`ERROR:::handleSubmitButton ${err}`);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack className="my_settings_page">
      <Box className="member_media_frame">
        <img
          src={file}
          className="mb_image"
          style={{ borderRadius: "50%" }}
          width={"100px"}
          height={"100px"}
        />
        <div className="media_change_box">
          <span>Upload Image</span>
          <p>JPG, JPEG, PNG will be uploaded only!</p>
          <div className="up_del_box">
            <Button
              component="label"
              style={{ minWidth: "0" }}
              onChange={handleImagePreviewer}
            >
              <CloudDownload />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className="input_frame">
        <div className="long_input">
          <label className="spec_label">Name</label>
          <input
            className="spec_input mb_nick"
            placeholder={verifiedMemberData?.mb_nick}
            type="text"
            name="mb_nick"
            onChange={changeMemberNickHandler}
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="short_input">
          <label className="spec_label">Phone number </label>
          <input
            className="spec_input mb_phone"
            placeholder={verifiedMemberData?.mb_phone}
            type="text"
            name="mb_phone"
            onChange={changeMemberPhoneHandler}

          />
        </div>
        <div className="short_input">
          <label className="spec_label">Address</label>
          <input
            className="spec_input mb_phone"
            placeholder={
              verifiedMemberData?.mb_address ?? "Address not available"
            }
            type="text"
            name="mb_phone"
            onChange={changeMemberAddressHandler}
          />
        </div>
      </Box>
      <Box className="input_frame">
        <div className="long_input">
          <label className="spec_label">Information</label>
          <textarea
            name="mb_description"
            placeholder={
              verifiedMemberData?.mb_description ?? "Description not available"
            }
            className="spec_textarea mb_description"
            onChange={changeMemberDescriptionHandler}
          />
        </div>
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} sx={{ mt: "25px" }}>
        <Button variant="contained" onClick={handleSubmitButton}>
          Save
        </Button>
      </Box>
    </Stack>
  );
}
