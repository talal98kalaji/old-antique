// src/pages/home.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Container } from "@mui/material";
import UserCard from "../components/cards/usercard.jsx";
import { getAllProducts } from "../api/products.js";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const BASE_URL = "http://127.0.0.1:8000"; // adjust to your media host

  const fetchProducts = useCallback(async () => {
    const data = await getAllProducts();
    setProducts(data.results || []);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Example cart handler: you can hook this up to context/redux/localStorage
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    // e.g. dispatch({ type: "CART_ADD", payload: product })
  };

  return (
    <Container sx={{ py: 4 }}>
      <UserCard
        items={products}
        baseUrl={BASE_URL}
        onAddToCart={handleAddToCart}
      />
    </Container>
  );
};

export default HomePage;
