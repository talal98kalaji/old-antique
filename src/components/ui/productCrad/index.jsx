// src/components/ui/ProductCard/index.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  styled
} from '@mui/material';

// Styled components approach for custom styling
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8]
  }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingTop: '75%', // 4:3 aspect ratio
  width: '100%'
}));

const StyledImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover'
});

const ContentContainer = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  height: 150, // Fixed height
  padding: theme.spacing(2)
}));

const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 2, 2, 2)
}));

const ProductCard = ({
  product,
  baseUrl,
  onAddToCart,
  onView
}) => {
  const { id, title, price, image, description } = product;
  
  return (
    <StyledCard>
      <ImageContainer>
        <StyledImage
          src={image ? `${baseUrl}${image}` : '/placeholder.png'}
          alt={title}
        />
      </ImageContainer>
      
      <ContentContainer>
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
          {title}
        </Typography>
        
        {description && (
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
            {description?.slice(0, 60)}...
          </Typography>
        )}
        
        <Typography
          sx={{
            mt: 2,
            fontWeight: 'bold',
            color: 'primary.main'
          }}
        >
          €{price}
        </Typography>
      </ContentContainer>
      
      <ActionContainer>
        <Button
          size="small"
          onClick={() => onView(product)}
          sx={{
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          View
        </Button>
        
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
      </ActionContainer>
    </StyledCard>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  baseUrl: PropTypes.string,
  onAddToCart: PropTypes.func,
  onView: PropTypes.func
};

ProductCard.defaultProps = {
  baseUrl: '',
  onAddToCart: () => {},
  onView: () => {}
};

export default ProductCard;
