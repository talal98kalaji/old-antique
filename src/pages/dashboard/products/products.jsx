// src/pages/products/ProductsPage.jsx

import React, { useState, useEffect } from "react";
import { Box, Container, Grid, TextField, Button, Stack } from "@mui/material";
import { getAllProducts, deleteProduct } from "../../../api/products";
import { useNavigate } from "react-router-dom";
import ReuseableCard from "../../../components/card";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ title: "", price: "" });
  const [products, setProducts] = useState([]);
  const BASE_URL = "http://127.0.0.1:8000";

  const fetchProducts = async () => {
    const data = await getAllProducts(filters);
    setProducts(data.results || []);
  };

  useEffect(() => { fetchProducts(); }, [filters]);

  const handleChange = (e) => {
    setFilters(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleClear = () => setFilters({ title: "", price: "" });

  const handleEdit = (id) => navigate(`add-edit/${id}`);
  const handleDelete = async (id) => { await deleteProduct(id); fetchProducts(); };

  return (
    <Container sx={{ py: 4 }}>
      <Box mb={3}>
        <Grid container spacing={2}>
          {['title','price'].map((field, idx) => (
            <Grid item size={{xs:12 ,sm:6 ,md:4}} key={idx}>
              <TextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={filters[field]}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={fetchProducts}>Search</Button>
              <Button variant="outlined" onClick={handleClear}>Clear</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <ReuseableCard
        items={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        baseUrl={BASE_URL}
      />
    </Container>
  );
};

export default ProductsPage;
