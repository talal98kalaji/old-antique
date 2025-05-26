import React from "react";
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Typography, 
  Box,
  Avatar
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { useNavigate } from "react-router-dom";

export default function UserSidebar({ open }) {
  const navigate = useNavigate();

  // User profile information
  const userProfile = {
    firstName: "John",
    lastName: "Doe",
    profession: "Software Developer",
    email: "john.doe@example.com",
    avatar: "/static/images/avatar/1.jpg"
  };

  return (
    <Box sx={{ overflow: "hidden" }}>
      {/* User Profile Section */}
      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: open ? "flex-start" : "center",
          padding: 2,
          mb: 2
        }}
      >
        <Avatar 
          src={userProfile.avatar} 
          alt={`${userProfile.firstName} ${userProfile.lastName}`}
          sx={{ 
            width: 64, 
            height: 64, 
            mb: 1,
            border: "2px solid #1976d2"
          }} 
        />
        {open && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="h6" noWrap>
              {`${userProfile.firstName} ${userProfile.lastName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {userProfile.profession}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {userProfile.email}
            </Typography>
          </Box>
        )}
      </Box>
      
      <Divider />
      
      {/* Shopping Section */}
      <List>
        <ListItem 
          button 
          onClick={() => navigate('/user/cart')}
          sx={{ 
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
            }}
          >
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText 
            primary="My Cart" 
            secondary="View and manage your shopping cart"
            sx={{ opacity: open ? 1 : 0 }} 
          />
        </ListItem>
        
        <ListItem 
          button 
          onClick={() => navigate('/user/wishlist')}
          sx={{ 
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
            }}
          >
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Wishlist" 
            secondary="Items you've saved for later"
            sx={{ opacity: open ? 1 : 0 }} 
          />
        </ListItem>
        
        <ListItem 
          button 
          onClick={() => navigate('/user/purchase-history')}
          sx={{ 
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
            }}
          >
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Purchase History" 
            secondary="View your past orders and transactions"
            sx={{ opacity: open ? 1 : 0 }} 
          />
        </ListItem>
      </List>
      
      <Divider />
      
      {/* Account Section */}
      <List>
        <ListItem 
          button 
          onClick={() => navigate('/user/profile')}
          sx={{ 
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
            }}
          >
            <PersonIcon />
          </ListItemIcon>
          <ListItemText 
            primary="My Profile" 
            secondary="Manage your personal information"
            sx={{ opacity: open ? 1 : 0 }} 
          />
        </ListItem>
        
        <ListItem 
          button 
          onClick={() => navigate('/user/addresses')}
          sx={{ 
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
            }}
          >
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText 
            primary="My Addresses" 
            secondary="Manage shipping and billing addresses"
            sx={{ opacity: open ? 1 : 0 }} 
          />
        </ListItem>
        
        <ListItem 
          button 
          onClick={() => navigate('/user/payment-methods')}
          sx={{ 
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
            }}
          >
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Payment Methods" 
            secondary="Manage your payment options"
            sx={{ opacity: open ? 1 : 0 }} 
          />
        </ListItem>
      </List>
      
      <Divider />
      
      {/* Additional Features */}
      <List>
        <ListItem 
          button 
          onClick={() => navigate('/user/reviews')}
          sx={{ 
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
            }}
          >
            <ReviewsIcon />
          </ListItemIcon>
          <ListItemText 
            primary="My Reviews" 
            secondary="Manage your product reviews"
            sx={{ opacity: open ? 1 : 0 }} 
          />
        </ListItem>
        
        <ListItem 
          button 
          onClick={() => navigate('/user/deals')}
          sx={{ 
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
            }}
          >
            <LocalOfferIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Special Offers" 
            secondary="Personalized deals and promotions"
            sx={{ opacity: open ? 1 : 0 }} 
          />
        </ListItem>
        
        <ListItem 
          button 
          onClick={() => navigate('/user/settings')}
          sx={{ 
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
            }}
          >
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Account Settings" 
            secondary="Manage preferences and security"
            sx={{ opacity: open ? 1 : 0 }} 
          />
        </ListItem>
        
        <ListItem 
          button 
          onClick={() => navigate('/user/support')}
          sx={{ 
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : 'auto',
              justifyContent: 'center',
            }}
          >
            <HelpIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Help & Support" 
            secondary="Get assistance with your account"
            sx={{ opacity: open ? 1 : 0 }} 
          />
        </ListItem>
      </List>
    </Box>
  );
}
