import {Box, CircularProgress, Typography} from "@mui/material";

export default function BlogOutlineSpinner() {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={2}>
            <CircularProgress size={32} />
            <Typography variant="body1" sx={{ mt: 2 }}>
                Generating blog outline suggestions...
            </Typography>
        </Box>
    );
}