import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function UsernameModal() {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const savedUsername = Cookies.get("userName");
        if (savedUsername) {
            setUsername(savedUsername);
            setShowWelcome(true);
            setTimeout(() => setShowWelcome(false), 3000);
            navigate('/home');
        }
    }, []);

    const handleSubmit = () => {
        if (inputValue.trim() !== "") {
            Cookies.set("userName", inputValue, { expires: 365 });
            setUsername(inputValue);
            navigate('/home');
        }
    };

    return (
        <>
            {/* Modal for setting username */}
            <Dialog open={!username} disableEscapeKeyDown>
                <DialogTitle>Enter Your Username</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!inputValue.trim()}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Welcome Modal */}
            <Dialog open={showWelcome}>
                <DialogContent>
                    <Typography variant="h6">Welcome Back, {username}!</Typography>
                </DialogContent>
            </Dialog>
        </>
    );
}
