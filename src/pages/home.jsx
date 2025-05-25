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
  Paper,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { getAllProducts } from "../api/products";
import kosa from "../assets/images/uivase.png"
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import HowItWorks from "../components/homepage/HowItWorks";
import Newsletter from "../components/homepage/NewsLetter";
import UserCard from "../components/cards/usercard"; // Import the UserCard component

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]); // State for featured items
  const BASE_URL = "http://127.0.0.1:8000";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchProducts = useCallback(async () => {
    const data = await getAllProducts();
    setProducts(data.results || []);
    
    // Set featured items (for example, first 4 products)
    if (data.results && data.results.length > 0) {
      setFeaturedItems(data.results.slice(0, 4));
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    // Implement your add to cart logic here
  };

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ 
        display: "flex", 
        flexWrap: "wrap", 
        bgcolor: "#fdeff0", 
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 }
      }}>
        <Box sx={{ 
          flex: { xs: '1 1 100%', md: '1 1 50%' }, 
          px: { xs: 2, md: 5 }, 
          alignSelf: "center",
          mb: { xs: 4, md: 0 }
        }}>
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
              lineHeight: 1.2
            }}
          >
            Discover Timeless Treasures from Syria
          </Typography>
          <Typography 
            variant="h6" 
            color="textSecondary" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Handcrafted antiques and vintage goods, shipped directly to Europe.
          </Typography>
          <Paper 
            sx={{ 
              p: '2px 4px', 
              display: 'flex', 
              alignItems: 'center', 
              width: { xs: '100%', sm: 400 },
              borderRadius: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }} 
          >
            <InputBase
              sx={{ ml: 1, flex: 1, py: 1 }}
              placeholder="Search for your treasure"
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <Box sx={{ 
          flex: { xs: '1 1 100%', md: '1 1 50%' }, 
          p: 2,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <img
            src={kosa} 
            alt="Hero"
            style={{ 
              width: "100%", 
              maxHeight: "400px", 
              objectFit: "cover",
              borderRadius: "8px"
            }}
          />
        </Box>
      </Box>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Featured Items Section - Using UserCard Component */}
      <Container sx={{ py: 6 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          fontWeight="bold"
          sx={{ 
            mb: 4,
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: 0,
              width: '60px',
              height: '3px',
              backgroundColor: '#c62828'
            }
          }}
        >
          Featured Items
        </Typography>
        
        {/* Integrate UserCard component here */}
        <UserCard 
          items={featuredItems.map(product => ({
            id: product.id,
            title: product.name,
            price: product.price,
            image: product.image,
            description: product.description
          }))} 
          baseUrl={BASE_URL}
          onAddToCart={handleAddToCart}
        />
      </Container>

      {/* Latest Arrivals Section */}
      <Container sx={{ py: 6 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          fontWeight="bold"
          sx={{ 
            mb: 4,
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: 0,
              width: '60px',
              height: '3px',
              backgroundColor: '#c62828'
            }
          }}
        >
          Latest Arrivals
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
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
                    image={`${BASE_URL}${product.image}`}
                    alt={product.name}
                  />
                </Box>
                <CardContent sx={{ 
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '150px' // Fixed height for content area
                }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {product.name}
                  </Typography>
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
      </Container>

    <Newsletter />
    </>
  );
};

export default HomePage;
