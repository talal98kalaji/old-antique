import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from "@mui/material";

export default function UserCard({ 
  items = [], 
  baseUrl = "", 
  onAddToCart = () => {} 
}) {
  return (
    <Grid container spacing={3}>
      {items.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            },
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              position: 'relative',
              paddingTop: '75%', // 4:3 aspect ratio
              width: '100%'
            }}>
              <CardMedia
                component="img"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                image={product.image ? `${baseUrl}${product.image}` : "/placeholder.png"}
                alt={product.title}
              />
            </Box>
            <CardContent sx={{ 
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              height: '150px' // Fixed height for content area
            }}>
              <Typography 
                variant="subtitle1" 
                fontWeight="bold" 
                gutterBottom
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {product.title}
              </Typography>
              {product.description && (
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    mb: 'auto',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {product.description?.slice(0, 60)}...
                </Typography>
              )}
              <Typography 
                sx={{ 
                  mt: 2,
                  fontWeight: "bold",
                  color: '#c62828'
                }}
              >
                €{product.price}
              </Typography>
            </CardContent>
            <CardActions sx={{ 
              padding: '8px 16px 16px',
              justifyContent: 'space-between'
            }}>
              <Button 
                size="small"
                sx={{
                  color: '#333',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.05)'
                  }
                }}
              >
                View
              </Button>
              <Button 
                size="small" 
                variant="outlined"
                onClick={() => onAddToCart(product)}
                sx={{
                  borderColor: '#c62828',
                  color: '#c62828',
                  '&:hover': {
                    borderColor: '#8e0000',
                    backgroundColor: 'rgba(198,40,40,0.04)'
                  }
                }}
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
