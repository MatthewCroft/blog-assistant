import React, { useEffect, useRef } from "react";
import { Container, Paper, Box, Typography, CircularProgress } from "@mui/material";

export default function RefinementChat({ chats, loading, isOpen }) {
    const chatBoxRef = useRef(null);

    useEffect(() => {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }, [chats, loading, isOpen]);

    return (
        <Container sx={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", p: 0 }}>
            <Paper sx={{ p: 2, borderRadius: 2, flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100%", boxShadow: "none", overflow: "hidden" }}>
                <Box
                    ref={chatBoxRef}
                    sx={{ flex: 1, overflowY: "auto", p: 2, backgroundColor: "#f5f5f5", borderRadius: 1, width: "100%",  display: "flex", flexDirection: "column", paddingBottom: "50px" }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        {chats.length > 0 && chats.map((content, index) => (
                            <Box key={index} sx={{ mb: 1 }}>
                                <Box sx={{ display: "inline-block", backgroundColor: "#e0e0e0", p: 1, borderRadius: 1 }}>
                                    <Typography dangerouslySetInnerHTML={{ __html: content.refinement }} />
                                </Box>
                            </Box>
                        ))}
                        {loading && (
                            <Box display="flex" justifyContent="center" alignItems="center" py={2}>
                                <CircularProgress size={40} />
                            </Box>
                        )}
                    </Box>

                </Box>
            </Paper>
        </Container>
    );
}
