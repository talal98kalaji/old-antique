import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@mui/material";

export default function UserCard({ 
  items = [], 
  baseUrl = "", 
  onAddToCart = () => {} 
}) {
  return (
    <Grid container spacing={2}>
      {items.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              height="140"
              image={product.image ? `${baseUrl}${product.image}` : "/placeholder.png"}
              alt={product.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom noWrap>
                {product.title}
              </Typography>
              <Typography variant="subtitle1">
                €{product.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                fullWidth
                size="small"
                variant="contained"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
