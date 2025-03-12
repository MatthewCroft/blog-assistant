import React from "react";
import { useState } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemButton, ListItemText, Button } from "@mui/material";
import {useLocation} from "react-router-dom";

const ArticleResponseCard = ({blog}) => {
    const [expanded, setExpanded] = useState({});

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div>
        {blog &&
        <Card sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>{blog.title}</Typography>
                {blog.outline.map((section, index) => (
                    <div key={index}>
                        <Typography variant="h5" gutterBottom>{section.heading}</Typography>
                        {section.subheadings.map((subheader, subIndex) => (
                            <div key={subIndex}>
                                <Typography variant="h6" gutterBottom>{subheader.subheading}</Typography>
                                <List>
                                    {subheader.bulletPoints.map((point, pointIndex) => (
                                        <ListItem key={pointIndex} disablePadding>
                                            <ListItemButton onClick={() => toggleExpand(`${index}-${subIndex}-${pointIndex}`)}>
                                                <ListItemText primary={point} />
                                            </ListItemButton>
                                            {expanded[`${index}-${subIndex}-${pointIndex}`] && (
                                                <Typography variant="body2" sx={{ paddingLeft: 2, marginTop: 1 }}>{point}</Typography>
                                            )}
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        ))}
                    </div>
                ))}
            </CardContent>
        </Card>}
    </div>
    );
};

export default ArticleResponseCard;
