import React, { useState } from "react";
import {Box, Drawer, IconButton, Tooltip} from "@mui/material";
import { useLocation } from "react-router-dom";
import Tiptap from "./Tiptap.tsx";
import BlogOutline from "./BlogOutline.tsx";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CloseIcon from '@mui/icons-material/Close';
const EditBlog = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const blog = location.state?.blog;

    return (
        <Box display="flex" height="100vh" width="100vw">
            <Box flex={isOpen ? 2 : 3}>
                <Tiptap />
            </Box>

            <Tooltip title="AI suggestions">
                <IconButton
                    onClick={() => setIsOpen(!isOpen)}
                    sx={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
                >
                    <LightbulbIcon />
                </IconButton>
            </Tooltip>

            <Drawer
                anchor="right"
                variant="persistent"
                open={isOpen}
                sx={{
                    flexShrink: 0,
                    width: isOpen ? "33.33%" : 0,
                    "& .MuiDrawer-paper": {
                        width: "33.33%",
                        transition: "width 0.3s ease",
                        display: "flex",
                        alignItems: "stretch",
                    },
                }}
            >
                <Box display="flex" justifyContent="flex-end" p={1}>
                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {blog && <BlogOutline blog={blog} />}
            </Drawer>
        </Box>
    );
};

export default EditBlog;
