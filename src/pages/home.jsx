import React from "react";
import { Container } from "@mui/material";
import ReuseableCard from '../components/card.jsx';

const HomePage = () => {
  return (
    <Container sx={{ mt: 2 }}>
      <ReuseableCard />
    </Container>
  );
};

export default HomePage;
