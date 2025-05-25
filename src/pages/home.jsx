import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  InputBase,
  Paper
} from "@mui/material";
import { getAllProducts } from "../api/products";
import kosa from "../assets/images/uivase.png"
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import HowItWorks from "../components/homepage/HowItWorks";
import Newsletter from "../components/homepage/NewsLetter";


const HomePage = () => {
  const [products, setProducts] = useState([]);
  const BASE_URL = "http://127.0.0.1:8000";

  const fetchProducts = useCallback(async () => {
    const data = await getAllProducts();
    setProducts(data.results || []);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ display: "flex", flexWrap: "wrap", bgcolor: "#fdeff0", py: 8 }}>
        <Box sx={{ flex: 1, px: 5, alignSelf: "center" }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Discover Timeless Treasures from Syria
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
            Handcrafted antiques and vintage goods, shipped directly to Europe.
          </Typography>
          <Paper sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }} gap={2}>
          <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Seach for your Treasur"
        inputProps={{ 'aria-label': 'search' }}
          />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
          </Paper>
        </Box>
        <Box sx={{ flex: 1, p: 2 }}>
          <img
            src={kosa} 
            alt="Hero"
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
          />
        </Box>
      </Box>
      <HowItWorks />
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Latest Arrivals
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="180"
                  image={`${BASE_URL}${product.image}`}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description?.slice(0, 60)}...
                  </Typography>
                  <Typography sx={{ mt: 1 }} fontWeight="bold">
                    €{product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                  <Button size="small" variant="outlined">
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Newsletter />
      </Container>


    </>
  );
};

export default HomePage;
