import {useEffect, useState} from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography } from "@mui/material";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import { styled } from "@mui/material/styles";

const ClickableTableCell = styled(TableCell)({
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
        backgroundColor: "#f0f0f0"
    }
});

export default function UserHomePage() {
    const [blogs, setBlogs] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserBlogs = async () => {
            const savedUsername = Cookies.get("userName");
            console.log(String(savedUsername));
            if (!savedUsername) {
                console.error("username required");
            }

            const response = await fetch(`http://localhost:8080/api/blog/generate-outline?userName=${String(savedUsername)}`);
            const data = await response.json();
            setBlogs(data);
            console.log(data);
        }
        getUserBlogs()
    }, []);

    function createNewBlog() {
        navigate('/blog-question')
    }

    function goToBlogEdit(editBlog) {
        navigate(`/blog-edit`, { state: { blog: editBlog} });
    }

    return (
        <TableContainer component={Paper}>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <Typography variant="h6">Blogs</Typography>
                <Button onClick={createNewBlog} variant="contained" color="primary">New Blog</Button>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Name</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {blogs && blogs.map((blog, index) => (
                        <TableRow key={index}>
                            <ClickableTableCell onClick={() => goToBlogEdit(blog)}>{blog.title}</ClickableTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
