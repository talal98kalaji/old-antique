// components/card.jsx
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from "@mui/material";

export default function ReusableCard({ product, onAddToCart }) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl || "/placeholder.png"}
        alt={product.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {product.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          €{product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          size="small"
          variant="contained"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
