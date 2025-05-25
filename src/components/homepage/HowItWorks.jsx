// src/components/HowItWorks.jsx
import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const steps = [
  {
    title: "Discover",
    description: "Browse our curated collections of authentic Syrian antiques and vintage items.",
  },
  {
    title: "Order",
    description: "Select your desired pieces and place your order securely through our platform.",
  },
  {
    title: "Ship",
    description: "We handle careful packaging and reliable shipping directly from Syria to your location in Europe.",
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        How It Works
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
        {steps.map((step, index) => (
          <Grid item size={{ xs: 12, md: 4 }}  key={index}>
            <Card sx={{ textAlign: "center", p: 2 ,backgroundColor:"#f8f8f8" ,boxShadow:"3"}}>
              <CardContent>
                <Typography variant="h5" color="red" fontWeight="bold">
                  {index + 1}
                </Typography>
                <Typography color="primary" variant="h6" fontWeight="bold" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2">{step.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWorks;
