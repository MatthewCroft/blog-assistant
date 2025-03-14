import React, {useEffect, useState} from "react";
import {Box, Drawer, IconButton, Tooltip, Typography} from "@mui/material";
import { useLocation } from "react-router-dom";
import Tiptap from "./Tiptap.tsx";
import BlogOutline from "./BlogOutline.tsx";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CloseIcon from '@mui/icons-material/Close';
import RefinementChat from "./RefinementChat.tsx";
import Cookies from "js-cookie";
import {Psychology, Tune} from "@mui/icons-material";

const EditBlog = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isRefinementOpen, setIsRefinementOpen] = useState(false);
    const [message, setMessage] = useState({ message: "", messageType: ""});
    const [chats, setChats] = useState([]);
    const [refinementsLoading, setRefinementsLoading] = useState(false);
    const location = useLocation();
    const blog = location.state?.blog;

    useEffect(() => {
        const refineSelection = async (message) => {
            const userName = Cookies.get("userName");

            if (!userName) return;
            if (!message.message.trim()) return;
            if (!message.messageType.trim()) return;

            setRefinementsLoading(true);
            setIsOpen(false);
            setIsRefinementOpen(true);

            console.log("calling refinement api");
            const response = await fetch("http://localhost:8080/api/refinement/refine", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName,
                    "blogName": blog.title,
                    "task": message.messageType,
                    "selectedHtml": message.message,
                    "context": "",
                    "style": ""
                }),
            });
            console.log("response returned");

            const data = await response.json(); // Assuming API returns HTML
            setRefinementsLoading(false);
            console.log(data);
            if (data.refinement) {
                setChats(prev => [...prev, data]);
            } else {
                console.error("Failed to send message");
            }
        }
        refineSelection(message);
    }, [message]);

    useEffect(() => {
        const getBlogRefinements = async () => {
            const blog = location.state?.blog;
            const userName = Cookies.get("userName");

            if (!userName) {
                console.error("there is no username, username must be set");
            }

            if (!blog) {
                console.error("there is no blog to edit");
            }

            const response = await fetch(`http://localhost:8080/api/refinement/refine?blogRefinements=${userName}-${blog.title}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const json = await response.json();
            if (!json) return;
            if (json.length > 0) {
                setChats(prevState => [...prevState, ...json]);
            }
            console.log(json);
        }
        getBlogRefinements();
    }, []);

    useEffect(() => {
        setRefinementsLoading(false);
    }, []);

    return (
        <Box display="flex" height="100vh" width="100vw">
            <Box flex={(isOpen || isRefinementOpen) ? 1 : 3}>
                <Tiptap setMessage={setMessage}/>
            </Box>
            <Tooltip title="Blog AI outline suggestions">
                <IconButton
                    onClick={() => setIsOpen(!isOpen)}
                    sx={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
                >
                    <Psychology />
                </IconButton>
            </Tooltip>
            <Tooltip title="AI refinements">
                <IconButton
                    onClick={() => setIsRefinementOpen(!isRefinementOpen)}
                    sx={{ position: "absolute", top: 20, right: 70, zIndex: 10 }}
                >
                    <Tune />
                </IconButton>
            </Tooltip>
            <Drawer
                anchor="right"
                variant="persistent"
                open={isRefinementOpen}
                sx={{
                    flex: isRefinementOpen ? 1 : 0,
                    flexShrink: 0,
                    width: isRefinementOpen ? "50%" : 0,
                    "& .MuiDrawer-paper": {
                        width: "50%",
                        transition: "width 0.3s ease",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        overflow: "hidden"
                    },
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" p={1}>
                    <Typography variant="h6" gutterBottom>Refinements</Typography>
                    <IconButton onClick={() => setIsRefinementOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box flex={1} display="flex" flexDirection="column"><RefinementChat chats={chats} loading={refinementsLoading} isOpen={isRefinementOpen}/></Box>
            </Drawer>
            <Drawer
                anchor="right"
                variant="persistent"
                open={isOpen}
                sx={{
                    flex: isOpen ? 1 : 0,
                    flexShrink: 0,
                    width: isOpen ? "50%" : 0,
                    "& .MuiDrawer-paper": {
                        width: "50%",
                        transition: "width 0.3s ease",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                    },
                }}
            >
                <Box display="flex" justifyContent="flex-end" p={1}>
                    <IconButton onClick={() => setIsOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {blog && <Box flex={1} display="flex" flexDirection="column"><BlogOutline blog={blog} /></Box>}
            </Drawer>
        </Box>
    );
};

export default EditBlog;