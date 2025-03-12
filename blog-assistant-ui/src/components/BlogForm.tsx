import { useState } from "react";
import {TextField, Select, MenuItem, Slider, Card, CardContent, Button, Typography, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React from 'react';


function BlogForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        category: "",
        tone: "",
        audience: "",
        sources: "",
        description: "",
        keywords: "",
        wordCount: 1000, // Default to a medium range value
        callToAction: "",
        contentFormat: "",
        targetProficiency: "",
        painPoints: "",
        uniqueAngle: ""
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    async function submitForm(){
       console.log("Submit form called: " + form);
        const response = await fetch(`http://localhost:8080/api/blog/generate-outline`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();
        if (data.title && data.outline) {
            navigate(`/blog-edit`, { state: { blog: data } });
        }
        console.log(data);
    }

    return (
        <Card sx={{ maxWidth: 900, margin: "auto", padding: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>Basic Article Information</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Title</Typography>
                        <TextField fullWidth name="title" label="Title" value={form.title} onChange={handleChange} margin="normal" />
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Target Audience</Typography>
                        <TextField fullWidth name="audience" label="Target Audience" value={form.audience} onChange={handleChange} margin="normal" />
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Category</Typography>
                        <Select fullWidth name="category" value={form.category} onChange={handleChange} margin="normal" displayEmpty>
                            <MenuItem value="" disabled>Select a category</MenuItem>
                            <MenuItem value="Technology">Technology</MenuItem>
                            <MenuItem value="Health">Health</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                            <MenuItem value="Business">Business</MenuItem>
                            <MenuItem value="Education">Education</MenuItem>
                            <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                            <MenuItem value="Science">Science</MenuItem>
                            <MenuItem value="Entertainment">Entertainment</MenuItem>
                            <MenuItem value="Travel">Travel</MenuItem>
                            <MenuItem value="Food">Food</MenuItem>
                            <MenuItem value="Sports">Sports</MenuItem>
                            <MenuItem value="Self-Improvement">Self-Improvement</MenuItem>
                            <MenuItem value="Marketing">Marketing</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Tone</Typography>
                        <Select fullWidth name="tone" value={form.tone} onChange={handleChange} margin="normal" displayEmpty>
                            <MenuItem value="" disabled>Select a tone</MenuItem>
                            <MenuItem value="Informative">Informative</MenuItem>
                            <MenuItem value="Casual">Casual</MenuItem>
                            <MenuItem value="Technical">Technical</MenuItem>
                            <MenuItem value="Persuasive">Persuasive</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Keywords</Typography>
                        <TextField fullWidth name="keywords" label="Keywords" value={form.keywords} onChange={handleChange} margin="normal" />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Call to Action</Typography>
                        <TextField fullWidth name="callToAction" label="Call to Action" value={form.callToAction} onChange={handleChange} margin="normal" />
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Content Format</Typography>
                        <Select fullWidth name="contentFormat" value={form.contentFormat} onChange={handleChange} margin="normal" displayEmpty>
                            <MenuItem value="" disabled>Select a content format</MenuItem>
                            <MenuItem value="How-to Guide">How-to Guide</MenuItem>
                            <MenuItem value="Case Study">Case Study</MenuItem>
                            <MenuItem value="Opinion Piece">Opinion Piece</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Target Proficiency</Typography>
                        <Select fullWidth name="targetProficiency" value={form.targetProficiency} onChange={handleChange} margin="normal" displayEmpty>
                            <MenuItem value="" disabled>Select proficiency level</MenuItem>
                            <MenuItem value="Beginner">Beginner</MenuItem>
                            <MenuItem value="Intermediate">Intermediate</MenuItem>
                            <MenuItem value="Advanced">Advanced</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Pain Points</Typography>
                        <TextField fullWidth name="painPoints" label="Pain Points" value={form.painPoints} onChange={handleChange} margin="normal" />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Unique Angle</Typography>
                        <TextField fullWidth name="uniqueAngle" label="Unique Angle" value={form.uniqueAngle} onChange={handleChange} margin="normal" />
                    </Grid>
                </Grid>

                <Typography variant="subtitle2">Word Count Goal</Typography>
                <div style={{ margin: "16px 0" }}>
                    <Typography gutterBottom>Word Count Goal: {form.wordCount}</Typography>
                    <Slider name="wordCount" min={500} max={2000} value={form.wordCount} onChange={(e, value) => setForm({ ...form, wordCount: value })} />
                </div>

                <Typography variant="subtitle2">Sources & References</Typography>
                <TextField fullWidth multiline rows={2} name="sources" label="Sources & References" value={form.sources} onChange={handleChange} margin="normal" />

                <Typography variant="subtitle2">Brief Description</Typography>
                <TextField fullWidth multiline rows={4} name="description" label="Brief Description" value={form.description} onChange={handleChange} margin="normal" />

                <Button variant="contained" onClick={submitForm} fullWidth sx={{ mt: 2 }}>Submit</Button>
            </CardContent>
        </Card>
    );
}

export default BlogForm