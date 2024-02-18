import { Box, Button, FormControl, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { Editor } from '@toast-ui/react-editor';

import "@toast-ui/editor/dist/toastui-editor.css";

import assert from "assert";
import { useHistory } from "react-router-dom";

export const TuiEditor = (props: any) => {

    const history = useHistory();
    /** HANDLERS */

    const changeCategoryHandler = (e: any) => {
      
    }



    
    return (
        <Stack>
            <Stack direction={"row"} style={{ margin: "40px" }} justifyContent={"space-evenly"}>
                <Box className="form_row" style={{ width: "300px" }}>
                    <Typography style={{ color: "rgb(255 255 233", margin: "10px" }} variant="h3">
                        Category
                    </Typography>
                    <FormControl sx={{ width: "100%", background: "white" }}>
                        <Select
                            value={1} displayEmpty inputProps={{ "aria-label": "Without label" }}>
                            <MenuItem value=""><span>Categoriyani tanlang</span></MenuItem>
                            <MenuItem value="celebrity">Mashhurlar</MenuItem>
                            <MenuItem value="evaluation">Restaurant baho</MenuItem>
                            <MenuItem value="story">Mening hikoyam</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box className="form_row" style={{ width: "300px" }}>
                    <Typography style={{ color: "rgb(255 255 233", margin: "10px" }} variant="h3">
                        Mavzu
                    </Typography>
                    <TextField
                        id="filled_basic"
                        label="Mavzu"
                        variant="filled"
                        style={{ width: "300px", background: "white" }}
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
                    ["ul", "ol", "task"]
                ]}
             
                events={{
                    load: function (param: any) { },
                }}
            />
            <Stack direction={"row"} justifyContent={"center"}>
                <Button
                    variant="contained" color="primary" style={{ margin: "30px", width: "250px", height: "45px" }}>
                    Register
                </Button>
            </Stack>
        </Stack>
    )
            }