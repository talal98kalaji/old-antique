import React from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";

const Newsletter = () => {
  return (
    <Box  sx={{ mt:2,bgcolor: "#FFD700", py: 6, borderRadius:"1%" }}>
      <Container maxWidth="md" sx={{  textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Stay Updated on New Treasures
        </Typography>
        <Typography variant="body1" gutterBottom>
          Subscribe to our newsletter for exclusive previews and special offers.
        </Typography>
        <Box display="flex" justifyContent="center" gap={2} mt={2}>
          <TextField
            variant="outlined"
            placeholder="Enter your email"
            size="small"
            sx={{ bgcolor: "#fff", borderRadius: 1, width: "300px" }}
          />
          <Button variant="contained" sx={{ bgcolor: "#fff", color: "primary", fontWeight: "bold" }}>
            Subscribe
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter;
