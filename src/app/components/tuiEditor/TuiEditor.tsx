import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";

import "@toast-ui/editor/dist/toastui-editor.css";

import assert from "assert";
import { useHistory } from "react-router-dom";
import CommunityApiService from "../../apiServices/communityApiService";
import { CommunityArticleInput } from "../../../types/Communtiy";
import { serviceApi } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import { Definer } from "../../../lib/Definer";

export const TuiEditor = (props: any) => {
  const history = useHistory();
  /*INITIALIZATION*/
  const editorRef = useRef();
  const [communityArticleData, setCommunityArticleData] =
    useState<CommunityArticleInput>({
      art_subject: "",
      bo_id: "",
      art_content: "",
      art_image: "",
    });

  /** HANDLERS */
  const uploadImage = async (image: any) => {
    try {
      const communityService = new CommunityApiService();
      const image_name = await communityService.uploadImageToServer(image);
      communityArticleData.art_image = image_name;
      setCommunityArticleData({ ...communityArticleData });

      const source = `${serviceApi}/${image_name}`;
      return source;
    } catch (err) {
      console.log("ERROR,uploadImage:", err);
    }
  };
  const changeCategoryHandler = (e: any) => {
    communityArticleData.art_subject = e.target.value;
    setCommunityArticleData({ ...communityArticleData });
  };

  //   const changeTitleHandler = (e: any) => {
  //     communityArticleData.bo_id = e.target.value;
  //     setCommunityArticleData({ ...communityArticleData });
  //   };
  const changeTitleHandler = useCallback(
    (e: any) => {
      communityArticleData.art_subject = e.target.value;
      setCommunityArticleData({ ...communityArticleData });
    },
    [communityArticleData.art_subject]
  );

  const handleRegisterButton = async () => {
    try {
      const editor: any = editorRef.current;
      const art_content = editor?.getInstance().getHTML();
      console.log(art_content);
      communityArticleData.art_content = art_content;
      assert.ok(
        communityArticleData.art_content !== "" &&
          communityArticleData.bo_id !== "" &&
          communityArticleData.art_subject !== "",
        Definer.input_err1
      );
      const communityService = new CommunityApiService();
      await communityService.createArticle(communityArticleData);
      await sweetTopSuccessAlert("Article is created succesfully!");
      props.setValue("1");
      props.setArticlesRebuild(new Date())
    } catch (err) {
      console.log("ERROR:::handleRegisterButton:", err);

      sweetErrorHandling(err).then();
    }
  };
  return (
    <Stack>
      <Stack
        direction={"row"}
        style={{ margin: "40px" }}
        justifyContent={"space-evenly"}
      >
        <Box className="form_row" style={{ width: "300px" }}>
          <Typography
            style={{ color: "rgb(255 255 233", margin: "10px" }}
            variant="h3"
          >
            Category
          </Typography>
          <FormControl sx={{ width: "100%", background: "white" }}>
            <Select
              onChange={changeCategoryHandler}
              value={communityArticleData.art_subject}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <span>Choose the Category</span>
              </MenuItem>
              <MenuItem value="celebrity">celebrity</MenuItem>
              <MenuItem value="evaluation">evaluation</MenuItem>
              <MenuItem value="story">My story</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className="form_row" style={{ width: "300px" }}>
          <Typography
            style={{ color: "rgb(255 255 233", margin: "10px" }}
            variant="h3"
          >
            Theme
          </Typography>
          <TextField
            id="filled_basic"
            label="Mavzu"
            variant="filled"
            style={{ width: "300px", background: "white" }}
            onChange={changeTitleHandler}
          />
        </Box>
      </Stack>
      {/* @ts-ignore */}
      <Editor
        initialValue="Type here"
        placeholder="Type here"
        previewStyle="vertical"
        height="640px"
        initialEditType="wysiwyg"
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["image", "table", "link"],
          ["ul", "ol", "task"],
        ]}
        hooks={{
          addImageBlobHook: async (image: any, callback: any) => {
            const uploadImageURL = await uploadImage(image);
            console.log("upoladImageUrl", uploadImageURL);
            callback(uploadImageURL);
            return false;
          },
        }}
        events={{
          load: function (param: any) {},
        }}
      />
      <Stack direction={"row"} justifyContent={"center"}>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "30px", width: "250px", height: "45px" }}
          onClick={handleRegisterButton}
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
};
