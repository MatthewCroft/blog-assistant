import React, { useState } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Button } from "@mui/material";

const ArticleResponseCard = ({ blog }) => {
    return (
        <div>
            {blog && (
                <Card sx={{ maxWidth: 800, margin: "auto", padding: 2, boxShadow: "none" }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {blog.title}
                        </Typography>
                        {blog.outline.map((section, index) => (
                            <div key={index}>
                                <Typography variant="h5" gutterBottom>
                                    {section.heading}
                                </Typography>
                                {section.subheadings.map((subheader, subIndex) => (
                                    <div key={subIndex}>
                                        <Typography variant="h6" gutterBottom>
                                            {subheader.subheading}
                                        </Typography>
                                        <List>
                                            {subheader.bulletPoints.map((point, pointIndex) => (
                                                <ListItem key={pointIndex} sx={{ display: "list-item", pl: 2 }}>
                                                    <ListItemText primary={`• ${point}`} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ArticleResponseCard;
